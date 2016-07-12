var React    = require( 'react' );
var ReactDOM = require( 'react-dom' );
var diff_match_patch = require("exports?diff_match_patch!./../vendor/diff_match_patch.js");

/**
 * Diff component.
 */
var PageHistoryDiff = React.createClass({

	getDefaultProps: function() {
	    return {
	    	diff_a: null,
	    	diff_b: null,
	    }
	},

	render: function() {
		return ( <div className="PageHistory_Diff" dangerouslySetInnerHTML={ { __html: this.getDiffHTML() } } /> );
	},

	getDiffHTML: function() {

		if ( ! ( this.props.diff_a && this.props.diff_b ) ) {
			return '';
		}

		var html = [];
		var dmp  = new diff_match_patch();

		var diff = dmp.diff_main(
			this.props.diff_b.content.replace( /[\n|\r]{2,}/g, "\n\n" ),
			this.props.diff_a.content.replace( /[\n|\r]{2,}/g, "\n\n" )
		);

		dmp.diff_cleanupSemantic( diff );

		diff.forEach( function( part, i ) {

			var text = this.escapeHtml( part[1] );

			if ( 1 === part[0] ) {
				html[i] = '<ins class="PageHistory_Diff-Added">' + text + '</ins>';
			} else if ( -1 === part[0] ) {
				html[i] = '<del class="PageHistory_Diff-Removed">' + text + '</del>';
			} else {
				html[i] = '<span>' + text + '</span>';
			}

		}.bind( this ) );

		return html.join( '' );

	},

	escapeHtml: function ( text ) {

		var map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;',
			"/\r|\n": '&para;',
		};

		return text.replace( /[&<>"']/g, function( m ) { return map[ m ]; } );

	},

});

/**
 * History List.
 */
var PageHistoryList = React.createClass({

	getDefaultProps: function() {
		return {
			revisions: [],
		};
	},

	getInitialState: function() {
		return {
			revisions: this.props.revisions,
		};
	},

	render: function() {

		const actions = {
			selectRevision: this.props.actions.selectRevision,
		};

		return (
			<div className="PageHistory_List_Container">
				<h4 className="PageHistory_List_Title">Page History</h4>
				<ul className="PageHistory_List">
					{ this.state.revisions.map( function( revision ) {

						if ( ! 'active' in revision ) {
							revision.active = false;
						}

						return (
							<PageHistoryListItem key={ revision.id } id={ revision.id } action={ revision.action } author={ revision.author } date={ revision.date } content={ revision.content } active={ revision.active } actions={ actions } />
						);
					}) }
				</ul>
			</div>
		);

	},

});

var PageHistoryListItem = React.createClass({

	getDefaultProps: function() {
		return {
			id:      0,
			active:  false,
			author:  '',
			action:  'update',
			date:    '',
			content: '',
		};
	},

	render: function() {

		var verb       = 'create' === this.props.action ? 'created' : 'updated';
		var classNames = [ 'PageHistory_List_Item' ];

		if ( this.props.active ) {
			classNames.push( 'PageHistory_List_Item-Active' );
		}

		return (
			<li className={ classNames.join( ' ' ) } onClick={ this.handleSelectRevision }>
				{ this.props.author } { verb } { this.props.date }
			</li>
		);
	},

	handleSelectRevision: function(e) {
		this.props.actions.selectRevision( this.props );
	},

});

var PageHistory = React.createClass({

	getInitialState: function() {
		return {
			revisions: this.props.revisions,
			diff: { a: null, b: null },
		};
	},

	render: function() {

		const actions = {
			selectRevision: this.selectRevision,
		};

		return (
			<div>
				<PageHistoryDiff diff_a={ this.state.diff.a } diff_b={ this.state.diff.b } />
				<PageHistoryList revisions={ this.state.revisions } actions={ actions } />
			</div>
		);
	},

	/**
	 * Get the revision to compare against.
	 * This should always be the next most recent revision.
	 */
	getNextRevision: function( revision ) {

		var currentIndex, revision_b;

		if ( ! revision ) {
			return null;
		}

		this.props.revisions.forEach( function( _revision, i ) {
			if ( _revision.id === revision.id )  {
				currentIndex = i;
			}
		} );

		if ( 'undefined' === typeof currentIndex ) {
			return null;
		}

		if ( currentIndex < this.props.revisions.length - 1 ) {
			revision_b = this.props.revisions[ currentIndex + 1 ];
		} else {
			revision_b = this.props.revisions[ this.props.revisions.length - 1 ];
		}

		return revision_b;

	},

	selectRevision: function( revision ) {

		// If trying to select again, clear.
		if ( this.state.diff.a && revision.id === this.state.diff.a.id ) {
			revision = null;
		}

		// Update active state for each revision.
		var newRevisions = this.state.revisions.map( function( _revision ) {

			if ( revision && revision.id === _revision.id ) {
				_revision.active = true;
			} else {
				_revision.active = false;
			}

			return _revision;

		} );

		this.setState({
			revisions: newRevisions,
			diff:      { a: revision, b: this.getNextRevision( revision ) },
		});

		// Defer until actually set.
		window.setTimeout( function() {
			this.toggleContainerClass();
		}.bind( this ) );

	},

	toggleContainerClass: function() {

		var container = document.querySelectorAll( 'body.single-post .site-content .article, body.page .site-content .article' );

		if ( container.length < 1 ) {
			return;
		}

		console.log( this.state.diff );

		if  ( null === this.state.diff.a || null === this.state.diff.b ) {
			container[0].classList.remove( 'article-showing-diff' );
		} else {
			container[0].classList.add( 'article-showing-diff' );
		}

	},

});

var init = function() {

	var revisions, container, el;

	revisions = window.HMHandbookPageHistory;
	container = document.querySelectorAll( 'body.single-post .site-content .article, body.page .site-content .article' );

	if ( ! container.length ) {
		return;
	}

	container = container[0];
	el        = document.createElement( 'DIV' );

	container.appendChild( el );

	ReactDOM.render( <PageHistory revisions={ revisions } />, el );

}

module.exports = {
	init: init,
};

