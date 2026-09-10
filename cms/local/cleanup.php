<?php
foreach ( array( 'business-tips-before-signing-contracts-2', 'hello-world' ) as $slug ) {
	$post = get_page_by_path( $slug, OBJECT, 'post' );
	if ( $post ) {
		wp_delete_post( $post->ID, true );
		WP_CLI::log( 'Deleted ' . $slug );
	}
}
WP_CLI::success( 'Cleanup done.' );