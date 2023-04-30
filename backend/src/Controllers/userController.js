import dotenv from "dotenv-defaults";
dotenv.config();

const logout = (req, res) => {
    try{
        req.logout();
        res.redirect(process.env.CLIENT_HOME_PAGE_URL);
    } catch (err) {
      console.log('Logout error', err);
    }
}

const loginfail = (req, res) => {
    try{
        res.status(401).json({
            success: false,
            message: "user failed to authenticate."
        });
    } catch (err) {
      console.log('Login fail error', err);
    }
}

const loginsuccess = (req, res) => {
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

export {
    logout,
    loginfail,
    loginsuccess
}