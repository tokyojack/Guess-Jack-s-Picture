var delayed = require('delayed');
var currentPictureManager = require('./../managers/currentPictureManager')

module.exports = function(socket, io) {

    socket.on('message', function(sentMessage) {

        // If the sent picture is equal to the current picture
        if (sentMessage.message == currentPictureManager.getCurrentPicture()) {
            io.emit('player_win', sentMessage);

            // Switches the picture have 3.5 seconds
            delayed.delay(function() {                
                currentPictureManager.getNewPicture();
                io.emit('picture_switch', currentPictureManager.getCurrentPicture());
            }, 3500);

            return; // Stop's the correct answer from being messaged
        }

        io.emit('chat_message', sentMessage);
    });

};
