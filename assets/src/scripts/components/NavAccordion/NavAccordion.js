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
	navAccordionToggle.classList.add( 'NavAccordion_Toggle' );
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
			show = navAccordionItem.classList.contains( 'NavAccordion_Item-Closed' );
			navAccordionToggle.setAttribute( 'aria-expanded', 'false' );
		}

		if ( show ) {
			navAccordionItem.classList.remove( 'NavAccordion_Item-Closed' );
			navAccordionItem.classList.add( 'NavAccordion_Item-Open' );
			navAccordionToggle.classList.add( 'NavAccordion_Toggle-Open' );
			navAccordionToggle.setAttribute( 'aria-expanded', 'true' );
			subNav.style.display = 'block';
		} else {
			navAccordionItem.classList.add( 'NavAccordion_Item-Closed' );
			navAccordionItem.classList.remove( 'NavAccordion_Item-Open' );
			navAccordionToggle.classList.remove( 'NavAccordion_Toggle-Open' );
			navAccordionToggle.setAttribute( 'aria-expanded', 'false' );
			subNav.style.display = 'none';
		}

	}

	if ( navAccordionItem.classList.contains( 'NavAccordion_Item-Active' ) ) {
		toggleSubNav( true );
	} else if ( subNav.getElementsByClassName( 'NavAccordion_Item-Active' ).length > 0 ) {
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
