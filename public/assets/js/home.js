console.log('home.js');
$(document).ready(function(){

	$(document).on('click', '#search', searchUser);


	function renderUserRows(rows){
		console.log('HELLO');
		$.get('/friend-book/search/results', function(){
			if(rows.length){
				$('.container').append(rows);
			}
			else{
				noMatch();
			}
		});
	}

	function noMatch(){
		var alertDiv = $("<div>");
	    alertDiv.addClass("alert alert-danger");
	    alertDiv.html("No one by that name.");
	    $('.container').append(alertDiv);
	}

	function searchUser(){
		console.log('HELLO');

		var userName = {
			name: $('#name').val().trim();
		}

		$.post('/friend-book/search/user', userName).then(function(data){
			var rows = [];
			for(var x = 0; x < data.length; x++){
				rows.push(createUserRow(data[x]));
			}

			renderUserRows(rows);
		});
	}


	function createUserRow(data){
		var mainRowCont = $('<div class="media">');
		mainRowCont.data('user', data);

		//create profile image elements
		var profileImgCont = $('<div class="media-left media-middle">');
		var profileImg = $('<img class="media-object" src="/assets/images/hen.jpg">');
		profileImgCont.append(profileImg);
		mainRowCont.append(profileImgCont);

		//create 'about user' elements
		var aboutCont = $('<div class="media-body">');
		var name = $('<h4 class="media-heading">' + data.name + '</h4>'); 
		var profileLink = $('<h4 class="media-heading"><a href="/friend-book/profile?member_id="' + data.id + '">Profile Page</a></h4>');
		aboutCont.append(name);
		aboutCont.append(profileLink);
		mainRowCont.append(aboutCont);

		return mainRowCont;
	}






});