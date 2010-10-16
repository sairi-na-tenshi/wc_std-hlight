CComponent( 'std:hlight', function( el ){
	var lang= CHiqus( el.className ).get( 'lang' )
	var parse= FParser.lang[ lang ]
	var data= HLight.revert( el.innerHTML.replace( /^\s+|\s+$/g, '' ) )
	console.log( data )
	if( parse ) data= parse( data )
	el.innerHTML= HLight.serialize( data ).split( '\r' ).join( '' ).split( '\n' ).join( '<br />' )
})
