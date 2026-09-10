<?php

define( 'CRL_SLUGS', array(
	'crl_practice_area' => array( 'corporate-commercial-law', 'litigation-dispute-resolution' ),
	'crl_attorney'      => array( 'john-williams', 'sarah-anderson' ),
	'crl_testimonial'   => array( 'client-confidential-1' ),
	'crl_case'          => array( 'contract-dispute-resolved' ),
	'crl_faq'           => array( 'schedule-consultation' ),
	'crl_career'        => array( 'associate-corporate' ),
) );

// Idempotent: remove previously seeded content so this script can be re-run.
foreach ( CRL_SLUGS as $type => $slugs ) {
	foreach ( $slugs as $slug ) {
		$existing = get_page_by_path( $slug, OBJECT, $type );
		if ( $existing ) {
			wp_delete_post( $existing->ID, true );
		}
	}
}
foreach ( array( 'crl_testimonial', 'crl_case' ) as $type ) {
	// testimonial/case seeds have no post_title in UI; covered by CRL_SLUGS above.
}

$media = (int) getenv( 'CRL_MEDIA_ID' );
if ( $media < 1 ) {
	WP_CLI::error( 'Run with CRL_MEDIA_ID=<attachment id> after importing cms/local/sample.png' );
}

function crl_local_make( $type, $title, $slug, $fields = array() ) {
	$id = wp_insert_post( array(
		'post_type'   => $type,
		'post_status' => 'publish',
		'post_title'  => $title,
		'post_name'   => $slug,
	) );
	if ( is_wp_error( $id ) ) {
		WP_CLI::error( $id->get_error_message() );
	}
	foreach ( $fields as $name => $value ) {
		update_field( $name, $value, $id );
	}
	return $id;
}

update_option( 'crl_firm_settings', array(
	'name'             => 'Crestline Law Partners',
	'legal_name'       => 'Crestline Law Partners LLP',
	'tagline'          => 'Experienced Legal Counsel. Trusted Representation.',
	'description'      => 'Strategic legal advice from our local WordPress test site.',
	'established'      => '1999',
	'phone'            => '+233 55 123 4567',
	'email'            => 'info@crestlinelaw.test',
	'address_street'   => '7 Independence Avenue',
	'address_city'     => 'Accra',
	'address_region'   => 'Greater Accra Region',
	'address_country'  => 'Ghana',
	'hours_weekly'     => 'Monday – Friday | 8:00 AM – 5:00 PM',
	'hours_weekend'    => 'Saturday – Sunday | Closed',
	'social_linkedin'  => 'https://www.linkedin.com/company/crestline',
	'social_twitter'   => 'https://x.com/crestlinelaw',
	'social_facebook'  => 'https://www.facebook.com/crestlinelaw',
	'social_instagram' => 'https://www.instagram.com/crestlinelaw',
	'statistics'       => "25+ | Years of practice\n450+ | Matters resolved\n98% | Client satisfaction\n30+ | Attorneys & staff",
) );

$corporate = crl_local_make( 'crl_practice_area', 'Corporate & Commercial Law', 'corporate-commercial-law', array(
	'icon'                   => 'building-2',
	'tagline'                => 'Clear advice for complex deals',
	'description'            => 'From incorporation to M&A, we keep businesses moving.',
	'image'                  => $media,
	'introduction'           => 'We advise on the full corporate lifecycle.',
	'experience_text'        => 'Two decades advising companies of every size.',
	'experience_highlights'  => "Negotiated 300+ agreements\nAdvised on 40+ acquisitions",
	'how_we_help'            => "Entity formation and governance\nContract drafting and review\nMergers and acquisitions",
	'services'               => "Company formation\nCommercial contracts\nCorporate restructuring",
	'why_choose_us'          => "Practical, commercial advice\nTransparent fixed-fee options",
	'representative_matters' => "Acme v. Delta | Won on summary judgment\nRestaurant group sale | Closed Q3 2025",
) );

$litigation = crl_local_make( 'crl_practice_area', 'Litigation & Dispute Resolution', 'litigation-dispute-resolution', array(
	'icon'                   => 'scale',
	'tagline'                => 'Resolute advocacy, inside and outside court',
	'description'            => 'We resolve disputes efficiently and protect your interests.',
	'image'                  => $media,
	'introduction'           => 'Our litigators appear before every level of the courts.',
	'experience_text'        => 'A strong record in commercial and civil disputes.',
	'experience_highlights'  => "120+ trials\n80%+ settlement before hearing",
	'how_we_help'            => "Pre-action negotiation\nMediation and arbitration\nCourt representation",
	'services'               => "Commercial disputes\nDebt recovery\nInjunctions",
	'why_choose_us'          => "Trial-tested advocates\nStrategic case management",
	'representative_matters' => "Kofi Traders v. Bank | Settlement for full principal\nEstates litigation | Won appeal",
) );

