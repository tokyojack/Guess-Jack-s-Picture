var router = require("express").Router();
var currentPictureManager = require('./../managers/currentPictureManager')

// URL: "/"
module.exports = function() {

    // "index.ejs" page
    router.get("/", function(req, res) {
        res.render("index.ejs", {
            currentPicture: currentPictureManager.getCurrentPicture() + '.png'
        });
    });

    return router;
};
