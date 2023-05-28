import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../Components/card/Card";
import FeedMe from '../assets/FeedMe.jpg';
// import { selectUser } from "../redux/features/auth/authSlice";
import "./Profile.css";
import { toast } from "react-toastify";
import { updateUser } from "../services/authService";
import ChangePassword from "./changePassword/ChangePassword";
import { apiUpdateUserImage } from "../axios/withToken";
import { UseDataContext } from "../Context/useUserData";

const EditProfile = () => {
  const navigate = useNavigate();
  // // const [isLoading, setIsLoading] = useState(false);
  // const user = useSelector(selectUser);
  // const { email } = user;
  const {data, changeData} = UseDataContext();

  // useEffect(() => {
  //   if (!email) {
  //     navigate("/profile");
  //   }
  // }, [email, navigate]);

  const initialState = {
    name: data?.userName,
    email: data?.email,
    photo: data?.image,
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");

  async function updateImage(credentials) {
    return apiUpdateUserImage(credentials)
    .then(response=> {
        if (response.status === 200) {
          toast.success("Image updated");
           return response.data;
        }
    })
    .catch((reason) => {
        let response = reason.response
        if (response.status === 400) {
            console.log("error")
        }
    })
}

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
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
        console.log("imagggee", profileImage)
        image.append("file", profileImage);
        const response = await updateImage(image)
        changeData({...data, [image]: response.url})
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
      console.log(error);
      // setIsLoading(false);
      toast.error(error.message);
    }
  };

  const saveProfile = () => {

  }

  return (
    <div className="profile --my2">
      <Card cardClass={"card --flex-dir-column"}>
        <span className="profile-photo">
          {/* <img src={FeedMe} alt="profilepic" /> */}
          <form>
          <img src={profile?.photo} alt="profilepic" />
          <div>
              <button className="--btn --btn-primary" onClick={saveImageProfile}>Edit Profile</button>
          </div>
          </form>
        </span>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile?.name}
                // value={"user"}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Email:</label>
              <input type="text" name="email" value={profile?.email} disabled />
              <br />
              <code>Email cannot be changed.</code>
            </div>       
            <div>
              <label>Photo:</label>
              <input type="file" name="image" onChange={handleImageChange} />
            </div>
            <div>
              <button className="--btn --btn-primary" >Edit Profile</button>
            </div>
          </span>
        </form>
      </Card>
      <br />
      <ChangePassword />
    </div>
  );
};

export default EditProfile;
