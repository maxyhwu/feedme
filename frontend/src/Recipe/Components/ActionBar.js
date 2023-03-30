import { FiHeart, FiBookmark, FiShare } from 'react-icons/fi';
import "./ActionBar.css"

const ActionBar = () => {
    return(
        <div className="action-bar">
            <div className="action">
                <div className="icon">
                    <FiHeart />
                </div>
                <div className="text">Like</div>
            </div>
            <div className="action">
                <div className="icon">
                    <FiBookmark />
                </div>
                <div className="text">Save</div>
            </div>
            <div className="action">
                <div className="icon">
                    <FiShare />
                </div>
                <div className="text">Share</div>
            </div>
        </div>
    )
}

export default ActionBar;