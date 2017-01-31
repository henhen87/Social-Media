
$('#searchperson').on('click', function(e){
	e.preventDefault();
	var personSearch  = $('#inputpersonsearch').val().trim();
	console.log("frontend personserch",personSearch);
window.location.href = '/friend-book/personresults/' + personSearch;
// 	$.post( "/friend-book/search", 
// 		{name: personSearch}).then(function( data ) {
// console.log('data', data)

// 		 	window.location.href = '/friend-book/personresults/' + data.id;	

// 		});

});

