// $(document).ready(function(){

// 	$('#register').click(function(){

// 		if($('#name').val() === null || $('#name').val() === '' || $('#username').val() === null || 
// 			$('#username').val() === '' || $('#password').val() === null || $('#password').val() === '' ||
// 			$('#email').val() === null || $('#email').val() === '' || $('#description').val() === null ||
// 			$('#description').val() === ''){

// 			alert("Fill out all fields.");
// 			return;
// 		}

// 		if($('#password').val() !== $('#password2').val()){
// 			alert("Passwords do not match");
// 			return;
// 		}


// 		var userInfo = {
// 			name: $('#name').val().trim(),
// 			username: $('#username').val().trim(),
// 			password: $('#password').val().trim(),
// 			email: $('#email').val().trim(),
// 			description: $('#description').val().trim()
// 		}

// 		$.post('/friend-book/register', userInfo).then(function(data) {
// 			console.log(data);
// 			window.location.href = data.url;
// 		})
// 	});

// });