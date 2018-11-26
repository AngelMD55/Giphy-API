tvShows = ['game of thrones', 'the simpsons', 'the sopranos'];
// create buttons for each item in the array
$(document).ready(function () {
    function renderButtons() {
        $('#buttons').empty()

        for (var index = 0; index < tvShows.length; index++) {
            var newButtons = $('<button>').addClass("buttonSearch")
                .attr('data-show', tvShows[index])
                .addClass('btn-primary')
            $('#buttons').append(newButtons.text(tvShows[index]));
        }
    }
    // text area for the input received bu the user
    var submitTextArea = $('<input>').attr({
        "id": "add-tvshow",
        "type": "text",
        "placeholder": 'Add TV Show'
    })

    // button to add tvshows button
    var addButton = $('<button>').addClass("addButtons")
        .attr({
            "type": "submit",
            'id': "submitBtn"
        })
    // append to html
    $('#inputDiv').prepend(addButton.text("Add Button"));
    $('#inputDiv').prepend(submitTextArea);


    // click add btn to push item into array and create a button out of new input
    $('#submitBtn').on('click', function (event) {
        event.preventDefault();
        var input = $('#add-tvshow').val();
        tvShows.push(input)
        submitTextArea.val('')
        renderButtons();
    });

    // call function to get initial buttons
    renderButtons();

    // click buttons to obtain gifs
    $('#buttons').on('click', '.buttonSearch', function () {
        var show = $(this).attr('data-show');
        var queryUrl = 'https://api.giphy.com/v1/gifs/search?q=' + show + '&api_key=KTfvK3vSyQMXeNShXEKmsGQEoMZ1mbvE&limit=10';
        console.log(queryUrl)

        $.ajax({
            url: queryUrl,
            method: 'GET'
        })
            .then(function (response) {
                var results = response.data;
                console.log(results)

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>").addClass('col-md-6');
                
                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var showImage = $("<img>");
                    showImage.attr({
                        "src": results[i].images.fixed_height_still.url,
                        "data-still": results[i].images.fixed_height_still.url,
                        "data-animate": results[i].images.fixed_height.url,
                        "data-state": "still",
                        "dragable": true,
                    })
                    showImage.addClass("gif")


                    gifDiv.prepend(showImage);
                    gifDiv.prepend(p);

                    $('#gifsHere').prepend(gifDiv);
                }
            })
    });
    // clickable gifs to animate and make still
    $('#gifsHere').on('click', '.gif', function () {

        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    // Dragable gifs to choose favorites
    function drag(){
        dragGif = document.getElementsByClassName('gif');
        dragGif.addEventListener('dragstart', startDrag, false);
        dropBox = document.getElementById('favorites')
        dropBox.addEventListener('dragenter',function(e){e.preventDefault()} ,false);
        dropBox.addEventListener('dragover',function(e){e.preventDefault()} ,false);
        dropBox.addEventListener('drop', dropped ,false);
    }

    function startDrag(e){
        
        e.dataTransfer.setData('Text',dragGif);
    }

    function dropped(e){
        e.preventDefault();
        dropBox.innerHTML = e.dataTransfer.getData('Text');
    }
    drag();
    window.addEventListener('load', drag, false);
})