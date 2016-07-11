var React    = require( 'react' );
var ReactDOM = require( 'react-dom' );
var diff_match_patch = require("exports?diff_match_patch!./../vendor/diff_match_patch.js");

var container;

var PageHistoryDiff = React.createClass({

	getInitialState: function() {
		return {
			diff: {
				a: null,
				b: null,
			}
		};
	},

	render: function() {

		if ( this.props.diff.a && this.props.diff.b ) {

			if ( container ) {
				container.classList.add( 'article-showing-diff' );
			}

			var html = this.getDiffHTML();
			return ( <div className="PageHistory_Diff" dangerouslySetInnerHTML={ { __html: html } } /> );
		} else {
			container.classList.remove( 'article-showing-diff' );
			return( <div /> );
		}

	},

	getDiffHTML: function() {

		var html = [];
		var dmp  = new diff_match_patch();

		var diff = dmp.diff_main(
			this.props.diff.b.content.replace( /[\n|\r]{2,}/g, "\n\n" ),
			this.props.diff.a.content.replace( /[\n|\r]{2,}/g, "\n\n" )
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

var PageHistoryList = React.createClass({

	getInitialState: function() {
		return {
			revisions: [],
		};
	},

	render: function() {

		var self = this;

		var listItemNodes = this.props.revisions.map( function( revision ) {
			return (
				<PageHistoryListItem key={ revision.id } id={ revision.id } action={ revision.action } author={ revision.author } date={ revision.date } content={ revision.content } onSelectRevision={ self.props.onSelectRevision }/>
			);
		});

		return (
			<div className="PageHistory_List_Container">
				<h4 className="PageHistory_List_Title">Page History</h4>
				<ul className="PageHistory_List">
					{ listItemNodes }
				</ul>
			</div>
		);

	},

});

var PageHistoryListItem = React.createClass({

	getInitialState: function() {
		return {
			id: 0,
			action: 'update',
			author: '',
			date: '',
			active: false,
		};
	},

	render: function() {

		var verb       = 'create' === this.props.action ? 'created' : 'updated';
		var classNames = [ 'PageHistory_List_Item' ];

		if ( this.state.active ) {
			classNames.push( 'PageHistory_List_Item-Active' );
		}

		return (
			<li className={ classNames.join( ' ' ) } onClick={ this.handleSelectRevision }>
				{ this.props.author } { verb } { this.props.date }
			</li>
		);
	},

	handleSelectRevision: function(e) {

		var els = document.getElementsByClassName( 'PageHistory_List_Item-Active' );

		Array.prototype.forEach.call( els, function( el ) {
			el.classList.remove( 'PageHistory_List_Item-Active' );
		});

		this.setState( { active: true } );
		this.props.onSelectRevision( this.props );
	},

});

var PageHistory = React.createClass({

	getInitialState: function() {
		return {
			revisions: [],
			diff: { a: null, b: null },
		};
	},

	render: function() {

		console.log( 'PageHistory render' );

		return (
			<div>
				<PageHistoryDiff diff={ this.state.diff } />
				<PageHistoryList revisions={ this.props.revisions } onSelectRevision={ this.handleSelectRevision } />
			</div>
		);
	},

	handleSelectRevision: function( revision_a ) {

		var currentIndex, revision_b;

		Array.prototype.forEach.call( this.props.revisions, function( revision, i ) {
			if ( revision_a.id === revision.id )  {
				currentIndex = i;
			}
		} );

		if ( currentIndex < this.props.revisions.length - 1 ) {
			revision_b = this.props.revisions[ currentIndex + 1 ];
		} else {
			revision_b = this.props.revisions[ this.props.revisions.length - 1 ];
		}

		this.setState({
			diff: { a: revision_a, b: revision_b },
		});

	}

});

var init = function() {

	var el;

	container = document.querySelectorAll( 'body.single-post .site-content .article, body.page .site-content .article' );

	if ( ! container.length ) {
		return;
	}

	container = container[0];
	el        = document.createElement( 'DIV' );

	container.appendChild( el );

	ReactDOM.render( <PageHistory revisions={ window.HMHandbookPageHistory } />, el );

}


module.exports = {
	init: init,
};

