import passport from 'passport';
import TwitterTokenStrategy from 'passport-twitter-token';
import dotenv from "dotenv-defaults";
dotenv.config();
import { request } from 'request';

passport.use(new TwitterTokenStrategy({
    consumerKey: process.env.consumerKey,
    consumerSecret: process.env.consumerSecret,
    includeEmail: true
  },
  function(token, tokenSecret, profile, done) {
    // This function will be called after the user has authenticated with Twitter.
    // You can use the user's profile information to create or update a user record in your database.
    // Then, call the `done` function to let Passport know that the authentication was successful.
    // db.query('INSERT INTO users (twitter_id, username, display_name) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING RETURNING *', [profile.id, profile.username, profile.displayName], (err, result) => {
    //   if (err) {
    //     return done(err);
    //   }
    //   if (result.rows.length > 0) {
    //     return done(null, result.rows[0]);
    //   }
    //   return done(null, false, { message: 'Could not create user' });
    // });
    return done(null, profile)
  }
));

const twitterVerified = (req, res, next) => {
  console.log('verified')
  request.post({
    url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
    oauth: {
      consumer_key: process.env.consumerKey,
      consumer_secret: process.env.consumerSecret,
      token: req.query.oauth_token
    },
    form: { oauth_verifier: req.query.oauth_verifier }
  }, function (err, r, body) {
    if (err) {
      return res.send(500, { message: err.message });
    }

    console.log("body:", body);
    const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
    const parsedBody = JSON.parse(bodyString);
    console.log("parseBody", parsedBody);

    req.body['oauth_token'] = parsedBody.oauth_token;
    req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
    req.body['user_id'] = parsedBody.user_id;

    next();
  });
}

const authenticate = (req, res, next) => {
  try{
    passport.authenticate('twitter-token', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed', error: info });
      }
      req.user = user;
      next();
    })(req, res, next);
  } catch (err) {
    console.log("Authenticate Error")
  }
}

const login = (req, res, next) => {
  try{
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }
    // prepare token for API
    req.auth = {
      id: req.user.id
    };

    return next();
  } catch (err) {
    console.log('Failed to authorize Twitter User', err);
  }
}

const reverse = (req, res) => {
  request.post({
    url: 'https://api.twitter.com/oauth/request_token',
    oauth: {
      oauth_callback: "http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback",
      consumer_key: process.env.consumerKey,
      consumer_secret: process.env.consumerSecret
    }
  }, function (err, r, body) {
    if (err) {
      return res.send(500, { message: err.message });
    }


    var jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
    res.send(JSON.parse(jsonStr));
  });
}

export {
  twitterVerified,
  authenticate,
  login,
  reverse
};