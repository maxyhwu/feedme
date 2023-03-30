import React from "react";
import "./Startup.css";
import {
  IoIosArrowForward,
  IoIosNotifications,
  IoIosNotificationsOff,
} from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import { TbBellRinging } from "react-icons/tb";
import { BiFridge } from "react-icons/bi";

const Startup = () => {
  return (
    <div>
      {/* Main Frame */}
      <div className="main">
        {/* Edit Profile */}
        <div className="feild">
          <div className="setting-bar-button">
            <BsPerson className="setting-bar-button-icon" />
            <div className="setting-bar-button-text">Edit Profile</div>
            <IoIosArrowForward className="setting-bar-button-expand" />
          </div>
          <div className="keyin">
            <div className="flex_container">
              <div>Username</div>
              <input type="text" placeholder="Username" id="username" />
            </div>
            <div className="flex_container">
              <div>Interested Categories</div>
              <textarea
                type="textarea"
                placeholder="Such as Taiwanese Food, Rice or Refreshing (At most five
                categories)"
                id="categories"
              />
            </div>
          </div>
        </div>

        {/* Notification Setting */}
        <div className="feild">
          <div className="setting-bar-button">
            <TbBellRinging className="setting-bar-button-icon" />
            <div className="setting-bar-button-text">Notification Setting</div>
            <IoIosArrowForward className="setting-bar-button-expand" />
          </div>
          <div className="keyin">
            <div className="flex_container">
              <div>New recipe notification</div>
              <IoIosNotifications id="not_on" />
              {/* <IoIosNotificationsOff id="not_off"/> */}
            </div>
            <div className="flex_container">
              <div>Ingredient expire</div>
              <IoIosNotifications id="not_on" />
            </div>
          </div>
        </div>

        {/* Fridge Setting */}
        <div className="feild">
          <div className="setting-bar-button">
            <BiFridge className="setting-bar-button-icon" />
            <div className="setting-bar-button-text">Fridge Setting</div>
            <IoIosArrowForward className="setting-bar-button-expand" />
          </div>
          <div className="keyin">
            <div className="flex_container">
              <div>Update your fridge</div>
              <textarea
                type="text"
                placeholder="What’s in your fridge? (e.g. 1 carrot, 3 eggs ......)"
                id="fridge"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="submit-container">
          <button className="submit-button">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Startup;
