// TODO use fn?

var pictures = ['apple', 'cat', 'chicken', 'dog', 'fish', 'horse', 'house'];
var currentPicture = pictures[Math.floor(Math.random() * pictures.length)]; // TODO Redis?

exports.getNewPicture = function() {
    currentPicture = pictures[Math.floor(Math.random() * pictures.length)];
    console.log("New picture: " + currentPicture);
};

exports.getCurrentPicture = function() {
    return currentPicture;
};