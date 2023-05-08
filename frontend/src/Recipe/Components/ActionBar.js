import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiHeart, FiBookmark, FiShare } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import "./ActionBar.css"
import { apiKeepRecipes, apiRemoveLikeRecipes, apiUpdateAddLikeCount, apiUpdateMinusLikeCount } from "../../axios/withToken"

const ActionBar = ({ recipeID }) => {
    const [activeHeart, setActiveHeart] = useState(false);

    const toggleHeart = () => {
        if (activeHeart === true) {
            apiUpdateMinusLikeCount({id: recipeID});
            apiRemoveLikeRecipes({id: recipeID});
        } else {
            apiUpdateAddLikeCount({id: recipeID});
            apiKeepRecipes({id: recipeID})
        }
        setActiveHeart(!activeHeart);
    }

    const shareRecipe = () => {
        navigator.clipboard.writeText(`http://localhost:3000/detail/${recipeID}`);
        toast.success('Copied to Clipboard!', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    return(
        <div className="action-bar">
            <div className="action" onClick={toggleHeart}>
                <div className="icon">
                    {activeHeart ? <FaHeart style={{ color: 'red' }} /> : <FiHeart />}
                </div>
                <div className="text">Like</div>
            </div>
            {/* <div className="action">
                <div className="icon">
                    <FiBookmark />
                </div>
                <div className="text">Save</div>
            </div> */}
            <div className="action" onClick={shareRecipe}>
                <div className="icon">
                    <FiShare />
                </div>
                <div className="text">Share</div>
            </div>
        </div>
    )
}

export default ActionBar;