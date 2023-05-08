import dotenv from "dotenv-defaults";
dotenv.config();

const getEnv = async (req, res) => {
    try {
        const google_data = {
            redirect_signup: process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_SIGNUP,
            redirect_login: process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT,
            clientID: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
        };
        const twitter_data = {
            redirect_login: process.env.REACT_APP_TWITTER_REDIRECT_LOGIN,
            redirect_signup: process.env.REACT_APP_TWITTER_REDIRECT_SIGNUP,
            request_url: process.env.REACT_APP_TWITTER_REQUEST_URL
        }
        return res.status(201).send({success:true, google:google_data, twitter:twitter_data});
    }catch (err) {
        console.log('env error');
        console.log(err);
    }

}

export {
    getEnv
}