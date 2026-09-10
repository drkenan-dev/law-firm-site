<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function crl_lines( $text ) {
	$out = array();
	foreach ( preg_split( '/\r\n|\r|\n/', (string) $text ) as $line ) {
		$line = trim( $line );
		if ( $line === '' ) {
			continue;
		}
		$line = preg_replace( '/^[-*]\s+/', '', $line );
		$out[] = $line;
	}
	return $out;
}

function crl_pairs( $text ) {
	$out = array();
	foreach ( crl_lines( $text ) as $line ) {
		$pos = strpos( $line, '|' );
		if ( $pos === false ) {
			$out[] = array( 'title' => $line, 'value' => '' );
		} else {
			$out[] = array( 'title' => trim( substr( $line, 0, $pos ) ), 'value' => trim( substr( $line, $pos + 1 ) ) );
		}
	}
	return $out;
}

function crl_img( $value ) {
	if ( is_array( $value ) && ! empty( $value['url'] ) ) {
		return array( 'url' => $value['url'], 'alt' => isset( $value['alt'] ) ? $value['alt'] : '' );
	}
	return array( 'url' => '', 'alt' => '' );
}

function crl_post_id( $value ) {
	if ( $value instanceof WP_Post ) {
		return (int) $value->ID;
	}
	return (int) $value;
}

function crl_rel_slug( $ids ) {
	$ids = (array) $ids;
	if ( empty( $ids ) ) {
		return '';
	}
	$slug = get_post_field( 'post_name', crl_post_id( $ids[0] ) );
	return is_string( $slug ) ? $slug : '';
}

function crl_rel_slugs( $ids ) {
	$slugs = array();
	foreach ( (array) $ids as $id ) {
		$post_id = crl_post_id( $id );
		if ( $post_id < 1 ) {
			continue;
		}
		$slug = get_post_field( 'post_name', $post_id );
		if ( is_string( $slug ) && $slug !== '' ) {
			$slugs[] = $slug;
		}
	}
	return $slugs;
}

function crl_firm_settings() {
	$s = (array) get_option( 'crl_firm_settings', array() );

	$hours = array();
	$week  = crl_pairs( isset( $s['hours_weekly'] ) ? $s['hours_weekly'] : '' );
	if ( $week ) {
		foreach ( $week as $line ) {
			$hours[] = array( 'days' => $line['title'], 'time' => $line['value'] );
		}
	}
	$weekend = crl_pairs( isset( $s['hours_weekend'] ) ? $s['hours_weekend'] : '' );
	if ( $weekend ) {
		foreach ( $weekend as $line ) {
			$hours[] = array( 'days' => $line['title'], 'time' => $line['value'] );
		}
	}

	$body = array(
		'name'         => isset( $s['name'] ) ? $s['name'] : '',
		'legalName'    => isset( $s['legal_name'] ) ? $s['legal_name'] : '',
		'tagline'      => isset( $s['tagline'] ) ? $s['tagline'] : '',
		'description'  => isset( $s['description'] ) ? $s['description'] : '',
		'established'  => isset( $s['established'] ) ? (int) $s['established'] : 0,
		'phone'        => isset( $s['phone'] ) ? $s['phone'] : '',
		'email'        => isset( $s['email'] ) ? $s['email'] : '',
		'address'      => array(
			'street'  => isset( $s['address_street'] ) ? $s['address_street'] : '',
			'city'    => isset( $s['address_city'] ) ? $s['address_city'] : '',
			'region'  => isset( $s['address_region'] ) ? $s['address_region'] : '',
			'country' => isset( $s['address_country'] ) ? $s['address_country'] : '',
		),
		'hours'        => $hours,
		'social'       => array(
			'linkedin'  => isset( $s['social_linkedin'] ) ? $s['social_linkedin'] : '',
			'twitter'   => isset( $s['social_twitter'] ) ? $s['social_twitter'] : '',
			'facebook'  => isset( $s['social_facebook'] ) ? $s['social_facebook'] : '',
			'instagram' => isset( $s['social_instagram'] ) ? $s['social_instagram'] : '',
		),
	);

	return array(
		'settings'   => $body,
		'statistics' => array_map(
			function ( $line ) {
				return array( 'value' => $line['title'], 'label' => $line['value'] );
			},
			crl_pairs( isset( $s['statistics'] ) ? $s['statistics'] : '' )
		),
	);
}

