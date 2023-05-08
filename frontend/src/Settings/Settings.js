import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// icons
import {
  IoIosArrowForward,
  IoIosNotifications,
  IoIosNotificationsOff,
} from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import { TbBellRinging } from "react-icons/tb";
import { FormattedMessage } from "react-intl";
import { UseDataContext } from "../Context/useUserData";
import { apiEditProfile } from '../axios/withToken';

//import css
import "./Settings.css";

const Settings = () => {
  const {data} = UseDataContext()
  // username hook
  const [UserName, setUserName] = useState(data.userName);
  // interested categories hook
  const [Categories, setCategories] = useState(
    data.favorite
  );
  // notification hooks
  const [RecipeNoti, setRecipeNoti] = useState(data.notiRec);
  const [IngredNoti, setIngredNoti] = useState(data.notiIngre);

  // handleChange function
  const handleChange = (func) => (event) => {
    func(event.target.value);
    // console.log(UserName);
    // console.log(Categories);
    // console.log(FridgeItems);
  };

  // change page
  const navigate = useNavigate();
  const changePage = () => {
    navigate("/mypage");
  };

  // // handleQueryChange function
  // const handleQueryChange = async () => {
  //   const {
  //     data: { messages, message },
  //   } = await axios.get("/enrollments", {
  //     params: {
  //       queryString,
  //     },
  //   });

  //   // console.log(messages);

  //   if (!messages) addErrorMessage(message);
  //   else addRegularMessage(...messages);
  // };

  // // handleQuery function
  // const handleQuery = async () => {
  //   const {
  //     data: { messages, message },
  //   } = await axios.get("/enrollments", {
  //     params: {
  //       queryString,
  //     },
  //   });

  //   // console.log(messages);

  //   if (!messages) addErrorMessage(message);
  //   else addRegularMessage(...messages);
  // };

  // handleQuery only once to initialize
  // useEffect(() => {
  //   handleQuery();
  // }, []);

  return (
    <div>
      {/* Main Frame */}
      <div className="main">
        {/* Edit Profile */}
        <div className="feild">
          <div className="setting-bar-button">
            <BsPerson className="setting-bar-button-icon" />
            <FormattedMessage
              id="settings.editprofile"
              defaultMessage="Edit Profile"
            >
              {(msg) => <div className="setting-bar-button-text">{msg}</div>}
            </FormattedMessage>
            <IoIosArrowForward className="setting-bar-button-expand" />
          </div>
          <div className="keyin">
            <div className="flex-container">
              <FormattedMessage
                id="settings.username"
                defaultMessage="Username"
              >
                {(msg) => <div>{msg}</div>}
              </FormattedMessage>
              <FormattedMessage
                id="settings.initUsername"
                defaultMessage="e.g. abc"
              >
                {(msg) => (
                  <input
                    type="text"
                    placeholder={msg}
                    id="username"
                    value={UserName}
                    onChange={handleChange(setUserName)}
                  />
                )}
              </FormattedMessage>
            </div>
            <div className="flex-container">
              <FormattedMessage
                id="settings.interestedCategories"
                defaultMessage="InterestedCategories"
              >
                {(msg) => <div>{msg}</div>}
              </FormattedMessage>
              <FormattedMessage
                id="settings.initInterestedCategories"
                defaultMessage="e.g. Taiwanese Food, Rice or Desserts (At most five categories)"
              >
                {(msg) => (
                  <textarea
                    type="textarea"
                    placeholder={msg}
                    id="categories"
                    value={Categories}
                    onChange={handleChange(setCategories)}
                  />
                )}
              </FormattedMessage>
            </div>
          </div>
        </div>

        {/* Notification Setting */}
        <div className="feild">
          <div className="setting-bar-button">
            <TbBellRinging className="setting-bar-button-icon" />
            <FormattedMessage
              id="settings.notificationSetting"
              defaultMessage="Notification Setting"
            >
              {(msg) => <div className="setting-bar-button-text">{msg}</div>}
            </FormattedMessage>
            <IoIosArrowForward className="setting-bar-button-expand" />
          </div>
          <div className="keyin">
            <div className="flex-container">
              <FormattedMessage
                id="settings.NRNotification"
                defaultMessage="New recipe"
              >
                {(msg) => <div>{msg}</div>}
              </FormattedMessage>
              {IngredNoti ? (
                <div className="notiBlock">
                  <IoIosNotifications
                    id="noti"
                    onClick={() => setIngredNoti(false)}
                  />
                  <FormattedMessage
                    id="settings.closeNotification"
                    defaultMessage="(Click to turn off notification.)"
                  >
                    {(msg) => <div id="hints">{msg}</div>}
                  </FormattedMessage>
                </div>
              ) : (
                <div className="notiBlock">
                  <IoIosNotificationsOff
                    id="noti"
                    onClick={() => setIngredNoti(true)}
                  />
                  <FormattedMessage
                    id="settings.openNotification"
                    defaultMessage="(Click to turn on notification.)"
                  >
                    {(msg) => <div id="hints">{msg}</div>}
                  </FormattedMessage>
                </div>
              )}
            </div>
            <div className="flex-container">
              <FormattedMessage
                id="settings.IENotification"
                defaultMessage="Ingredient expire"
              >
                {(msg) => <div>{msg}</div>}
              </FormattedMessage>
              {RecipeNoti ? (
                <div className="notiBlock">
                  <IoIosNotifications
                    id="noti"
                    onClick={() => setRecipeNoti(false)}
                  />
                  <FormattedMessage
                    id="settings.closeNotification"
                    defaultMessage="(Click to turn off notification.)"
                  >
                    {(msg) => <div id="hints">{msg}</div>}
                  </FormattedMessage>
                </div>
              ) : (
                <div className="notiBlock">
                  <IoIosNotificationsOff
                    id="noti"
                    onClick={() => setRecipeNoti(true)}
                  />
                  <FormattedMessage
                    id="settings.openNotification"
                    defaultMessage="(Click to turn on notification.)"
                  >
                    {(msg) => <div id="hints">{msg}</div>}
                  </FormattedMessage>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="submit-container">
          <FormattedMessage id="settings.submit" defaultMessage="Submit">
            {(msg) => (
              <button className="submit-button" onClick={changePage}>
                {/* onClick={handleQueryChange} */}
                {msg}
              </button>
            )}
          </FormattedMessage>
        </div>
      </div>
    </div>
  );
};

export default Settings;
