$(document).ready(function(){
//topics array that creates our buttons
//user input will be added to the array as well
    var topics = ["red","orange","yellow","green","blue","indigo","violet"];

    //array of colors for the buttons
    var colors = ["OrangeRed", "Orange", "Yellow", "Lime", "Aqua", "Fuchsia", "DarkViolet"];
    var colIndex = 0;

//function to create buttons
    function createBtns(arr){
        colIndex = 0;
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
            //i want the buttons to be different colors
            tempBtn.attr("style", "background-color: "+colors[colIndex]);
            colIndex++;
            if (colIndex == colors.length){
                colIndex = 0;
            };
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
                    
                    // add class
                    gifDiv.addClass("gif-div");
                    gifDiv.addClass("card");

                    // display rating
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);

                    // display the static image of the gif
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.original_still.url);

                    // save the moving img as the value so it is easier to grab later
                    gifImage.attr("value", results[i].images.fixed_height.url);

                    // add id 
                    gifImage.attr("id", "gif-"+search+"-"+i);

                    //set width
                    gifImage.attr("width", "100%");

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

    $("#gifs-appear-here").on("click", ".gifImg", function(){
        // grab id of image clicked on
        var gifClicked = $(this);
        // console.log($(imgID));

        // we want to switch the src and value so we need to store some temporary values and switch them around
        var tempsrc = $(gifClicked).attr("value");
        var tempVal = $(gifClicked).attr("src");

        $(gifClicked).attr("src", tempsrc);
        $(gifClicked).attr("value", tempVal);

        console.log(tempVal, tempsrc);
    });
});