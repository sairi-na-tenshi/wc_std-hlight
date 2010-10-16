var HLight= {}

HLight.TagWrapper= FCached( function( name ){
	var open= '<' + name + '>'
	var close= '</' + name + '>'
	return function( str ){
		return open + str + close
	}
})

HLight.plainText= FCached( function( str ){
	return String( str || '' )
	.split( '&' ).join( '&amp;' )
	.split( '>' ).join( '&gt;' )
	.split( '<' ).join( '&lt;' )
	//.split( '\r' ).join( '' )
	//.split( '\n' ).join( '<br />' )
})

HLight.revert= function( str ){
	BR2LF:        str= str.split( /<br ?\/?>/i ).join( '\n' )
	stripTags:    str= str.split( /<[\s\S]*?>/ ).join( '' )
	noCR:         str= str.split( /\r/ ).join( '' )
	linePrefixCR: str= '\r' + str.split( '\n' ).join( '\n\r' )
	decodeNBSP:   str= str.split( '&nbsp;' ).join( ' ' )
	decodeGT:     str= str.split( '&gt;' ).join( '>' )
	decodeLT:     str= str.split( '&lt;' ).join( '<' )
	decodeAMP:    str= str.split( '&amp;' ).join( '&' )
	return str
}

HLight.serialize= function( data ){
	if( typeof data !== 'object' ) return HLight.plainText( data )
	var content= []
	for( var name in data ){
		if( !data.hasOwnProperty( name ) ) continue
		if( name.charAt( 0 ) === '#' ) continue
		var chunk= HLight.serialize( data[ name ] )
		if( Number( name ) != name ) chunk= HLight.TagWrapper( name )( chunk )
		content.push( chunk )
	}
	content= content.join( '' )
	var prefix= data[ '#line-prefix' ]
	if( prefix ) content= content.split( '\r' ).join( '\r' + HLight.serialize( prefix ) )
	//console.log( content )
	return content
}
