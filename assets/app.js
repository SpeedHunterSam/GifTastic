/* 
Pseudo code

1. onload generate row of animal buttons up top. types of animals stored in an array
2. populate images in responsive container.
3. add the ability to add buttons to the array by appending to the array of buttons


*/

const arrayOfAnimials = ["Dogs", "Cats", "Fox", "Squirrels", "Bunnies", "Horse", "Lions", "Monkeys"];

const apiKey = "HbfrJBcfJklMtkN0TmF5hNFYmZCT8Ted";
const searchTerm ="Dogs";
const queryURL= "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + apiKey + "&limit=1";


function getGifs(){

    fetch(queryURL).then(function (response) {
        return response.json()
    }).then(function (responseJson) {
        console.log(responseJson);

        const image = document.createElement("img");
        image.setAttribute('id', 'myImage');
    
        document.body.appendChild(image);
    
    
        const animalImage = document.getElementById("myImage");
        console.log(responseJson.data);
        animalImage.setAttribute("src", responseJson.data[0].source);

    });

    //document.getElementById("")



}
getGifs();



