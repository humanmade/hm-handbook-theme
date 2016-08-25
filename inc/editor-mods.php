<?php

namespace HM_Handbook;

/**
 * Modify TinyMCE4 configurations.
 *
 * @param  array $mceInit config
 * @param  int $editor_id
 * @return array $mceInit
 */
function modify_tinyMCE4( $mceInit, $editor_id ) {

	// Set the allowed 'Blog formats' - remove h1
	$mceInit['block_formats'] = "Paragraph=p;Header 2=h2;Header 3=h3;Header 4=h4;Preformatted=pre";

	// Could just the required buttons on each toolbar if we want.
	// But other plugins may be making modifications so I'm going to and avoid breaking things.
	// Toolbar buttons are stored as a comma separated list - lets make them an array.
	$toolbar1 = explode( ',', $mceInit['toolbar1'] );
	$toolbar2 = explode( ',', $mceInit['toolbar2'] );

	// These are all the buttons we want to completely remove.
	$remove = array(
		'underline',
		'forecolor',
		'alignjustify',
		'alignleft',
		'aligncenter',
		'alignright',
		'indent',
		'outdent',
		'wp_more',
		'hr',
		'strikethrough',
	);

	// Remove these buttons if they are found in toolbar1 or toolbar2
	foreach ( $remove as $name ) {
		if ( $key = array_search( $name, $toolbar1 ) ) {
			unset( $toolbar1[$key] );
		}
		if ( $key = array_search( $name, $toolbar2 ) ) {
			unset( $toolbar2[$key] );
		}
	}

	// Insert some new buttons.
	// We have removed these because we want to insert them into a different position.
	array_splice( $toolbar2, 1, 0, 'hr' );
	array_splice( $toolbar2, 1, 0, 'strikethrough' );
	array_splice( $toolbar2, count( $toolbar2 ) - 1, 0, 'wp_more' );

	// Convert back to original format.
	$mceInit['toolbar1'] = implode( ',', $toolbar1 );
	$mceInit['toolbar2'] = implode( ',', $toolbar2 );

	return $mceInit;

}

// Modify Tiny_MCE init
add_filter( 'tiny_mce_before_init', __NAMESPACE__ . '\\modify_tinyMCE4', 10, 2 );
