require('dotenv').config()

function logout(req, res) {
    try{
        req.logout();
        res.redirect(process.env.CLIENT_HOME_PAGE_URL);
    } catch (err) {
      console.log('Logout error', err);
    }
}

function loginfail(req, res) {
    try{
        res.status(401).json({
            success: false,
            message: "user failed to authenticate."
        });
    } catch (err) {
      console.log('Login fail error', err);
    }
}

function loginsuccess(req, res) {
    try{
        if (req.user) {
            res.json({
              success: true,
              message: "user has successfully authenticated",
              user: req.user,
              cookies: req.cookies
            });
          }
    } catch (err) {
      console.log('Login success error', err);
    }
}

module.exports ={
    logout,
    loginfail,
    loginsuccess
}