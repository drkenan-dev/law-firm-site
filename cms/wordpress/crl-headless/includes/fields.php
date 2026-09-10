<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function crl_icon_choices() {
	return array(
		'building-2'   => 'Building (corporate & commercial)',
		'scale'        => 'Scales of justice (litigation)',
		'home'         => 'House (real estate)',
		'users'        => 'People (family)',
		'briefcase'    => 'Briefcase (employment)',
		'lightbulb'    => 'Lightbulb (intellectual property)',
		'landmark'     => 'Landmark (banking & finance)',
		'shield-check' => 'Shield (regulatory)',
		'calculator'   => 'Calculator (tax)',
		'globe-2'      => 'Globe (immigration)',
	);
}

function crl_add_field_groups() {
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	$list_hint  = 'Enter one item per line.';
	$pair_hint  = 'Enter one item per line as: Title | Value';

	acf_add_local_field_group( array(
		'key'      => 'group_crl_attorney',
		'title'    => 'Attorney Details',
		'fields'   => array(
			array( 'key' => 'field_crl_att_photo', 'label' => 'Photo', 'name' => 'photo', 'type' => 'image', 'return_format' => 'array', 'instructions' => 'Square, at least 600 x 600 px. Recommended: 900 x 900 px.' ),
			array( 'key' => 'field_crl_att_position', 'label' => 'Position', 'name' => 'position', 'type' => 'text', 'placeholder' => 'e.g. Senior Partner' ),
			array( 'key' => 'field_crl_att_featured', 'label' => 'Featured on home page', 'name' => 'featured', 'type' => 'true_false', 'ui' => 1 ),
			array( 'key' => 'field_crl_att_summary', 'label' => 'Short summary', 'name' => 'summary', 'type' => 'textarea', 'rows' => 3, 'instructions' => '1–2 sentences shown on cards.' ),
			array( 'key' => 'field_crl_att_bio', 'label' => 'Biography', 'name' => 'bio', 'type' => 'textarea', 'rows' => 8 ),
			array( 'key' => 'field_crl_att_areas', 'label' => 'Practice areas', 'name' => 'practice_areas', 'type' => 'relationship', 'post_type' => array( 'crl_practice_area' ), 'filters' => array( 'search' ), 'instructions' => 'Pick the practice areas this attorney belongs to.' ),
			array( 'key' => 'field_crl_att_education', 'label' => 'Education', 'name' => 'education', 'type' => 'textarea', 'rows' => 4, 'instructions' => $list_hint ),
			array( 'key' => 'field_crl_att_qualifications', 'label' => 'Qualifications', 'name' => 'qualifications', 'type' => 'textarea', 'rows' => 4, 'instructions' => $list_hint ),
			array( 'key' => 'field_crl_att_bar', 'label' => 'Bar admissions', 'name' => 'bar_admissions', 'type' => 'textarea', 'rows' => 4, 'instructions' => $list_hint ),
			array( 'key' => 'field_crl_att_experience', 'label' => 'Professional experience', 'name' => 'experience', 'type' => 'textarea', 'rows' => 4, 'instructions' => $pair_hint . ', e.g. "Crestline Law | 2005–present"' ),
			array( 'key' => 'field_crl_att_matters', 'label' => 'Representative matters', 'name' => 'representative_matters', 'type' => 'textarea', 'rows' => 4, 'instructions' => $list_hint ),
			array( 'key' => 'field_crl_att_publications', 'label' => 'Publications', 'name' => 'publications', 'type' => 'textarea', 'rows' => 4, 'instructions' => $pair_hint . ', e.g. "Article title | 2024"' ),
			array( 'key' => 'field_crl_att_languages', 'label' => 'Languages', 'name' => 'languages', 'type' => 'textarea', 'rows' => 2, 'instructions' => $list_hint ),
			array( 'key' => 'field_crl_att_email', 'label' => 'Email', 'name' => 'email', 'type' => 'email' ),
			array( 'key' => 'field_crl_att_phone', 'label' => 'Phone', 'name' => 'phone', 'type' => 'text' ),
		),
		'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'crl_attorney' ) ) ),
	) );

	acf_add_local_field_group( array(
		'key'      => 'group_crl_practice_area',
		'title'    => 'Practice Area Details',
		'fields'   => array(
			array( 'key' => 'field_crl_area_icon', 'label' => 'Icon', 'name' => 'icon', 'type' => 'select', 'choices' => crl_icon_choices(), 'default_value' => 'scale' ),
			array( 'key' => 'field_crl_area_tagline', 'label' => 'Tagline', 'name' => 'tagline', 'type' => 'text', 'instructions' => 'Short line shown under the section heading.' ),
			array( 'key' => 'field_crl_area_description', 'label' => 'Short description', 'name' => 'description', 'type' => 'textarea', 'rows' => 3, 'instructions' => 'Used on cards and search.' ),
			array( 'key' => 'field_crl_area_image', 'label' => 'Image', 'name' => 'image', 'type' => 'image', 'return_format' => 'array', 'instructions' => 'Wide (16:9), at least 1200 x 675 px.' ),
			array( 'key' => 'field_crl_area_intro', 'label' => 'Introduction', 'name' => 'introduction', 'type' => 'textarea', 'rows' => 6, 'instructions' => 'First paragraph of the practice area page.' ),
			array( 'key' => 'field_crl_area_exp_text', 'label' => 'Experience text', 'name' => 'experience_text', 'type' => 'textarea', 'rows' => 4 ),
			array( 'key' => 'field_crl_area_exp_highlights', 'label' => 'Experience highlights', 'name' => 'experience_highlights', 'type' => 'textarea', 'rows' => 4, 'instructions' => $list_hint ),
			array( 'key' => 'field_crl_area_how', 'label' => 'How we help', 'name' => 'how_we_help', 'type' => 'textarea', 'rows' => 4, 'instructions' => $list_hint ),
			array( 'key' => 'field_crl_area_services', 'label' => 'Services', 'name' => 'services', 'type' => 'textarea', 'rows' => 4, 'instructions' => $list_hint ),
			array( 'key' => 'field_crl_area_why', 'label' => 'Why choose us', 'name' => 'why_choose_us', 'type' => 'textarea', 'rows' => 4, 'instructions' => $list_hint ),
			array( 'key' => 'field_crl_area_matters', 'label' => 'Representative matters', 'name' => 'representative_matters', 'type' => 'textarea', 'rows' => 4, 'instructions' => $pair_hint . ', e.g. "Acme v. Delta | Won on summary judgment"' ),
		),
		'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'crl_practice_area' ) ) ),
	) );

	acf_add_local_field_group( array(
		'key'      => 'group_crl_testimonial',
		'title'    => 'Testimonial',
		'fields'   => array(
			array( 'key' => 'field_crl_test_quote', 'label' => 'Quote', 'name' => 'quote', 'type' => 'textarea', 'rows' => 4, 'required' => 1 ),
			array( 'key' => 'field_crl_test_name', 'label' => 'Client name', 'name' => 'name', 'type' => 'text', 'required' => 1 ),
			array( 'key' => 'field_crl_test_position', 'label' => 'Position / company', 'name' => 'position', 'type' => 'text' ),
			array( 'key' => 'field_crl_test_rating', 'label' => 'Rating', 'name' => 'rating', 'type' => 'select', 'choices' => array( 5 => '5 – Excellent', 4 => '4 – Great', 3 => '3 – Good', 2 => '2 – Fair', 1 => '1 – Poor' ), 'default_value' => 5 ),
			array( 'key' => 'field_crl_test_photo', 'label' => 'Photo', 'name' => 'photo', 'type' => 'image', 'return_format' => 'array' ),
		),
		'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'crl_testimonial' ) ) ),
	) );

	acf_add_local_field_group( array(
		'key'      => 'group_crl_case',
		'title'    => 'Case Result',
		'fields'   => array(
			array( 'key' => 'field_crl_case_category', 'label' => 'Category', 'name' => 'category', 'type' => 'text', 'instructions' => 'e.g. Litigation, Corporate, Real Estate' ),
			array( 'key' => 'field_crl_case_title', 'label' => 'Case title', 'name' => 'title', 'type' => 'text', 'instructions' => 'Short public title, e.g. "Contract dispute resolved" (no client names).' ),
			array( 'key' => 'field_crl_case_description', 'label' => 'Description', 'name' => 'description', 'type' => 'textarea', 'rows' => 3 ),
			array( 'key' => 'field_crl_case_result', 'label' => 'Result', 'name' => 'result', 'type' => 'text', 'placeholder' => 'e.g. Won on summary judgment' ),
			array( 'key' => 'field_crl_case_image', 'label' => 'Image', 'name' => 'image', 'type' => 'image', 'return_format' => 'array' ),
			array( 'key' => 'field_crl_case_confidential', 'label' => 'Confidential (hide firm name)', 'name' => 'confidential', 'type' => 'true_false', 'ui' => 1 ),
			array( 'key' => 'field_crl_case_area', 'label' => 'Practice area', 'name' => 'practice_area', 'type' => 'relationship', 'post_type' => array( 'crl_practice_area' ), 'filters' => array( 'search' ) ),
		),
		'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'crl_case' ) ) ),
	) );

	acf_add_local_field_group( array(
		'key'      => 'group_crl_faq',
		'title'    => 'FAQ',
		'fields'   => array(
			array( 'key' => 'field_crl_faq_category', 'label' => 'Category', 'name' => 'category', 'type' => 'select', 'choices' => array( 'Consultations' => 'Consultations', 'Fees & Billing' => 'Fees & Billing', 'Case Process' => 'Case Process', 'Client Relationship' => 'Client Relationship' ), 'default_value' => 'Consultations' ),
			array( 'key' => 'field_crl_faq_question', 'label' => 'Question', 'name' => 'question', 'type' => 'text', 'required' => 1 ),
			array( 'key' => 'field_crl_faq_answer', 'label' => 'Answer', 'name' => 'answer', 'type' => 'textarea', 'rows' => 4, 'required' => 1 ),
		),
		'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'crl_faq' ) ) ),
	) );

	acf_add_local_field_group( array(
		'key'      => 'group_crl_career',
		'title'    => 'Vacancy Details',
		'fields'   => array(
			array( 'key' => 'field_crl_career_dept', 'label' => 'Department', 'name' => 'department', 'type' => 'text' ),
			array( 'key' => 'field_crl_career_location', 'label' => 'Location', 'name' => 'location', 'type' => 'text' ),
			array( 'key' => 'field_crl_career_type', 'label' => 'Employment type', 'name' => 'type', 'type' => 'select', 'choices' => array( 'Full-time' => 'Full-time', 'Part-time' => 'Part-time', 'Contract' => 'Contract' ), 'default_value' => 'Full-time' ),
			array( 'key' => 'field_crl_career_deadline', 'label' => 'Deadline', 'name' => 'deadline', 'type' => 'text', 'placeholder' => '2026-12-31' ),
			array( 'key' => 'field_crl_career_summary', 'label' => 'Summary', 'name' => 'summary', 'type' => 'textarea', 'rows' => 3 ),
			array( 'key' => 'field_crl_career_resp', 'label' => 'Responsibilities', 'name' => 'responsibilities', 'type' => 'textarea', 'rows' => 4, 'instructions' => $list_hint ),
			array( 'key' => 'field_crl_career_qual', 'label' => 'Qualifications', 'name' => 'qualifications', 'type' => 'textarea', 'rows' => 4, 'instructions' => $list_hint ),
		),
		'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'crl_career' ) ) ),
	) );

	acf_add_local_field_group( array(
		'key'      => 'group_crl_post',
		'title'    => 'Insight Post Settings',
		'fields'   => array(
			array( 'key' => 'field_crl_post_image', 'label' => 'Cover image', 'name' => 'image', 'type' => 'image', 'return_format' => 'array', 'instructions' => 'Wide (16:9), at least 1200 x 675 px.' ),
			array( 'key' => 'field_crl_post_author', 'label' => 'Author (attorney)', 'name' => 'author', 'type' => 'relationship', 'post_type' => array( 'crl_attorney' ), 'filters' => array( 'search' ) ),
			array( 'key' => 'field_crl_post_body', 'label' => 'Body', 'name' => 'body_markdown', 'type' => 'textarea', 'rows' => 16, 'instructions' => 'Use "## " for section headings, "> " for a quote, and "- " for bullet lists. Blank line between paragraphs.' ),
		),
		'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'post' ) ) ),
	) );
}
add_action( 'acf/init', 'crl_add_field_groups' );