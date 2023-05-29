import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiHeart, FiBookmark, FiShare } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import "./ActionBar.css"
import { apiKeepLikeRecipes, apiRemoveLikeRecipes, apiUpdateAddLikeCount, apiUpdateMinusLikeCount } from "../../axios/withToken"
import { UseLoginContext } from "../../Context/LoginCnt";
import { UseDataContext } from "../../Context/useUserData";
import { socketAddLikecnt, socketMinusLikecnt } from "../../Context/commentSocketHooks";


const ActionBar = ({ recipeID, likeCnt, setLikeCnt }) => {
    const { login } = UseLoginContext();
    const { data, changeData } = UseDataContext();
    const [activeHeart, setActiveHeart] = useState(data.like.includes(recipeID));
    const rootPath = window.location.origin;

    const toggleHeart = () => {
        if (activeHeart === true) {  // remove like
            apiUpdateMinusLikeCount({Rid: recipeID});
            apiRemoveLikeRecipes({id: recipeID});
            changeData({ ...data, like: data.like.filter(item => item !== recipeID)});
            // setLikeCnt(prev => prev - 1);
            socketMinusLikecnt(recipeID);
        } else {  // add like
            apiUpdateAddLikeCount({Rid: recipeID});
            apiKeepLikeRecipes({id: recipeID});
            changeData({ ...data, like: [recipeID, ...data.like] });
            // setLikeCnt(prev => prev + 1);
            socketAddLikecnt(recipeID);
        }
        setActiveHeart(!activeHeart);
    }

    const shareRecipe = () => {
        navigator.clipboard.writeText(`${rootPath}/detail/${recipeID}`);
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

    useEffect(() => {
        setActiveHeart(data.like.includes(recipeID));
    }, [data]);

    return(
        <div className="action-bar">
            { 
                login ? 
                <div className="action" onClick={toggleHeart}>
                    <div className="icon">
                        {activeHeart ? <FaHeart style={{ color: 'red' }} /> : <FiHeart />}
                    </div>
                    <div className="text">{likeCnt} Likes</div>
                </div>
                : <></>
            }
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