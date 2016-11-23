<?php

namespace HM_Handbook\Customizer;

use WP_Customize_Control;

add_action( 'customize_register' , __NAMESPACE__ . '\\register' );

function register( $wp_customize ) {

	// 1. Define a new section of the Theme Customizer
	$wp_customize->add_section( 'misc_settings',
		array(
			'title'       => __( 'HM Handbook Theme Settings', 'hm-handbook' ),
			'priority'    => 10,
			'capability'  => 'edit_theme_options',
			'description' => __( 'Configure the HM Handbook theme.', 'hm-handbook' ),
		)
	);

	// Add setting for private page redirect.
	$wp_customize->add_setting( 'private-page-redirect', [
		'type'              => 'theme_mod',
		'capability'        => 'edit_theme_options',
		'transport'         => 'postMessage',
		'sanitize_callback' => 'absint',
	] );


	// Add controls for private page redirect setting.
	$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'hm_handbook_private_page_redirect', [
		'label'    => __( 'Private page redirect target (page ID)', 'hm-handbook' ),
		'section'  => 'misc_settings',
		'settings' => 'private-page-redirect',
	] ) );

}