$john = crl_local_make( 'crl_attorney', 'John Williams', 'john-williams', array(
	'photo'                  => $media,
	'position'               => 'Senior Partner, Dispute Resolution',
	'featured'               => true,
	'summary'                => 'Trial lawyer with over 20 years of commercial litigation experience.',
	'bio'                    => 'John leads the litigation practice, appearing in complex commercial matters across Ghana.',
	'practice_areas'         => array( $litigation ),
	'education'              => "LL.B. – University of Ghana\nLL.M. – University of London",
	'qualifications'         => "Barrister & Solicitor\nCertified Mediator",
	'bar_admissions'         => "Supreme Court of Ghana",
	'experience'             => "Crestline Law Partners | 2005–present\nBaah & Co. | 2000–2005",
	'representative_matters' => "Defended a manufacturing group in a 6-week arbitration",
	'publications'           => "Dispute Resolution in West Africa | 2024",
	'languages'              => "English\nTwi",
	'email'                  => 'john.williams@crestlinelaw.test',
	'phone'                  => '+233 55 123 4567',
) );

$sarah = crl_local_make( 'crl_attorney', 'Sarah Anderson', 'sarah-anderson', array(
	'photo'          => $media,
	'position'       => 'Partner, Corporate & Commercial',
	'featured'       => true,
	'summary'        => 'Corporate lawyer focused on transactions and company governance.',
	'bio'            => 'Sarah advises boards and founders on high-stakes corporate matters.',
	'practice_areas' => array( $corporate ),
	'education'      => "LL.B. – KNUST\nProfessional Training – Ghana School of Law",
	'qualifications' => "Barrister & Solicitor",
	'bar_admissions' => "Supreme Court of Ghana",
	'experience'     => "Crestline Law Partners | 2008–present",
	'publications'   => "",
	'languages'      => "English\nFrench",
	'email'          => 'sarah.anderson@crestlinelaw.test',
	'phone'          => '+233 55 123 4567',
) );

crl_local_make( 'crl_testimonial', 'Client review', 'client-confidential-1', array(
	'quote'    => 'Crestline handled our dispute with total professionalism and got us a great outcome.',
	'name'     => 'Confidential client',
	'position' => 'Managing Director',
	'rating'   => 5,
) );

crl_local_make( 'crl_case', 'Contract dispute resolved', 'contract-dispute-resolved', array(
	'category'      => 'Litigation',
	'title'         => 'Contract dispute resolved',
	'description'   => 'Acted for a supplier in a claim for unpaid invoices.',
	'result'        => 'Judgment obtained and enforced',
	'image'         => $media,
	'confidential'  => true,
	'practice_area' => array( $litigation ),
) );

crl_local_make( 'crl_faq', 'How do I schedule a consultation?', 'schedule-consultation', array(
	'category' => 'Consultations',
	'question' => 'How do I schedule a consultation?',
	'answer'   => 'Call our office or use the contact form and we will confirm within one business day.',
) );

crl_local_make( 'crl_career', 'Associate – Corporate', 'associate-corporate', array(
	'department'       => 'Corporate & Commercial',
	'location'         => 'Accra',
	'type'             => 'Full-time',
	'deadline'         => '2026-12-31',
	'summary'          => 'Join a growing corporate practice in Accra.',
	'responsibilities' => "Draft and review commercial contracts\nSupport M&A transactions",
	'qualifications'   => "Qualified barrister\n1–3 years PQE",
) );

$news_id = wp_create_category( 'News' );
if ( is_wp_error( $news_id ) ) {
	WP_CLI::error( $news_id->get_error_message() );
}

$post_id = wp_insert_post( array(
	'post_type'    => 'post',
	'post_status'  => 'publish',
	'post_title'   => 'Business Tips Before Signing Contracts',
	'post_name'    => 'business-tips-before-signing-contracts',
	'post_content' => 'A seed article written from the local WordPress site.',
) );
if ( is_wp_error( $post_id ) ) {
	WP_CLI::error( $post_id->get_error_message() );
}
wp_set_post_categories( $post_id, array( $news_id ) );
update_field( 'image', $media, $post_id );
update_field( 'author', array( $sarah ), $post_id );
update_field( 'body_markdown', "## Read before you sign\n\nA quick guide drawn from our corporate practice.\n\n- Check the payment terms\n- Verify authority to sign\n> When in doubt, ask.\n\n## Getting help\n\nOur corporate team reviews agreements on fixed fees.", $post_id );

WP_CLI::success( 'Seeded content.' );