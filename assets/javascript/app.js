$(document).ready(function(){

    $("#red").on("click", function() {
        console.log('clicked')
        var search = $(this).attr("id");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        search + "&api_key=uv9EhjwXcASX1VXUucy9vgEGl20ftpX3";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
                console.log(response);
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
        
                    var rating = results[i].rating;
        
                    var p = $("<p>").text("Rating: " + rating);
        
                    var personImage = $("<img>");
                    personImage.attr("src", results[i].images.fixed_height.url);
        
                    gifDiv.prepend(p);
                    gifDiv.prepend(personImage);
        
                    $("#gifs-appear-here").prepend(gifDiv);
                  }
            });
    });

});