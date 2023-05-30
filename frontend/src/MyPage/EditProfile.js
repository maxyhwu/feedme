import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../Components/card/Card";
// import { selectUser } from "../redux/features/auth/authSlice";
import "./Profile.css";
import { toast } from "react-toastify";
// import { updateUser } from "../services/authService";
import ChangePassword from "./changePassword/ChangePassword";
import { apiEditProfile } from '../axios/withToken';
import { apiUpdateUserImage } from "../axios/withToken";
import { UseDataContext } from "../Context/useUserData";

const EditProfile = () => {
  const navigate = useNavigate();

  const {data, changeData} = UseDataContext();
  // const {UserName, setUserName} = useState(data.userName)
  
  const initialState = {
    name: data?.userName,
    email: data?.email,
    photo: data?.image,
    provider: data?.provider
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState();
  const [showImage, setShowImage] = useState(profile.photo)

  // console.log("User Info: ",data);

  const [isShown, setIsShown] = useState(false);
  // console.log(data?.provider);

  useEffect(() => {
    if(data?.provider === 'local') {
      setIsShown(true);
    }
  }, [isShown])

  // console.log(isShown);

  async function updateImage(credentials) {
    return apiUpdateUserImage(credentials)
    .then(response=> {
        if (response.status === 200) {
          toast.success("Image updated!");
           return response.data;
        }
    })
    .catch((reason) => {
        let response = reason.response
        if (response.status === 400) {
            // console.log("error")
            toast.error(response);
        }
    })
  }

  async function updateProfile(credentials) {
    return apiEditProfile(credentials)
    .then(response=> {
        if (response.status === 200) {
            toast.success("Username updated!");
            return response.data
        }
    })
    .catch((reason) => {
        let response = reason.response
        if (response.status === 400) {
            if (response.data.message === 'Please authenticate.'){
                toast.error("Please authenticate.")
            }
        }
    })
}
// const handleSubmit = async e => {
//   e.preventDefault();
//   await saveProfile({userName: data.userName})
//   console.log("New name", UserName);
// }

  const handleInputChange = (e) => {
    const { value } = e.target;
    setProfile({ ...profile, name: value });
    // setProfile(e.target.value);
    // func(event.target.value);
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    // setProfile(e.target.value);
    const file = e.target.files[0]
    setShowImage(URL.createObjectURL(file));
  };

  const saveImageProfile = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    try {
      // Handle Image upload
      // let imageURL;
      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        const response = await updateImage(image)
        changeData({...data, image: response.url})
        navigate("/edit-profile");
        
        // image.append("cloud_name", "auntieyafen");
        // image.append("upload_preset", "taiwanshashin");

        // // First save image to cloudinary
        // const response = await fetch(
        //   "https://api.cloudinary.com/v1_1/dstzn1rae/image/upload",
        //   { method: "post", body: image }
        // );
        
        // const imgData = await response.json();
        // imageURL = imgData.url.toString();

        // // Save Profile
        // const formData = {
        //   name: profile.name,
        //   phone: profile.phone,
        //   bio: profile.bio,
        //   photo: profileImage ? imageURL : profile.photo,
        // };

        // const data = await updateUser(formData);
        // setIsLoading(false);
      }
    } catch (error) {
      // console.log(error);
      // setIsLoading(false);
      toast.error(error.message);
    }
  };

  const saveProfile = async (e) => {
      e.preventDefault();
      try {
          const userData = new FormData();
          userData.append('userName', profile.name)
          await updateProfile(userData)
          // console.log(profile.name)
          changeData({...data, userName: profile.name})
          navigate("/edit-profile");
      } catch (error) {
          // console.log(error);
          toast.error(error.message);
      }
  }

  return (
    <div className="profile --my2">
      <Card cardClass={"card --flex-dir-column"}>
        <span className="profile-photo">
          {/* <img src={FeedMe} alt="profilepic" /> */}
          <form>
          <img src={showImage} alt="profilepic" />
          
          </form>
          <div className="button-container">
              <button className="--btn --btn-primary" onClick={saveImageProfile}>Save Image</button>
          </div>
        </span>
        <form className="--form-control --m">
          <span className="profile-data">
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                placeholder={profile.name}
                // value={profile.name}
                onChange={handleInputChange}
              />
            </div>
            {/* <div>
              <label>Email:</label>
              <input type="text" name="email" value={profile?.email} disabled />
              <br />
              <code>Email cannot be changed.</code>
            </div>        */}
            <div>
              <label>Photo:</label>
              <input type="file" name="image" onChange={handleImageChange} />
            </div>
            <div className="button-container">
              <button className="--btn --btn-primary" onClick={saveProfile}>Save Profile</button>
            </div>
          </span>
        </form>
      </Card>
      <br />
      {isShown && (
        <span className="button-container">
            <ChangePassword />
        </span>
      )}
    </div>
  );
};

export default EditProfile;
