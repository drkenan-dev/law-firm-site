<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function crl_settings_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	?>
	<div class="wrap">
		<h1>Crestline Headless</h1>
		<p>Content saved here is picked up by the Next.js build. Publish an attorney, practice area, post, testimonial, case result, FAQ or vacancy — then press "Deploy now" (or rely on the auto-deploy on save).</p>
		<?php settings_errors(); ?>
		<form method="post" action="options.php">
			<?php
			settings_fields( 'crl_headless' );
			do_settings_sections( 'crl_headless' );
			submit_button( 'Save settings' );
			?>
		</form>
		<hr>
		<h2>Deploy</h2>
		<p>Trigger a build and publish the live site with the content saved in WordPress.</p>
		<form method="get" action="">
			<input type="hidden" name="page" value="crl-headless">
			<input type="hidden" name="crl_deploy" value="1">
			<?php wp_nonce_field( 'crl_deploy_now' ); ?>
			<?php submit_button( 'Deploy now', 'primary', 'submit' ); ?>
		</form>
	</div>
	<?php
}

function crl_admin_menu() {
	add_options_page( 'Crestline Headless', 'Crestline Headless', 'manage_options', 'crl-headless', 'crl_settings_page' );
}
add_action( 'admin_menu', 'crl_admin_menu' );

function crl_sanitize_deploy( $input ) {
	$input = (array) $input;
	$out = array(
		'enabled'     => empty( $input['enabled'] ) ? 0 : 1,
		'github_repo' => sanitize_text_field( isset( $input['github_repo'] ) ? $input['github_repo'] : '' ),
		'github_token' => sanitize_text_field( isset( $input['github_token'] ) ? $input['github_token'] : '' ),
	);
	return $out;
}

function crl_sanitize_firm( $input ) {
	$input = (array) $input;
	$out = array();
	$text = array(
		'name', 'legal_name', 'tagline', 'description', 'phone', 'email',
		'address_street', 'address_city', 'address_region', 'address_country',
		'hours_weekly', 'hours_weekend', 'social_linkedin', 'social_twitter',
		'social_facebook', 'social_instagram', 'statistics',
	);
	foreach ( $text as $key ) {
		$out[ $key ] = isset( $input[ $key ] ) ? sanitize_textarea_field( $input[ $key ] ) : '';
	}
	$out['established'] = absint( isset( $input['established'] ) ? $input['established'] : 0 );
	return $out;
}

function crl_text_field( $option, $key, $label ) {
	$value = isset( $option[ $key ] ) ? $option[ $key ] : '';
	$value = is_array( $value ) ? '' : $value;
	printf(
		'<input class="regular-text" type="text" name="crl_firm_settings[%s]" value="%s" placeholder="%s">',
		esc_attr( $key ),
		esc_attr( $value ),
		esc_attr( $label )
	);
}

function crl_register_settings() {
	register_setting( 'crl_headless', 'crl_firm_settings', array( 'sanitize_callback' => 'crl_sanitize_firm' ) );
	register_setting( 'crl_headless', 'crl_deploy_settings', array( 'sanitize_callback' => 'crl_sanitize_deploy' ) );

	add_settings_section( 'crl_firm', 'Firm details', '__return_false', 'crl_headless' );
	$fields = array(
		'name'             => 'Firm name (shown in logo)',
		'legal_name'       => 'Legal name',
		'tagline'          => 'Tagline',
		'description'      => 'Short description',
		'established'      => 'Established (year)',
		'phone'            => 'Phone',
		'email'            => 'Email',
		'address_street'   => 'Street address',
		'address_city'     => 'City',
		'address_region'   => 'Region / state',
		'address_country'  => 'Country',
		'social_linkedin'  => 'LinkedIn URL',
		'social_twitter'   => 'Twitter / X URL',
		'social_facebook'  => 'Facebook URL',
		'social_instagram' => 'Instagram URL',
	);
	foreach ( $fields as $key => $label ) {
		add_settings_field( 'crl_firm_' . $key, $label, function () use ( $key, $label ) {
			crl_text_field( get_option( 'crl_firm_settings', array() ), $key, $label );
		}, 'crl_headless', 'crl_firm' );
	}

	add_settings_field( 'crl_firm_hours_weekly', 'Opening hours (weekday)', function () {
		crl_text_field( get_option( 'crl_firm_settings', array() ), 'hours_weekly', 'e.g. Monday – Friday | 8:00 AM – 5:00 PM' );
	}, 'crl_headless', 'crl_firm' );

	add_settings_field( 'crl_firm_hours_weekend', 'Opening hours (weekend)', function () {
		crl_text_field( get_option( 'crl_firm_settings', array() ), 'hours_weekend', 'e.g. Saturday – Sunday | Closed' );
	}, 'crl_headless', 'crl_firm' );

	add_settings_field( 'crl_firm_statistics', 'Home page statistics', function () {
		crl_text_field( get_option( 'crl_firm_settings', array() ), 'statistics', 'One per line: 20+ | Years of practice' );
	}, 'crl_headless', 'crl_firm' );

	add_settings_section( 'crl_deploy', 'Automatic deployment', 'crl_deploy_section_intro', 'crl_headless' );
	add_settings_field( 'crl_deploy_repo', 'GitHub repository', function () {
		$value = get_option( 'crl_deploy_settings', array() );
		printf( '<input class="regular-text" type="text" name="crl_deploy_settings[github_repo]" value="%s" placeholder="owner/your-repo">', esc_attr( isset( $value['github_repo'] ) ? $value['github_repo'] : '' ) );
	}, 'crl_headless', 'crl_deploy' );
	add_settings_field( 'crl_deploy_token', 'Personal access token', function () {
		$value = get_option( 'crl_deploy_settings', array() );
		printf( '<input class="regular-text" type="password" name="crl_deploy_settings[github_token]" value="%s" placeholder="ghp_...">', esc_attr( isset( $value['github_token'] ) ? $value['github_token'] : '' ) );
	}, 'crl_headless', 'crl_deploy' );
	add_settings_field( 'crl_deploy_enabled', 'Auto-deploy on save', function () {
		$value = get_option( 'crl_deploy_settings', array() );
		printf( '<label><input type="checkbox" name="crl_deploy_settings[enabled]" value="1" %s> Trigger a deployment whenever content is published</label>', checked( ! empty( $value['enabled'] ), true, false ) );
	}, 'crl_headless', 'crl_deploy' );
}
add_action( 'admin_init', 'crl_register_settings' );

function crl_deploy_section_intro() {
	echo '<p>Connect this site to a GitHub repository. On every publish, or via "Deploy now", the GitHub Actions workflow builds the site and uploads it to Bluehost.</p>';
}