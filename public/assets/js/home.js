$('#personSearch').on('click', function(){
	var personSearch  = $('#inputpersonsearch').val().trim();
	console.log("asdfs",personSearch);

$.post( "/usersearch", { name: personSearch} );


})