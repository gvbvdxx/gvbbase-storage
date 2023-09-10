# FireBase Storage (GvbBase)
What is the point of this??

Lets say your in a situation where you have limited memory, but have a good internet connection,
and you have access to Node.JS and NPM, and you want to create a database using your own api (Not the FireBase API),
and you also want a quick and easy module to install into NPM.

Well this is the perfect module!


GvbBase Firebase Storage lets you upload, download, and delete files on your Firebase Storage system.

Usage:

~~~
var GvbBaseFirebaseStorage = require("gvbbase-storage");
var storage = new GvbBaseFirebaseStorage("firebase bucket goes here");

console.log("i'm gonna make a file named hello world!");
storage.uploadFile("Hello World.txt","Greetings to all peoples!","text/plain").then(() => {
	console.log("Now i'm gonna read it!");
	storage.downloadFile("Hello World.txt").then((data) => { //returns a buffer.
		console.log("The contents of the file: "+data.toString());
	});
});
~~~

Expected output:

i'm gonna make a file named hello world!

Now i'm gonna read it!

The contents of the file: Greetings to all peoples!


For deletion:

~~~
var GvbBaseFirebaseStorage = require("gvbbase-storage");
var storage = new GvbBaseFirebaseStorage("firebase bucket goes here");

console.log("i'm gonna delete the file named hello world!");
storage.deleteFile("Hello World.txt").then(() => {
	console.log("i just deleted the file!");
});
~~~

Expected output:

i'm gonna delete the file named hello world!

i just deleted the file!