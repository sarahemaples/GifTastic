$(document).ready(function(){
//topics array that creates our buttons
//user input will be added to the array as well
    var topics = ["red","orange","yellow","green","blue","indigo","violet"];

//function to create buttons
    function createBtns(arr){
        // clear the div so we don't duplicate buttons when we add a button
        $("#btns-here").empty();
        // loop through arr and create buttons for each item
        for (var a = 0; a < arr.length; a++){
            var tempBtn = $("<button>");
            // button text and id is equal to user input (arr[a])
            tempBtn.attr("id", arr[a]);
            tempBtn.text(arr[a]);
            // also i added a class to all them
            tempBtn.addClass("gifBtn");
            // console.log(tempBtn);
            //display buttons on screen
            $("#btns-here").append(tempBtn);
        }
    }
    //original call to display buttons when screen loads
    createBtns(topics);

// on click for the add button button
    $("#addBtns").on("click", function(){
        event.preventDefault();
// takes user input and pushes the value into our topics array
        var newBtn = $("#userInput").val().trim();
        topics.push(newBtn);
// call the create buttons function again to display our new array of buttons
        createBtns(topics);
    });

// click event for our buttons
    $("#btns-here").on("click", ".gifBtn",  function(){
        // console.log('clicked')

        // we want to grab the button's text (same as id) and then search the giphy api
        var search = $(this).attr("id");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        search + "&api_key=uv9EhjwXcASX1VXUucy9vgEGl20ftpX3";

        // ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
                console.log(response);
                // save resulting data as results
                var results = response.data;

                // loop through the results array
                for (var i = 0; i < 10; i++) {
                    //create new div for each gif
                    var gifDiv = $("<div>");
                    // display rating
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);

                    // display the static image of the gif
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.original_still.url);
                    gifImage.attr("id", "gif-"+i);

                    // add gifImg class
                    gifImage.addClass("gifImg");
        
                    // display user rating and gif still 
                    // i want to make these into cards or something so they are prettier but for not this is what we have
                    gifDiv.prepend(p);
                    gifDiv.prepend(gifImage);
        
                    //add gifs to the top of the page
                    $("#gifs-appear-here").prepend(gifDiv);
                  }
            });
    });

// click event for gifs
// originally the static image is displayed. on click we want to animate the gif
// on next click we want the static image to be displayed

    // boolean to track which click we are on
    var firstClick = true; 
    $("#gifs-appear-here").on("click", "gifImg", function(){
        if (firstClick){
            $(this).attr
        }
    });
});