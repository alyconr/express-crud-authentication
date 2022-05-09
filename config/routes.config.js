const express = require("express");
const router = express.Router();
const posts = require("../controllers/posts.controller");
const users = require("../controllers/users.controller");
const auth = require("../middlewares/auth.middleware");
const passport = require("passport");

router.get (  
    "/login/google", //google login
    passport.authenticate("google", { 
        scope: ["profile", "email"]
    })
)

router.get ( //get the callback url from google
    "/oauth2/redirect/google", 
    passport.authenticate("google", {
        failureRedirect: "/login", //if the user is not logged in, redirect to login page
        failureMessage: true, //if the user is not logged in, show the error message

    }),
   users.loginGoogleCallback  //if the user is logged in, redirect to the callback url
);


 


//list all posts
router.get("/api/posts", auth.checkAuth, posts.list);
router.get("/api/posts/:id", auth.checkAuth, posts.detail);
router.post("/api/posts", auth.checkAuth, posts.create);
router.patch("/api/posts/:id", auth.checkAuth, posts.update);
router.delete("/api/posts/:id", auth.checkAuth, posts.delete);

router.post("/api/users", users.create);
router.post("/api/login", users.login);

//logout module with a token
router.post("/api/logout", auth.checkAuth, users.logout);

//validate the user 
router.get("/api/users/:id/validate",  users.validate);


//delete the user
router.delete("/api/users/", users.delete);

router.get("/api/users/", users.list);

//update the user
router.patch("/api/users/:id",  users.update);



//access to authenticated user only
router.get("/api/posts", auth.checkAuth, posts.list);

module.exports = router;