function crl_query_posts( $post_type ) {
	$q = new WP_Query( array(
		'post_type'      => $post_type,
		'post_status'    => 'publish',
		'posts_per_page' => -1,
		'orderby'        => array( 'menu_order' => 'ASC', 'date' => 'DESC' ),
		'no_found_rows'  => true,
	) );
	return $q->posts;
}

function crl_attorney_json( $post ) {
	return array(
		'slug'                 => $post->post_name,
		'name'                 => $post->post_title,
		'position'             => (string) get_field( 'position', $post->ID ),
		'photo'                => crl_img( get_field( 'photo', $post->ID ) ),
		'featured'             => (bool) get_field( 'featured', $post->ID ),
		'summary'              => (string) get_field( 'summary', $post->ID ),
		'bio'                  => (string) get_field( 'bio', $post->ID ),
		'practiceAreas'        => crl_rel_slugs( get_field( 'practice_areas', $post->ID ) ),
		'education'            => crl_lines( get_field( 'education', $post->ID ) ),
		'qualifications'       => crl_lines( get_field( 'qualifications', $post->ID ) ),
		'barAdmissions'        => crl_lines( get_field( 'bar_admissions', $post->ID ) ),
		'experience'           => array_map(
			function ( $line ) {
				return array( 'title' => $line['title'], 'years' => $line['value'] );
			},
			crl_pairs( get_field( 'experience', $post->ID ) )
		),
		'representativeMatters' => crl_lines( get_field( 'representative_matters', $post->ID ) ),
		'publications'         => array_map(
			function ( $line ) {
				return array( 'title' => $line['title'], 'year' => $line['value'] );
			},
			crl_pairs( get_field( 'publications', $post->ID ) )
		),
		'languages'            => crl_lines( get_field( 'languages', $post->ID ) ),
		'email'                => (string) get_field( 'email', $post->ID ),
		'phone'                => (string) get_field( 'phone', $post->ID ),
	);
}

function crl_practice_area_json( $post ) {
	return array(
		'slug'                 => $post->post_name,
		'name'                 => $post->post_title,
		'icon'                 => (string) get_field( 'icon', $post->ID ),
		'tagline'              => (string) get_field( 'tagline', $post->ID ),
		'description'          => (string) get_field( 'description', $post->ID ),
		'image'                => crl_img( get_field( 'image', $post->ID ) ),
		'introduction'         => (string) get_field( 'introduction', $post->ID ),
		'experienceText'       => (string) get_field( 'experience_text', $post->ID ),
		'experienceHighlights' => crl_lines( get_field( 'experience_highlights', $post->ID ) ),
		'howWeHelp'            => crl_lines( get_field( 'how_we_help', $post->ID ) ),
		'services'             => crl_lines( get_field( 'services', $post->ID ) ),
		'whyChooseUs'          => crl_lines( get_field( 'why_choose_us', $post->ID ) ),
		'representativeMatters' => array_map(
			function ( $line ) {
				return array( 'title' => $line['title'], 'result' => $line['value'], 'confidential' => false );
			},
			crl_pairs( get_field( 'representative_matters', $post->ID ) )
		),
		'faqs'                 => array(),
	);
}

function crl_post_json( $post ) {
	$categories = get_the_category( $post->ID );
	$category   = '';
	if ( ! empty( $categories ) && ! is_wp_error( $categories ) ) {
		$category = $categories[0]->name;
	}

	return array(
		'slug'         => $post->post_name,
		'title'        => $post->post_title,
		'excerpt'      => wp_strip_all_tags( has_excerpt( $post->ID ) ? get_the_excerpt( $post->ID ) : (string) $post->post_content ),
		'category'     => $category,
		'date'         => get_the_date( 'Y-m-d', $post->ID ),
		'authorSlug'   => crl_rel_slug( get_field( 'author', $post->ID ) ),
		'image'        => crl_img( get_field( 'image', $post->ID ) ),
		'bodyMarkdown' => (string) get_field( 'body_markdown', $post->ID ),
	);
}

