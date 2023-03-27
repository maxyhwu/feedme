import React from "react";
import "./Startup.css";

const Startup = () => {
  return (
    <div className="main-container">
      {/* NavBar */}
      <div className="navbar"></div>
      {/* Main Frame */}
      <div className="main">
        {/* Edit Profile */}
        <div className="feild1">
          <button className="setting-bar-button">
            <div className="setting-bar-button-icon"></div>
            <div className="setting-bar-button-text">Edit Profile</div>
            <div className="setting-bar-button-expand"></div>
          </button>
          <div>
            <div>Username</div>
            <div className="login-input-bar">Username</div>
          </div>
          <div>
            <div>Interested Categories</div>
            <div className="login-input-bar">
              Such as Taiwanese Food, Rice or Refreshing (At most five
              categories)
            </div>
          </div>
        </div>

        {/* Notification Setting */}
        <div className="feild2">
          <button className="setting-bar-button">
            <div className="setting-bar-button-icon"></div>
            <div className="setting-bar-button-text">Notification Setting</div>
            <div className="setting-bar-button-expand"></div>
          </button>
          <div>
            <div>New recipe notification</div>
            <div className="bell"></div>
          </div>
          <div>
            <div>Ingredient expire</div>
            <div className="bell"></div>
          </div>
        </div>

        {/* Fridge Setting */}
        <div className="feild3">
          <button className="setting-bar-button">
            <div className="setting-bar-button-icon"></div>
            <div className="setting-bar-button-text">Notification Setting</div>
            <div className="setting-bar-button-expand"></div>
          </button>
          <div>
            <div>Update your fridge</div>
            <div className="login-input-bar">
              What’s in your fridge? (e.g. 1 carrot, 3 eggs ......)
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="submit-button">Submit</div>
      </div>
      {/* Footer */}
      <div className="footer"></div>
    </div>
  );
};

export default Startup;
