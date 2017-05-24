<?php

namespace HM\Handbook;

add_shortcode( 'private-link', __NAMESPACE__ . '\\render_private_link' );

/**
 * Render the link for logged in users, or hide for logged-out.
 *
 * @param array $attributes
 */
function render_private_link( $attributes, $content ) {
	$html_attr = [];
	foreach ( $attributes as $key => $value ) {
		$html_attr[] = $key . '="' . esc_attr( $value ) . '"';
	}

	if ( is_user_logged_in() ) {
		return sprintf(
			'<a %s>%s</a>',
			implode( ' ', $html_attr ),
			$content
		);
	}

	return sprintf(
		'<a class="private-link" href="%s" title="Link available when logged in only">🔒 %s</a>',
		wp_login_url( $_SERVER['REQUEST_URI'] ),
		$content
	);
}