function crl_testimonial_json( $post ) {
	return array(
		'id'       => $post->post_name,
		'quote'    => (string) get_field( 'quote', $post->ID ),
		'name'     => (string) get_field( 'name', $post->ID ),
		'position' => (string) get_field( 'position', $post->ID ),
		'rating'   => absint( get_field( 'rating', $post->ID ) ?: 5 ),
		'photo'    => crl_img( get_field( 'photo', $post->ID ) ),
	);
}

function crl_case_json( $post ) {
	return array(
		'slug'            => $post->post_name,
		'category'        => (string) get_field( 'category', $post->ID ),
		'title'           => (string) get_field( 'title', $post->ID ),
		'description'     => (string) get_field( 'description', $post->ID ),
		'result'          => (string) get_field( 'result', $post->ID ),
		'image'           => crl_img( get_field( 'image', $post->ID ) ),
		'confidential'    => (bool) get_field( 'confidential', $post->ID ),
		'practiceAreaSlug' => crl_rel_slug( get_field( 'practice_area', $post->ID ) ),
	);
}

function crl_faq_json( $post ) {
	return array(
		'id'       => $post->post_name,
		'category' => (string) get_field( 'category', $post->ID ),
		'question' => (string) get_field( 'question', $post->ID ),
		'answer'   => (string) get_field( 'answer', $post->ID ),
	);
}

function crl_career_json( $post ) {
	return array(
		'id'              => $post->post_name,
		'title'           => $post->post_title,
		'department'      => (string) get_field( 'department', $post->ID ),
		'location'        => (string) get_field( 'location', $post->ID ),
		'type'            => (string) get_field( 'type', $post->ID ),
		'deadline'        => (string) get_field( 'deadline', $post->ID ),
		'summary'         => (string) get_field( 'summary', $post->ID ),
		'responsibilities' => crl_lines( get_field( 'responsibilities', $post->ID ) ),
		'qualifications'  => crl_lines( get_field( 'qualifications', $post->ID ) ),
	);
}

function crl_build_all() {
	$base = crl_firm_settings();

	$attorneys = array();
	foreach ( crl_query_posts( 'crl_attorney' ) as $post ) {
		$attorneys[] = crl_attorney_json( $post );
	}

	$practice_areas = array();
	foreach ( crl_query_posts( 'crl_practice_area' ) as $post ) {
		$practice_areas[] = crl_practice_area_json( $post );
	}

	$posts = array();
	foreach ( crl_query_posts( 'post' ) as $post ) {
		$posts[] = crl_post_json( $post );
	}

	$testimonials = array();
	foreach ( crl_query_posts( 'crl_testimonial' ) as $post ) {
		$testimonials[] = crl_testimonial_json( $post );
	}

	$cases = array();
	foreach ( crl_query_posts( 'crl_case' ) as $post ) {
		$cases[] = crl_case_json( $post );
	}

	$faqs = array();
	foreach ( crl_query_posts( 'crl_faq' ) as $post ) {
		$faqs[] = crl_faq_json( $post );
	}

	$careers = array();
	foreach ( crl_query_posts( 'crl_career' ) as $post ) {
		$careers[] = crl_career_json( $post );
	}

	return array_merge( $base, array(
		'attorneys'     => $attorneys,
		'practiceAreas' => $practice_areas,
		'posts'         => $posts,
		'testimonials'  => $testimonials,
		'cases'         => $cases,
		'faqs'          => $faqs,
		'careers'       => $careers,
	) );
}

function crl_rest_all( WP_REST_Request $request ) {
	$cached = get_transient( 'crl_all_body' );
	if ( is_array( $cached ) ) {
		return rest_ensure_response( $cached );
	}

	$body = crl_build_all();
	set_transient( 'crl_all_body', $body, 2 * MINUTE_IN_SECONDS );
	return rest_ensure_response( $body );
}

function crl_register_routes() {
	register_rest_route( 'crl/v1', '/all', array(
		'methods'             => 'GET',
		'permission_callback' => '__return_true',
		'callback'            => 'crl_rest_all',
	) );
}
add_action( 'rest_api_init', 'crl_register_routes' );

function crl_flush_cache() {
	delete_transient( 'crl_all_body' );
}
add_action( 'save_post', 'crl_flush_cache' );
add_action( 'trashed_post', 'crl_flush_cache' );
add_action( 'deleted_post', 'crl_flush_cache' );