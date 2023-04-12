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
// import { BiFridge } from "react-icons/bi";

//import css
import "./Settings.css";

const Settings = () => {
  // username hook
  const [UserName, setUserName] = useState("abcdefg");
  // interested categories hook
  const [Categories, setCategories] = useState(
    "Taiwanese Food, Rice, Desserts"
  );
  // fridge items hook
  // const [FridgeItems, setFridgeItems] = useState("1 carrot, 3 eggs");
  // notification hooks
  const [RecipeNoti, setRecipeNoti] = useState(false);
  const [IngredNoti, setIngredNoti] = useState(true);

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
            <div className="setting-bar-button-text">Edit Profile</div>
            <IoIosArrowForward className="setting-bar-button-expand" />
          </div>
          <div className="keyin">
            <div className="flex-container">
              <div>Username</div>
              <input
                type="text"
                placeholder="Username"
                id="username"
                value={UserName}
                onChange={handleChange(setUserName)}
              />
            </div>
            <div className="flex-container">
              <div>Interested categories</div>
              <textarea
                type="textarea"
                placeholder="Such as Taiwanese Food, Rice or Desserts (At most five
                categories)"
                id="categories"
                value={Categories}
                onChange={handleChange(setCategories)}
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
            <div className="flex-container">
              <div>New recipe notification</div>
              {IngredNoti ? (
                <div className="notiBlock">
                  <IoIosNotifications
                    id="noti"
                    onClick={() => setIngredNoti(false)}
                  />
                  <div id="hints">(Click to close notification.)</div>
                </div>
              ) : (
                <div className="notiBlock">
                  <IoIosNotificationsOff
                    id="noti"
                    onClick={() => setIngredNoti(true)}
                  />
                  <div id="hints">(Click to open notification.)</div>
                </div>
              )}
            </div>
            <div className="flex-container">
              <div>Ingredient expire</div>
              {RecipeNoti ? (
                <div className="notiBlock">
                  <IoIosNotifications
                    id="noti"
                    onClick={() => setRecipeNoti(false)}
                  />
                  <div id="hints">(Click to close notification.)</div>
                </div>
              ) : (
                <div className="notiBlock">
                  <IoIosNotificationsOff
                    id="noti"
                    onClick={() => setRecipeNoti(true)}
                  />
                  <div id="hints">(Click to open notification.)</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Fridge Setting */}
        {/* <div className="feild">
          <div className="setting-bar-button">
            <BiFridge className="setting-bar-button-icon" />
            <div className="setting-bar-button-text">Fridge Setting</div>
            <IoIosArrowForward className="setting-bar-button-expand" />
          </div>
          <div className="keyin">
            <div className="flex-container">
              <div>Update your fridge</div>
              <textarea
                type="text"
                placeholder="What’s in your fridge? (e.g. 1 carrot, 3 eggs ......)"
                id="fridge"
                value={FridgeItems}
                onChange={handleChange(setFridgeItems)}
              />
            </div>
          </div>
        </div> */}

        {/* Submit */}
        <div className="submit-container">
          <button className="submit-button" onClick={changePage}>
            {/* onClick={handleQueryChange} */}
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
