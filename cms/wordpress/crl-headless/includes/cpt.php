<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function crl_register_cpts() {
	$shared = array(
		'public'             => false,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'show_in_rest'       => false,
		'menu_position'      => null,
		'supports'           => array( 'title', 'page-attributes' ),
		'capability_type'    => 'post',
		'has_archive'        => false,
	);

	register_post_type( 'crl_attorney', array_merge( $shared, array(
		'labels'             => array(
			'name'          => __( 'Attorneys', 'crl-headless' ),
			'singular_name' => __( 'Attorney', 'crl-headless' ),
			'add_new_item'  => __( 'Add New Attorney', 'crl-headless' ),
			'edit_item'     => __( 'Edit Attorney', 'crl-headless' ),
		),
		'menu_icon'          => 'dashicons-id',
	) ) );

	register_post_type( 'crl_practice_area', array_merge( $shared, array(
		'labels'             => array(
			'name'          => __( 'Practice Areas', 'crl-headless' ),
			'singular_name' => __( 'Practice Area', 'crl-headless' ),
			'add_new_item'  => __( 'Add New Practice Area', 'crl-headless' ),
			'edit_item'     => __( 'Edit Practice Area', 'crl-headless' ),
		),
		'menu_icon'          => 'dashicons-admin-network',
	) ) );

	register_post_type( 'crl_testimonial', array_merge( $shared, array(
		'labels'             => array(
			'name'          => __( 'Testimonials', 'crl-headless' ),
			'singular_name' => __( 'Testimonial', 'crl-headless' ),
			'add_new_item'  => __( 'Add New Testimonial', 'crl-headless' ),
			'edit_item'     => __( 'Edit Testimonial', 'crl-headless' ),
		),
		'menu_icon'          => 'dashicons-format-quote',
	) ) );

	register_post_type( 'crl_case', array_merge( $shared, array(
		'labels'             => array(
			'name'          => __( 'Case Results', 'crl-headless' ),
			'singular_name' => __( 'Case Result', 'crl-headless' ),
			'add_new_item'  => __( 'Add New Case Result', 'crl-headless' ),
			'edit_item'     => __( 'Edit Case Result', 'crl-headless' ),
		),
		'menu_icon'          => 'dashicons-awards',
	) ) );

	register_post_type( 'crl_faq', array_merge( $shared, array(
		'labels'             => array(
			'name'          => __( 'FAQs', 'crl-headless' ),
			'singular_name' => __( 'FAQ', 'crl-headless' ),
			'add_new_item'  => __( 'Add New FAQ', 'crl-headless' ),
			'edit_item'     => __( 'Edit FAQ', 'crl-headless' ),
		),
		'menu_icon'          => 'dashicons-editor-help',
	) ) );

	register_post_type( 'crl_career', array_merge( $shared, array(
		'labels'             => array(
			'name'          => __( 'Careers', 'crl-headless' ),
			'singular_name' => __( 'Vacancy', 'crl-headless' ),
			'add_new_item'  => __( 'Add New Vacancy', 'crl-headless' ),
			'edit_item'     => __( 'Edit Vacancy', 'crl-headless' ),
		),
		'menu_icon'          => 'dashicons-businessperson',
	) ) );
}
add_action( 'init', 'crl_register_cpts' );