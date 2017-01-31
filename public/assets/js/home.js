
$('#searchperson').on('click', function(){
	var personSearch  = $('#inputpersonsearch').val().trim();
	console.log("frontend personserch",personSearch);

	$.post( "/friend-book/search", 
		{name: personSearch},
		function( data ) {
		 	window.location.href = '/friend-book/personresults';
		}
	);

});

