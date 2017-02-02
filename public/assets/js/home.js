$(document).ready(function() {
         
                        if (window.location.href.indexOf('http://localhost:8080/friend-book/') > -1) {
                            // your $.get here
                            $.get("/friend-book/all", function(data) {

                                console.log(data);

                                if (data.length !== 0) {

                                    for (var i = data.length-1; i > -1; i--) {

                                        var row = $(".media-body");
                                        // row.addClass("media-body");
                                        row.append("<h4>" + data[i].body + "</h4>");
                                        row.append("<p>At " + moment(data[i].createdAt).format("h:mma on dddd") + "</p>");



                                    }

                                }
                                $('#messages').fadeIn();

                            });


                            var click = 0;

                            $('#post').on('click', function() {
                                click++

                                var newPost = {
                                    post: $('#inputpost').val().trim(),
                                    created_at: moment().format("YYYY-MM-DD HH:mm:ss")
                                }

                                console.log(newPost)

                                $.post("/friend-book/home", newPost)
                                    // On success, run the following code
                                    .done(function() {

                                        // var row = $("<div>");
                                        // row.addClass("chirp");

                                        // row.append("<p>" + newChirp.author + " chirped: </p>");
                                        // row.append("<p>" + newChirp.body + "</p>");
                                        // row.append("<p>At " + moment(newChirp.created_at).format("h:mma on dddd") + "</p>");

                                        // $("#chirp-area").prepend(row);

                                    });

                                $.get("/friend-book/all", function(data) {
                                	$(".media-body").empty()

                                    console.log(data);

                                    if (data.length !== 0) {

                                        for (var i = 0; i < data.length; i++) {

                                            var row = $(".media-body");
                                            // row.addClass("media-body");
                                            row.append("<h4>" + data[i].body + "</h4>");
                                            console.log(data[i].created_at)
                                            console.log(data[i].createdAt)

                                            row.append("<p>At " + moment(data[i].createdAt).format("h:mma on dddd") + "</p>");



                                        }

                                    }




                                    $('#messages').show()


                                });

                            });

                        };
                    });
