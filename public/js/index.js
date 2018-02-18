var socketController = (function() {


    return {
        sendMessage: function(message, socket) {
            var username = document.querySelector('#username').innerHTML;
            socket.emit('message', { username: username, message: message });
        }
    };

})();

var UIController = (function() {

    var DOMstrings = {
        messageInput: '#message-input',
        usernameInput: '#username-input',
        usernameSpan: '#username-span', //TODO change name?
        username: '#username',
        continueButton: '#continue-button'
    };

    var getNewMessageElement = function() {
        return document.querySelector(DOMstrings.messageInput);
    }

    return {
        addMessageElement: function(username, message) {
            var html = '<tr><td>' + username + ": " + message + '</td></tr>';
            document.querySelector('tbody').insertAdjacentHTML('beforeend', html);

        },
        setUsername: function() {
            var usernameElement = document.querySelector(DOMstrings.usernameSpan);
            usernameElement.classList.remove('hidden');
            usernameElement.innerHTML = "Username: <span id='username'>" + document.querySelector(DOMstrings.usernameInput).value + "</span>";
        },
        getMessage: function() {
            return getNewMessageElement().value;
        },
        clearMessageInput: function() {
            getNewMessageElement().value = '';
        },
        getDOMstrings: function() {
            return DOMstrings;
        }
    };
})();

var controller = (function(socketCtrl, UICtrl) {

    var socket = io();

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.messageInput).addEventListener('keypress', function(event) {
            if (!(event.keyCode === 13 || event.which === 13))
                return;

            socketCtrl.sendMessage(UICtrl.getMessage(), socket);
            UICtrl.clearMessageInput();

        });

        document.querySelector(DOM.usernameInput).addEventListener('keypress', function(event) {
            if (!(event.keyCode === 13 || event.which === 13))
                return;

            UICtrl.setUsername();
            $('#modal1').modal('close');
        });

        document.querySelector(DOM.continueButton).addEventListener('click', function() {
            UICtrl.setUsername();
        });

        socket.on("chat_message", function(data) {
            UICtrl.addMessageElement(data.username, data.message);
        });
        socket.on("player_win", function(data) {
            document.querySelector('#message-input').value  = '';
            document.querySelector('#message-input').disabled = true;
            Materialize.toast("'" + data.username + "' won with '" + data.message + "'", 3500, 'rounded toastSuccess');
        });

        socket.on("picture_switch", function(newPicture) {
            document.querySelector('#message-input').disabled = false;
            document.querySelector('#guessing-picture').src = '/guessingImages/' + newPicture + '.png';
        });
    };


    return {
        init: function() {
            setupEventListeners();
        }
    };
})(socketController, UIController);

controller.init();
