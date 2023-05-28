import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../Components/card/Card";
import FeedMe from '../assets/FeedMe.jpg';
// import { selectUser } from "../redux/features/auth/authSlice";
import "./Profile.css";
import { toast } from "react-toastify";
import { updateUser } from "../services/authService";
import ChangePassword from "./changePassword/ChangePassword"

const EditProfile = () => {
  const navigate = useNavigate();
  // // const [isLoading, setIsLoading] = useState(false);
  // const user = useSelector(selectUser);
  // const { email } = user;

  // useEffect(() => {
  //   if (!email) {
  //     navigate("/profile");
  //   }
  // }, [email, navigate]);

  // const initialState = {
  //   name: user?.name,
  //   email: user?.email,
  //   photo: user?.photo,
  // };
  const [profile, setProfile] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    // try {
    //   // Handle Image upload
    //   let imageURL;
    //   if (
    //     profileImage &&
    //     (profileImage.type === "image/jpeg" ||
    //       profileImage.type === "image/jpg" ||
    //       profileImage.type === "image/png")
    //   ) {
    //     const image = new FormData();
    //     image.append("file", profileImage);
    //     image.append("cloud_name", "auntieyafen");
    //     image.append("upload_preset", "taiwanshashin");

    //     // First save image to cloudinary
    //     const response = await fetch(
    //       "https://api.cloudinary.com/v1_1/dstzn1rae/image/upload",
    //       { method: "post", body: image }
    //     );
    //     const imgData = await response.json();
    //     imageURL = imgData.url.toString();

    //     // Save Profile
    //     const formData = {
    //       name: profile.name,
    //       photo: profileImage ? imageURL : profile.photo,
    //     };

    //     const data = await updateUser(formData);
    //     console.log(data);
    //     toast.success("User updated");
    //     navigate("/profile");
    //     // setIsLoading(false);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   // setIsLoading(false);
    //   toast.error(error.message);
    // }
  };

  return (
    <div className="profile --my2">
      <Card cardClass={"card --flex-dir-column"}>
        <span className="profile-photo">
          {/* <img src={user?.photo} alt="profilepic" /> */}
          <img src={FeedMe} alt="profilepic" />
        </span>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                // value={profile?.name}
                value={"user"}
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
