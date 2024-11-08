const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const googleStrategy = new GoogleStrategy(
	{
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: "http://localhost:8000/api/auth/google/callback",
	},
	(accessToken, refreshToken, profile, done) => {
		return done(null, profile);
	}
);

passport.use(googleStrategy);

module.exports = passport;
