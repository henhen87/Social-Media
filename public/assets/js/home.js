$(document).ready(function(){
$('#searchperson').on('click', function(){
	var personSearch  = $('#inputpersonsearch').val().trim();
	console.log("frontend personserch",personSearch);

	$.post( "/friend-book/search", { name: personSearch} );


})

});

