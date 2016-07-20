<?php

namespace HM_Handbook\Search;

use \WP_REST_Server;
use \WP_REST_Request;
use \WP_Query;

add_action( 'wp_enqueue_scripts', function() {

	wp_localize_script( 'hm-handbook', 'HMHandbookSearchSettings', [
		'api_endpoint' => rest_url( 'hm-handbook/v1/search' ),
		'api_nonce'    => wp_create_nonce( 'wp_rest' ),
	] );

}, 20 );

add_action( 'rest_api_init', function() {

	register_rest_route( 'hm-handbook/v1', '/search', array(
		'callback'     => __NAMESPACE__ . '\\search_request_callback',
		'methods'      => WP_REST_Server::READABLE,
		'args' => [
			'query' => [
				'sanitize_callback' => 'sanitize_text_field',
			],
		],
	) );

} );

class Result {
	public $title;
	public $excerpt;
	public $site;
	public $author;
	public $date;
	public $url;
	public $type;
}

function search_request_callback( WP_Rest_Request $request ) {

	$query = $request->get_param( 'query' );

	if ( function_exists( 'hmn_hmes_search_items' ) ) {
		$data = elastic_search_request( $query );
	} else {
		$data = fallback_search_request( $query );
	}

	return rest_ensure_response( $data );

}

/**
 * Do the elastic search request.
 *
 * @param string $query Query string.
 *
 * @return array Array of HM_Handbook\Search\Result objects.
 */
function elastic_search_request( $query ) {

	$args  = array();
	$match = preg_match_all( '~(\S+): ?(\S+)~i', $query, $matches );

	if ( $match && ! empty( $matches[0] ) ) {

		foreach ( $matches[0] as $key_val ) {
			$query                  = preg_replace( '~' . preg_quote( $key_val ) . '~', '', $query );
			$exploded               = explode( ':', str_replace( ' ', '', $key_val ) );
			$args[ $exploded[ 0 ] ] = strpos( $exploded[1], ',' ) ? explode( ',', $exploded[1] ) : $exploded[1];
		}
	}

	if ( ! empty( $args['before'] ) ) {
		// If only a number is supplied, assume year
		$args['before'] = is_numeric( $args['before'] ) ? strtotime( $args['before'] . '-01-01' ) :   strtotime( $args['before'] );
	} else {
		$args['before'] = null;
	}

	if ( ! empty( $args['after'] ) ) {
		// If only a number is supplied, assume year
		$args['after'] = is_numeric( $args['after'] ) ? strtotime( $args['after'] . '-01-01' ) :   strtotime( $args['after'] );
	}  else {
		$args['after'] = null;
	}

	if ( ! empty( $args['user'] ) && ! is_numeric( $args['user'] )  ) {

		global $wpdb;

		$r = $wpdb->get_var( $wpdb->prepare( "SELECT ID FROM $wpdb->users WHERE user_login = %s OR display_name LIKE %s ", $args['user'], '%' . $args['user'] . '%' ) );

		$args['user'] = $r ? $r : $args['user'];
	}

	if ( ! empty( $args['site'] ) ) {
		$args['sites']  = is_array( $args['site'] ) ? $args['site'] : array( $args['site'] );

		$args['sites']  = array_map( function( $site ) {

				if ( ! is_numeric( $site ) ) {

					foreach ( hm_hub_get_sites() as $site_obj ) {

						if ( explode( '.', $site_obj['domain'] )[0] === $site ) {
							$site = $site_obj['blog_id'];
						}
					}
				}

				return $site;

			}, $args['sites']
		);
	}

	$query = trim( $query );

	if ( ! function_exists( 'hmn_hmes_search_items' ) ) {
		return rest_ensure_response( [
			[
				'type'    => 'article',
				'title'   => 'Hanc ergo intuens debet',
				'content' => 'Duo Reges: constructio interrete. Erit enim instructus ad mortem contemnendam, ad exilium, ad ipsum etiam dolorem. Quod autem satis est, eo quicquid accessit, nimium est; Virtutibus igitur rectissime mihi videris et ad consuetudinem nostrae orationis vitia posuisse contraria. Collige omnia, quae soletis: Praesidium amicorum. Tum ille timide vel potius verecunde: Facio, inquit. Non quaeritur autem quid naturae tuae consentaneum sit, sed quid disciplinae. Quae contraria sunt his, malane? Hoc dixerit potius Ennius: Nimium boni est, cui nihil est mali. Dolor ergo, id est summum malum, metuetur semper, etiamsi non aderit',
				'permalink' => 'http://google.com',
			],
			[
				'type'    => 'article',
				'title'   => 'Quia dolori non voluptas contraria est.',
				'content' => 'Duo Reges: constructio interrete. Ego vero volo in virtute vim esse quam maximam; Quantum Aristoxeni ingenium consumptum videmus in musicis? Hanc ergo intuens debet institutum illud quasi signum absolvere. Qui convenit? Quis istud possit, inquit, negare? Certe, nisi voluptatem tanti aestimaretis. In schola desinis. Hi curatione adhibita levantur in dies, valet alter plus cotidie, alter videt. Sin aliud quid voles, postea. Itaque eos id agere, ut a se dolores, morbos, debilitates repellant. Verum hoc idem saepe faciamus.',
				'permalink' => 'http://bing.com',
			]
		] );
	}

	$items = hmn_hmes_search_items( $query, $args );

	$data = array();
	$data['query'] = $query;
	$data['results'] = array();

	foreach ( $items as $item ) {
		switch ( $item['_type'] ) {
			case 'post':
				$data['results'][] = normalize_post( $item );
				break;

			case 'comment' :
				$data['results'][] = normalize_comment( $item );
				break;
		}
	}

	return $data;
}


