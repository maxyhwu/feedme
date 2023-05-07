import dotenv from "dotenv-defaults";
dotenv.config();

const getEnv = async (req, res) => {
    try {
        const google_data = {
            redirect_signup: process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_SIGNUP,
            redirect_login: process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT,
            clientID: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
        };
        return res.status(201).send({success:true, data:google_data});
    }catch (err) {
        console.log('env error');
        console.log(err);
    }

}

export {
    getEnv
}