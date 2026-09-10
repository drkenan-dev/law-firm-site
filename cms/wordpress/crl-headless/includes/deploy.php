<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function crl_ping_github() {
	$d = (array) get_option( 'crl_deploy_settings', array() );
	$repo  = isset( $d['github_repo'] ) ? trim( $d['github_repo'] ) : '';
	$token = isset( $d['github_token'] ) ? trim( $d['github_token'] ) : '';

	if ( $repo === '' || $token === '' ) {
		return array(
			'ok'      => false,
			'message' => 'GitHub repository or token not set. Configure it on the Crestline Headless settings page.',
		);
	}

	if ( 1 !== substr_count( $repo, '/' ) ) {
		return array(
			'ok'      => false,
			'message' => 'Repository must look like "owner/repo".',
		);
	}

	$response = wp_remote_post(
		'https://api.github.com/repos/' . rawurlencode( $repo ) . '/dispatches',
		array(
			'timeout' => 20,
			'headers' => array(
				'Authorization'            => 'Bearer ' . $token,
				'Accept'                   => 'application/vnd.github+json',
				'Content-Type'             => 'application/json',
				'User-Agent'               => 'CrestlineHeadless/1.0',
			),
			'body'    => wp_json_encode( array( 'event_type' => 'wp-publish' ) ),
		)
	);

	if ( is_wp_error( $response ) ) {
		return array( 'ok' => false, 'message' => $response->get_error_message() );
	}

	$code = wp_remote_retrieve_response_code( $response );
	if ( $code === 204 || $code === 200 ) {
		return array( 'ok' => true, 'message' => 'Deployment triggered — the site will rebuild automatically.' );
	}

	$body = wp_remote_retrieve_body( $response );
	return array(
		'ok'      => false,
		'message' => 'GitHub responded with HTTP ' . $code . ' — ' . wp_strip_all_tags( $body ),
	);
}

function crl_maybe_deploy() {
	$d = (array) get_option( 'crl_deploy_settings', array() );
	if ( empty( $d['enabled'] ) ) {
		return;
	}
	if ( get_transient( 'crl_last_deploy' ) ) {
		return;
	}
	set_transient( 'crl_last_deploy', 1, 45 );
	crl_ping_github();
}

function crl_on_save_post( $post_id ) {
	if ( wp_is_post_revision( $post_id ) || wp_is_post_autosave( $post_id ) ) {
		return;
	}
	$post = get_post( $post_id );
	if ( ! $post || 'publish' !== $post->post_status ) {
		return;
	}
	crl_maybe_deploy();
}
add_action( 'save_post', 'crl_on_save_post' );

function crl_on_trash( $post_id ) {
	crl_maybe_deploy();
}
add_action( 'trashed_post', 'crl_on_trash' );

function crl_on_settings_update( $option, $old, $new ) {
	if ( 'crl_firm_settings' === $option ) {
		crl_maybe_deploy();
	}
}
add_action( 'updated_option', 'crl_on_settings_update', 10, 3 );

function crl_handle_deploy_now() {
	if ( ! isset( $_GET['crl_deploy'] ) || ! current_user_can( 'manage_options' ) ) {
		return;
	}
	check_admin_referer( 'crl_deploy_now' );
	$result = crl_ping_github();
	add_action( 'admin_notices', function () use ( $result ) {
		$cls = $result['ok'] ? 'notice-success' : 'notice-error';
		echo '<div class="notice ' . esc_attr( $cls ) . ' is-dismissible"><p>' . esc_html( $result['message'] ) . '</p></div>';
	} );
}
add_action( 'admin_init', 'crl_handle_deploy_now' );