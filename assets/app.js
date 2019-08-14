/* 
Pseudo code

1. onload generate row of animal buttons up top. types of animals stored in an array
2. populate images in responsive container.
3. add the ability to add buttons to the array by appending to the array of buttons


*/

let arrayOfAnimials = ["Dogs", "Cats", "Turtle", "Squirrels", "Bunnies", "Horse", "Lions", "Monkeys"];



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
        a.setAttribute("class", "btn btn-primary mr-1");

        // Adding the button to the HTML
        document.getElementById("buttons").append(a);
    }

}

function getGifs(searchTerm) {

    const apiKey = "HbfrJBcfJklMtkN0TmF5hNFYmZCT8Ted"; // my api key for giphy

    const queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + apiKey + "&limit=10"; // queryURL to be used in fetch 

    console.log(searchTerm);


    fetch(queryURL).then(function (response) {
        return response.json()
    }).then(function (responseJson) {
        console.log(responseJson);  //making sure that objects are being received through api

        for (let i = 0; i < 10; i++) { // looping to write two images to the dom


            const image = document.createElement("img");  //creaing image elements
            image.setAttribute('id', 'myImage');

            document.getElementById("images").prepend(image); //writing new element to the DOM

            //adding attributes to the img tag on the DOM
            const animalImage = document.getElementById("myImage");
            animalImage.setAttribute("src", responseJson.data[i].images.fixed_height_still.url);
            animalImage.setAttribute("data-still", responseJson.data[i].images.fixed_height_still.url);
            animalImage.setAttribute("data-animate", responseJson.data[i].images.fixed_height.url);
            animalImage.setAttribute("data-state", "still");
            animalImage.setAttribute("class", "gif");

            //display rating of gif
            const p = document.createElement("p");
            p.innerHTML = "Rated: " + responseJson.data[i].rating;
            document.getElementById("images").prepend(p);


        }
        animateTheGifs();

    });

}

function animateTheGifs(){  // function that runs and sets an event listener on the newly loaded gifs

    document.querySelectorAll(".gif").forEach(function (img) {
        img.addEventListener("click", function (event) {
    
          // The javascript getAttribute method allows us to get or set the value of any attribute on our HTML element
          const state = event.target.getAttribute("data-state");
          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value
          if (state === "still") {
            event.target.setAttribute("src", event.target.getAttribute("data-animate"));
            event.target.setAttribute("data-state", "animate");
          } else {
            event.target.setAttribute("src", event.target.getAttribute("data-still"));
            event.target.setAttribute("data-state", "still");
          }
        });
      });

}

showButtons();  //first function to run

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





