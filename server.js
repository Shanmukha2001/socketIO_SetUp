/* 

NOTE: I SUGGEST YOU TO HAVE A GLANCE AT ALL THE WEBSITES PROVIDED..NO NEED TO READ ALL THE ANSWERS ...
JUST READ THE MOST RELEVANT AND EASY TO UNDERSTAND ANSWERS (WITH HIGH VOTES PROVIDED)

https://youtu.be/xHLd36QoS4k <= see this video first to understand how require() works

https://stackoverflow.com/questions/18234491/two-sets-of-parentheses-after-function-call
https://stackoverflow.com/questions/24044997/what-does-double-parentheses-mean-in-a-require
REFER THE ABOVE SITES TO UNDERSTAND WHY WE ARE USING DOUBLE PARENTHESES require()()

prerequisite:
    functions to arrow functions(used in ES6) =>https://www.youtube.com/watch?v=h33Srr5J9nY
    basics of json in 10min => https://www.youtube.com/watch?v=iiADhChRriM
    call back functions => https://www.w3schools.com/js/js_callback.asp ( try writing some code)


*/

const express = require('express') // importing express 
const app = require('express')(); // importing express and storing the function in app
const http = require('http').createServer(app); // importing http and passing app to create a server
const { v4: uuidv4 } = require('uuid') // import v4 as uuidv4 from uuid, this is used to generate random length room numbers
const port = '3000'; // creating a port variable
let room = ''; // to store room id
// https://www.youtube.com/watch?v=ggVsXljT0MI <= see this if you did not understand the above explanation
// NOTE: THE ABOVE VIDEO IS THREE YEARS AGO( OUT DATED AND CANNOT BE USED IN PRESENT VERSION WHICH IS BEING USED) SO JUST UNDERSTAND IT 


const io = require('socket.io')(http); // import socket io and pass http to it

// set view engine as ejs since there were many errors associated with html
// moreover html is static type and ejs( https://www.quora.com/Why-do-developers-have-to-use-Jade-and-EJS-instead-of-HTML-with-Express-and-Node ) is dynamic
app.set('view engine', 'ejs')
app.use(express.static('public'))
// we are saying express to use public folder for all the static files, such as css,images and js, which we will be using in our client.js file

//where req , res are request and responce respectively
app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`);
    // generate a random room code(uuidv4() => this generates a random room ) and redirect to the generated room 
});

// once a random room number is generated , we can use it by using 
// /:room here 'room' is a variable name which is attached to req in the form of json see the below ex
// {
//     req{
//          ...
//          {
//            params{
//                  ....,
//                  room: "some-random-room-id-generated",
//                  ....
//              }
//          },
//          ...
//      }
// }
// you may see the req json code by using console.log(req) inside the below call back function
app.get('/:room', (req, res) => {
    res.render('client', { roomId: req.params.room });
    // console.log(req); // uncomment this to see the json file and find the room in the terminal ( ctrl+f works in terminal also)
    // render( show the user the client.ejs file ) and send roomId
    // where roomId is the variable name which is passed to client.js file 
    // we can use this roomId by typing <%= roomId %> inside the client.ejs file inside the script tags

});

/*  DO NOT CHANGE ABOVE CODE WRITE YOUR CODE INSIDE THIS BLOCK  
*/

io.on('connection', (socket) => {
    console.log('a user connected'); // print this line when a user is connectd in the terminal as this is server side
    console.log("room id: " + room); // print the room id
    let name = socket.handshake.headers.referer.split(`${port}/`)// split based on port number this will give us [ 'http://localhost:', 'roomid' ]
    room = name[1];

    // when a user emits 'chat message' ( this can be anything as this is just a random choosen name)
    // in sample.js  which is inside the public folder ( from client side )
    // we are sending the text entered by user inside the input ... which is recieved as msg
    // this msg is consoled in the server again

    //CHECK OUT THE CHEAT SHEET => TO UNDERSTAND THIS MORE CLEARLY
    // https://socket.io/docs/v3/emit-cheatsheet/
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });

    // when a user disconnects 'disconnect' is triggered and shown in the terminal
    socket.on('disconnect', () => {
        console.log('user disconnected:'+socket.id);
    });
});

/*  DO NOT CHANGE BELOW CODE WRITE YOUR CODE INSIDE THIS BLOCK  */

// listen the port, and when the server is ready...
http.listen(port, () => {
    console.log(`go to  locahost:${port}`) //... show this message in the cmd prompt
});