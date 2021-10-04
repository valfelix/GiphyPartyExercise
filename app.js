console.log("Let's get this party started!");

function addGif(response) {
    let totalResults = response.data.length; 
    if (totalResults) {
        let $newDiv = $('<div>'); // new div to append to the empty gifs div already in html
        let index = Math.floor(Math.random() * totalResults + 1); // get a random index to get random image from total results from search
        let $newGif = $('<img>', { // new img to append to the new div
            src: response.data[index].images.downsized.url // get the downsized version of the image so they are not too large, url will come from this object
        });
        $newDiv.append($newGif); // append the gif to the new div
        $('.gifs').append($newDiv); // append the new div to the container div
    }
};

$('form').on('submit', async function(event) {
    event.preventDefault();

    const $searchInput = $('#search');
    let searchTerm = $searchInput.val();
    $searchInput.val(''); // clear input after submit

    try {
        const response = await axios.get('https://api.giphy.com/v1/gifs/search', { 
            params: { 
                api_key: 'gjiyhkFAafwUTIipujvsfO8zYP0KpvaR', // got the key from authentication by creating login account
                q: searchTerm, // search query term will come from the form input
            }
        }); 
        console.log(response);
        addGif(response.data); // run the addGif func with the request from this form input
    } catch (error) {
        alert('No Gifs Found'); // throw error alert in case search input has no results
    }
    
});

$('#remove').on('click', function() {
    $('.gifs').empty(); // empty gifs div when remove button is clicked
});

// KEY: gjiyhkFAafwUTIipujvsfO8zYP0KpvaR
