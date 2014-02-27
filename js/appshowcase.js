var AppShowcase = (function() {
	
	// var $el = $( '#ac-wrapper' ),
	var $el = $( '.ac-wrapper' ),
		// device element
		$device = $el.find( '.ac-device' ),
		// the device image wrapper
		$trigger = $device.children( 'a:first' ),
		// the screens
		$screens = $el.find( '.ac-grid > a' ),
		// the device screen image
		$screenImg = $device.find( 'img' ),
		// the device screen title
		$screenTitle = $device.find( '.ac-title' ),
		// HTML Body element
		$body = $( 'body' ); 

	function init() {
		// show grid
		$trigger.on( 'click', showGrid );
		$('.column3').on( 'click', showGrid );
		// when a grid´s screen is clicked, show the respective image on the device
		$screens.on( 'click', function() {
			showScreen( $( this ) );
			return false;
		} );
	}

	function showGrid() {
		$el.addClass( 'ac-gridview' );
		// clicking somewhere else on the page closes the grid view
		$body.off( 'click' ).on( 'click', function() { showScreen(); } );
		return false;
	}

	// If you click outside of the screens the four internals disappear
	function showScreen( $screen ) {
		$el.removeClass( 'ac-gridview' );
	}

	return { init : init };

})();