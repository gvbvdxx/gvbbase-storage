var GvbBaseFirebaseStorage = require("./index.js");
var storage = new GvbBaseFirebaseStorage("gvbvdxxgamemaker2communitydb.appspot.com");

console.log("i'm gonna make a file named hello world!");
storage.uploadFile("Hello World.txt","Greetings to all peoples!","text/plain").then(() => {
	console.log("Now i'm gonna read it!");
	storage.downloadFile("Hello World.txt").then((data) => { //returns a buffer.
		console.log("The contents of the file: "+data.toString());
		console.log("i'm gonna delete the file named hello world!");
		storage.deleteFile("Hello World.txt").then(() => {
			console.log("i just deleted the file!");
		});
	});
});