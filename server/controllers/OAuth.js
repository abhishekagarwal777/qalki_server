const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/UserOAuth");

// Configure the Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user exists in your database
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // User already exists, pass the user object to Passport
          return done(null, user);
        }

        // User does not exist, create a new user
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
        });

        // Save the new user to the database
        await user.save();

        // Pass the user object to Passport
        done(null, user);
      } catch (error) {
        // Log and pass the error to Passport
        console.error("Error saving user to database:", error);
        done(error);
      }
    }
  )
);

module.exports = passport;
