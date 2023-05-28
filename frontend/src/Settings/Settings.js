import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SettingAddLabelRow from "./addLabel"

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
import { UseGeneralContext } from "../Context/generalTables";
import { toast } from 'react-toastify';


//import css
import "./Settings.css";

const Settings = () => {
  const {data, changeData} = UseDataContext()
  // username hook
  const [UserName, setUserName] = useState(data.userName);
  // interested categories hook
  // const [Categories, setCategories] = useState(
  //   data.favorite
  // );
  // notification hooks
  const [RecipeNoti, setRecipeNoti] = useState(data.notiRec);
  const [IngredNoti, setIngredNoti] = useState(data.notiIngre);
  const { labelTable } = UseGeneralContext()
  const [nextID, setNextID] = useState(0);
  const [ favoritNum, setFavoritNum] = useState(0)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [authFail, setAuthFail] = useState(false)
  const [valid, setValid] = useState(true)
  const allLabels = labelTable.map(label => label.labelName)
  const [click, setClick] = useState();
  // const [allLabels, setAllLabels] = useState(labelTable);
  const [addData, setData] = useState([{
    id: 0,
    label: '',
    matchingLabels: [],
    LabelValid: true,
  }]);

  const setAlert = (succ, fail, isvalid) => {
    setSaveSuccess(succ)
    setAuthFail(fail)
    setValid(isvalid)
}

useEffect ( () => {
  if (saveSuccess) {
      toast.success('成功更新 ! ', {
          position:toast.POSITION.TOP_CENTER,
          className: 'toast-success'
      })
      // window.location.reload(true)
  }
  if (authFail) {
      toast.info('更新失敗 ! ', {
          position:toast.POSITION.TOP_CENTER,
          className: 'toast-info'
      })}
  if (!valid) {
    toast.info('請輸入現有的label ! ', {
        position:toast.POSITION.TOP_CENTER,
        className: 'toast-info'
    })}
}, [saveSuccess, authFail, click, valid])

  async function saveProfile(credentials) {
    return apiEditProfile(credentials)
    .then(response=> {
        if (response.status === 200) {
            setAlert(true, false, true)
            return response.data
        }
    })
    .catch((reason) => {
        let response = reason.response
        if (response.status === 400) {
            if (response.data.message === 'Please authenticate.'){
                setAlert(false, true, true)
            }
        }
    })
}

  useEffect(()=> {
    // let test = [1, 2, 4]
    // console.log("next id = ", nextID)
    if (data.favorite !== null){
      let newData = [];
      data.favorite.forEach((id)=>{
        id = parseInt(id, 10)
        let labels = labelTable.find(label => label.id === id)
        let labelData = {
          id: newData.length,
          label: labels?.labelName,
          matchingLabels: [],
          LabelValid: true,
        }
        newData.push(labelData)
      })
      setData(newData)
      // setNextID(newData.length)
      // console.log("length = ", newData.length)
      setFavoritNum(newData.length)
    }
  }, [data, labelTable])

  const resetData = () => {
    setData([{
        id: 0,
        label: '',
        matchingLabels: [],
        LabelValid: true,
    }]);
}

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

  const handleAddRow = () => {
    // Add a new row to the data array in state
    const newData = [...addData, {    
      id: addData.length,    
      label: '',    
      matchingLabels: [],
      LabelValid: true,
    }];
    setData(newData);
    setNextID(nextID + 1);
    setFavoritNum(favoritNum+1)
}


  const handleInputChange = (rowId, fieldName, value) => {
    // Modify the data in state based on the input change
    setData(prevData => prevData.map((row) => {
        if (row.id === rowId) {
            if (fieldName === 'label') {
                const matchingLabels = allLabels.filter(row => row.toLowerCase().startsWith(value.toLowerCase()));
                return {
                  ...row,
                  [fieldName]: value,
                  'matchingLabels': matchingLabels.slice(0, 5),
                };
            }
            else {
                return {
                    ...row,
                    [fieldName]: value,
                };
            }
        } else {
            return row;
        }
    }));
}
  const handleRemoveRow = (rowId) => {
    if (addData.length > 1) {
        const newData = addData.filter(row => row.id !== rowId);
        setData(newData);
        setFavoritNum(favoritNum-1)
    }
    else {
        resetData();
    }
  }

  const updateFavoriteData = (addData) => {
    let newFavorite = []
    addData.forEach(data => {
      const label = labelTable.find(label => label.labelName.toLowerCase() === data.label.toLowerCase())
      if (label === undefined){
        setAlert(false, false, false)
        return null
      }
      const id = label.id
      newFavorite.push(id)
    })
    changeData({ ...data, favorite: newFavorite });
    return newFavorite
} 

  const handleSubmit = async e => {
    e.preventDefault();
    const newFavorite = updateFavoriteData(addData)
    if (newFavorite !== null ){
      console.log('newFavorite', newFavorite)
      await saveProfile({userName: data.userName, favorite: newFavorite, notiRec: data.notiRec, notiIngre: data.notiIngre})
    }
    setClick(!click)
  }

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
              id="settings.editpreference"
              defaultMessage="Edit Preference"
            >
              {(msg) => <div className="setting-bar-button-text">{msg}</div>}
            </FormattedMessage>
            <IoIosArrowForward className="setting-bar-button-expand" />
          </div>
          <div className="keyin">
            {/* <div className="flex-container"> */}
              {/* <FormattedMessage
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
              </FormattedMessage> */}
            {/* </div> */}
            <div className="flex-container">
            <FormattedMessage
                    id="settings.interestedLabels"
                    defaultMessage="Interested Categories"
                    className = "labell"
                  >
                    {(msg) => <div>{msg}</div>}
                  </FormattedMessage>
            <div className="fridgeadd-table">
                    {addData.map((row, i) => {
                      return (
                      <>
                        <SettingAddLabelRow
                            key={row.id}
                            rowId={row.id}
                            label={row.label}
                            matchingLabels={row.matchingLabels}
                            onInputChange={handleInputChange}
                            onDelete={handleRemoveRow}
                            labelValid={row.LabelValid}
                        />
                        {i + 1 === addData.length? <></>:<hr />}
                        </>
                      )
                    })}
                    <div>
                        {favoritNum < 3? <button className="btn btn-secondary fridgeadd-btn" onClick={handleAddRow}>Add Labels</button>:<></>}
                    </div>
              </div>
              {/* <FormattedMessage
                    id="settings.interestedCategories"
                    defaultMessage="InterestedCategories"
                  ></FormattedMessage>
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
              </FormattedMessage> */}
            </div>
          </div>
        </div>

        {/* Notification Setting
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
          </div> */}
        {/* </div> */}

        {/* Submit */}
        <div className="submit-container">
          <FormattedMessage id="settings.submit" defaultMessage="Submit">
            {(msg) => (
              <button className="submit-button" onClick={handleSubmit}>
                {/* onClick={handleQueryChange} */}
                {msg}
              </button>
            )}
          </FormattedMessage>
          <FormattedMessage id="settings.back" defaultMessage="back">
            {(msg) => (
              <button className="back-button" onClick={changePage}>
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
