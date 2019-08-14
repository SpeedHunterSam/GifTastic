/* 
Pseudo code

1. onload generate row of animal buttons up top. types of animals stored in an array
2. populate images in responsive container.
3. add the ability to add buttons to the array by appending to the array of buttons


*/

let arrayOfAnimials = ["Dogs", "Cats", "Fox", "Squirrels", "Bunnies", "Horse", "Lions", "Monkeys"];



function showButtons() {

    //clear contents of the div
    document.getElementById("buttons").innerHTML = "";


    // Looping through the array of animals
    for (let i = 0; i < arrayOfAnimials.length; i++) {

        console.log(arrayOfAnimials.length);
        // Then dynamicaly generating buttons for each movie in the array.
        const a = document.createElement("button");
        // Adding a class
        a.classList.add("AnimalButton");
        // Adding a data-attribute with a value of the movie at index i
        a.setAttribute("data-name", arrayOfAnimials[i]);
        // Providing the button's text with a value of the movie at index i
        a.innerHTML = arrayOfAnimials[i];
        // Adding the button to the HTML
        document.getElementById("buttons").append(a);
    }

}

function getGifs(searchTerm) {

    const apiKey = "HbfrJBcfJklMtkN0TmF5hNFYmZCT8Ted"; // my api key for giphy

    const queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + apiKey + "&limit=1"; // queryURL to be used in fetch 

    console.log(searchTerm);
    

    fetch(queryURL).then(function (response) {
        return response.json()
    }).then(function (responseJson) {
        console.log(responseJson);  //making sure that objects are being received through api
        const image = document.createElement("img");  //creaing image elements
        image.setAttribute('id', 'myImage');

        document.body.appendChild(image);

        const animalImage = document.getElementById("myImage");
        console.log(responseJson.data[0].images.downsized.url);
        animalImage.setAttribute("src", responseJson.data[0].images.downsized.url);

    });

}

showButtons();


document.getElementById("buttons").addEventListener("click", function (event) {

    console.log(event);
    const buttonValue = event.target.innerText;
    console.log("Button Clicked: " + buttonValue)
    getGifs(buttonValue.trim());
});

//add event listener for text box / user input

document.getElementById("search-gifs").addEventListener("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    event.preventDefault();

    //receiving text typed and storing it in variable userInput
    const userInput = document.getElementById("search-input").value.trim();
    //adding the new item to the end of the array
    arrayOfAnimials.push(userInput);

    // reprossing butons at top of screen
    showButtons();
});




