var React    = require( 'react' );
var ReactDOM = require( 'react-dom' );
var diff_match_patch = require("exports?diff_match_patch!./vendor/diff_match_patch.js")

var container;

var RevisionDiff = React.createClass({

	getInitialState: function() {
		return {
			revision_a: null,
			revision_b: null,
		};
	},

	render: function() {

		if ( this.props.revision_a && this.props.revision_b ) {

			if ( container ) {
				container.classList.add( 'article-showing-diff' );
			}

			var html = this.getDiffHTML();
			return ( <pre className="article-diff" dangerouslySetInnerHTML={ { __html: html } } /> );
		} else {
			container.classList.remove( 'article-showing-diff' );
			return( <div /> );
		}

	},

	getDiffHTML: function() {

		var html     = '';
		var dmp      = new diff_match_patch();
		var textDiff = dmp.diff_main( this.props.revision_b.content, this.props.revision_a.content );

		dmp.diff_cleanupSemantic( textDiff );

		function escapeHtml(text) {
			var map = {
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				"'": '&#039;'
			};

			return text.replace(/[&<>"']/g, function(m) { return map[m]; });
		}

		// return dmp.diff_prettyHtml( textDiff );
		textDiff.forEach( function( part ) {
			if ( -1 === part[0] ) {
				html += '<del class="Diff-Removed">' + escapeHtml( part[1] ) + '</del>';
			} else if ( 1 === part[0] ) {
				html += '<ins class="Diff-Added">' + escapeHtml( part[1] ) + '</ins>';
			} else {
				html += '<span class="Diff-Text">' + escapeHtml( part[1] ) + '</span>';
			}
		} );

		return html;

	},

});

var RevisionList = React.createClass({

	getInitialState: function() {
		return {
			revisions: [],
		};
	},

	render: function() {

		var self = this;

		var revisionListItemNodes = this.props.revisions.map( function( revision ) {
			return (
				<RevisionListItem key={ revision.id } id={ revision.id } action={ revision.action } author={ revision.author } date={ revision.date } content={ revision.content } onSelectRevision={ self.props.onSelectRevision }/>
			);
		});

		return (
			<div className="RevisionList_Container">
				<h4 className="RevisionList_Title">Page History</h4>
				<ul className="RevisionList">
					{ revisionListItemNodes }
				</ul>
			</div>
		);

	},

});

var RevisionListItem = React.createClass({

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
		var classNames = [ 'RevisionListItem' ];

		if ( this.state.active ) {
			classNames.push( 'RevisionListItem-Active' );
		}

		return (
			<li className={ classNames.join( ' ' ) } onClick={ this.handleSelectRevision }>
				{ this.props.author } { verb } { this.props.date }
			</li>
		);
	},

	handleSelectRevision: function(e) {

		var els = document.getElementsByClassName( 'RevisionListItem-Active' );

		Array.prototype.forEach.call( els, function( el ) {
			el.classList.remove( 'RevisionListItem-Active' );
		});

		this.setState( { active: true } );
		this.props.onSelectRevision( this.props );
	},

});

var ArticleHistory = React.createClass({

	getInitialState: function() {
		return {
			revisions: [],
			revision_a: null,
			revision_b: null,
		};
	},

	render: function() {

		console.log( 'ArticleHistory render' );

		return (
			<div>
				<RevisionDiff revision_a={ this.state.revision_a } revision_b={ this.state.revision_b } />
				<RevisionList revisions={ this.props.revisions } onSelectRevision={ this.handleSelectRevision } />
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
			revision_a: revision_a,
			revision_b: revision_b,
		});

	}

});

var init = function() {
	var el = document.createElement( 'DIV' );
	container.appendChild( el );
	ReactDOM.render( <ArticleHistory revisions={ window.HMHandbookRevisions } />, el );
}

container = document.querySelector( 'body.single-post .site-content .article' );

if ( ! container ) {
	container = document.querySelector( 'body.page .site-content .article' );
}

if ( container ) {
	init();
}