/**
 * Fallback to standard WP search if no elastic search is found.
 *
 * Note only returns top 50 results. No pagination is supported.
 *
 * @param string $query Query string.
 *
 * @return array Array of HM_Handbook\Search\Result objects.
 */
function fallback_search_request( $query ) {

	$search_query_args = array(
		's'              => $query,
		'post_type'      => get_post_types( [ 'public' => true ] ),
		'posts_per_page' => 50,
	);

	$search_query = new WP_Query( $search_query_args );
	$results      = [];

	while ( $search_query->have_posts() ) {

		$search_query->the_post();

		$date_format = sprintf( '%s @ %s', get_option( 'date_format' ), get_option( 'time_format' ) );

		$result          = new Result;
		$result->title   = strip_tags( html_entity_decode( get_the_title() ) );
		$result->excerpt = strip_tags( html_entity_decode( get_the_excerpt() ) );
		$result->author  = get_the_author();
		$result->date    = get_the_date( $date_format );
		$result->url     = get_permalink();

		if ( empty( $result->title ) && empty( $result->excerpt ) ) {
			continue;
		}

		array_push( $results, $result );

	}

	return $results;
}

function normalize_post( $item ) {
	$data = new Result();

	// Grab the site from the index name
	$data->site = normalize_site( str_replace( 'hmes_', '', $item['_index'] ) );

	$post = $item['_source'];

	$data->title   = $post['post_title'];
	$data->url     = $post['guid'];
	$data->excerpt = wp_trim_words( $post['post_content'], 80, ' ' . "[\xe2\x80\xa6]" );
	$data->date    = $post['post_modified'];
	$data->type    = isset( $post['post_type'] ) ? $post['post_type'] : 'post';

	// Author, as per P2's functions
	$author = get_user_by( 'id', $post['post_author'] );

	$cb = function ($caps) {
		$caps['list_users'] = true;
		return $caps;
	};

	add_filter( 'user_has_cap', $cb );
	$data->author = array(
		'name'   => $author->display_name,
		'ID'     => $author->ID,
		'avatar' => get_avatar( $author->ID, '48', '', '', array( 'class' => 'search-result-avatar' ) )
	);
	remove_filter( 'user_has_cap', $cb );

	$data->raw = $post;

	return $data;
}

function normalize_comment( $item ) {
	$data = new Result();

	// Grab the site from the index name
	$data->site = normalize_site( str_replace( 'hmes_', '', $item['_index'] ) );

	$post = $item['_source'];

	switch_to_blog( $data->site['id'] );

	$parent = (array) get_post( $post['comment_post_ID'] );

	restore_current_blog();

	$data->title   = 'Response to: ' . $parent['post_title'];
	$data->url     = trailingslashit( $parent['guid'] ) . '#comment-' . $post['comment_ID'] ;
	$data->excerpt = wp_trim_words( $post['comment_content'], 80, ' ' . "[\xe2\x80\xa6]" );
	$data->date    = $post['comment_date'];
	$data->type    = 'comment';

	// Author, as per P2's functions
	$author = get_user_by( 'id', $post['user_id'] );

	$cb = function ($caps) {
		$caps['list_users'] = true;
		return $caps;
	};

	add_filter( 'user_has_cap', $cb );
	$data->author = array(
		'name'   => $author->display_name,
		'ID'     => $author->ID,
		'avatar' => get_avatar( $author->ID, '48', '', '', array( 'class' => 'search-result-avatar' ) )
	);
	remove_filter( 'user_has_cap', $cb );

	$data->raw = $post;

	return $data;
}

function normalize_site( $site ) {
	$site = get_blog_details( $site );

	$data = array(
		'id'     => $site->blog_id,
		'name'   => $site->blogname,
		'domain' => $site->domain,
		'url'    => $site->siteurl,
	);
	return $data;
}
