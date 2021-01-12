//PUBLIC FOLDER IS USED TO STORE ALL THE STATIC FILES SUCH AS IMAGES,JS FILES,CSS FILES( INSIDE CSS FOLDER) ETC

// create additional js files inside this folder only and use these files in your client.ejs file 
// you need not mention complete path.... say for ex: we create a file Hk.js inside the client.ejs we 
// just need to use <script src="Hk.js" defer ></script> we usually give complete path but this is taken care by express in our project

const socket = io();

var form = document.getElementById('form'); // using form
var input = document.getElementById('input'); // using input

// the below code works when we type something in the input and click enter or click on submit button
// submit is a keyword which is activated on submiting the form
// we are also passing a call back function with e as parameter ( where e takes care of the form to avoid refreshing)
// refer to this site https://www.w3schools.com/jsref/event_onsubmit.asp <= ctrl + click on the link to open the website directly 
form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent page to refresh
    if (input.value) { // if input has some value
        socket.emit('chat message', input.value); // send everyone that a message has arrived and send the message enterd
        input.value = ''; // set input value as '' i.e remove all the characters entered by user and make it empty
    }
});

socket.on()