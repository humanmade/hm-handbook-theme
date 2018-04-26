export default function( navAccordionItem ) {

	var subNav = Array.prototype.filter.call( navAccordionItem.children, function( el ) {
		return el.tagName === 'UL';
	} );

	if ( subNav.length < 1 ) {
		return;
	} else {
		subNav = subNav[0];
	}

	var navAccordionToggle = document.createElement( 'BUTTON' );

	var span = document.createElement('SPAN');
	span.appendChild( document.createTextNode( 'expand child menu' ) );
	span.classList.add( 'screen-reader-text' );

	navAccordionToggle.appendChild( span ) ;
	navAccordionToggle.classList.add( 'Btn' );
	navAccordionToggle.classList.add( 'nav-accordion__toggle' );
	navAccordionToggle.setAttribute( 'role', 'button' );
	navAccordionToggle.setAttribute( 'aria-haspopup', 'true' );

	var anchor = Array.prototype.filter.call( navAccordionItem.children, function( el ) {
		return el.tagName === 'A';
	} );

	if ( anchor.length ) {
		anchor[0].parentNode.insertBefore( navAccordionToggle,  subNav );
	}

	var toggleSubNav = function( show ) {

		if ( 'undefined' === typeof show ) {
			show = navAccordionItem.classList.contains( 'nav-accordion__item--closed' );
			navAccordionToggle.setAttribute( 'aria-expanded', 'false' );
		}

		if ( show ) {
			navAccordionItem.classList.remove( 'nav-accordion__item--closed' );
			navAccordionItem.classList.add( 'nav-accordion__item--open' );
			navAccordionToggle.classList.add( 'nav-accordion__toggle--open' );
			navAccordionToggle.setAttribute( 'aria-expanded', 'true' );
			subNav.style.display = 'block';
		} else {
			navAccordionItem.classList.add( 'nav-accordion__item--closed' );
			navAccordionItem.classList.remove( 'nav-accordion__item--open' );
			navAccordionToggle.classList.remove( 'nav-accordion__toggle--open' );
			navAccordionToggle.setAttribute( 'aria-expanded', 'false' );
			subNav.style.display = 'none';
		}

	}

	if ( navAccordionItem.classList.contains( 'nav-accordion__item--active' ) ) {
		toggleSubNav( true );
	} else if ( subNav.getElementsByClassName( 'nav-accordion__item--active' ).length > 0 ) {
		toggleSubNav( true );
	} else {
		toggleSubNav( false );
	}

	navAccordionToggle.addEventListener( 'click', function( event ) {
		event.preventDefault();
		navAccordionToggle.blur();
		toggleSubNav();
	});
}
