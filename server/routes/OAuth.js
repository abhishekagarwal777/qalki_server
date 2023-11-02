const express = require("express");
const passport = require("passport");

const router = express.Router();

// Redirect the user to the OAuth provider for authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route to handle the OAuth provider's response
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    console.log("Authentication successful"); // Add this line
    // Successful authentication, redirect the user to a desired page
    res.redirect("/book");
  }
);

// Logout route
router.get("/logout", (req, res) => {
  req.logout(); // Provided by Passport to clear the session
  res.redirect("/");
});

module.exports = router;
