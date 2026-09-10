<?php
/**
 * Plugin Name: Crestline Headless
 * Description: Turns WordPress into a content source for the Next.js law firm site. Adds the content types for attorneys, practice areas, testimonials, case results, FAQs and careers, plus a /wp-json/crl/v1/all endpoint the build pulls from, and an auto-publish webhook that deploys the site on save.
 * Version: 1.0.0
 * Author: Crestline Law
 * Requires at least: 6.2
 * Requires PHP: 7.4
 * Text Domain: crl-headless
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'CRL_HEADLESS_VERSION', '1.0.0' );
define( 'CRL_HEADLESS_DIR', plugin_dir_path( __FILE__ ) );

require_once CRL_HEADLESS_DIR . 'includes/cpt.php';
require_once CRL_HEADLESS_DIR . 'includes/fields.php';
require_once CRL_HEADLESS_DIR . 'includes/rest.php';
require_once CRL_HEADLESS_DIR . 'includes/settings.php';
require_once CRL_HEADLESS_DIR . 'includes/deploy.php';