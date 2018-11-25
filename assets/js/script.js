tvShows = ['game of thrones', 'the simpsons', 'the sopranos'];
// create buttons for each item in the array
function renderButtons() {
    $('#buttons').empty()

    for (var index = 0; index < tvShows.length; index++) {
        var newButtons = $('<button>').addClass("buttonSearch")
                                      .attr('data-show', tvShows[index])
        $('#buttons').append(newButtons.text(tvShows[index]));
    }
}
// text area for the input received bu the user
var submitTextArea = $('<input>').attr({
    "id": "add-tvshow",
    "type": "text",
})
// button to add tvshows button
var addButton = $('<button>').addClass("addButtons")
    .attr({
        "type": "submit",
        'id': "submitBtn"
    })
// append to html
$('#input').append(submitTextArea);
$('#input').append(addButton.text("Add Button"));

// click add btn to push item into array and create a button out of new input
$('#submitBtn').on('click', function(event){
    event.preventDefault();
    var input = $('#add-tvshow').val();
    tvShows.push(input)
    submitTextArea.val('')
    renderButtons();
});     

// call function to get initial buttons
renderButtons();

// click buttons to obtain gifs
$('#buttons').on('click', '.buttonSearch', function(){
    var show = $(this).attr('data-show');
    var queryUrl = 'https://api.giphy.com/v1/gifs/search?q=' + show + '&api_key=KTfvK3vSyQMXeNShXEKmsGQEoMZ1mbvE&limit=10';
    console.log(queryUrl)

    $.ajax({
        url: queryUrl,
        method: 'GET'
    })
    .then(function(response){
        var results = response.data;
console.log(results)

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var showImage = $("<img>");
            showImage.attr({
                "src": results[i].images.fixed_height_still.url,
                "data-still": results[i].images.fixed_height_still.url,
                "data-animate":  results[i].images.fixed_height.url,
                "data-state": "still"
            })
            showImage.addClass("gif")
            

            gifDiv.prepend(showImage);
            gifDiv.prepend(p);

            $('#gifsHere').prepend(gifDiv);
        }})
});

$('#gifsHere').on('click', '.gif', function() {
    alert('clicked')
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });


