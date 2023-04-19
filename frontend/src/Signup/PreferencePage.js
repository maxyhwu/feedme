import "./PreferencePage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Preference = () => {

    const categories = ['Chinese', 'Japanese', 'American', 'French', 'Korean', 'Italian', 'Thai', 'Vietnam', 'Taiwanese']

    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
    }

    const [checked, setChecked] = useState(0);
    const [uponLimit, setUponLimit] = useState(false);

    const handleChecked = (e) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setChecked(checked + 1);
        } else {
            setChecked(checked - 1);
        }
    }

    useEffect(() => {
        function checkedLimit() {
            if (checked > 3) {
                setUponLimit(true);
            } else {
                setUponLimit(false);
            }
        }
        checkedLimit();
    }, [checked])

    return(
        <div className="prefer-container">
            <div className="prefer">
                <div className="prefer-top">
                    <div className="prefer-title">
                        Which categories do you prefer ?
                    </div>
                    <div className="prefer-subtitle">
                        Choose at most three categories that you are interested in, and these options will response on your recommended recipes.
                    </div>
                </div>
                <div className="genre-container">
                    {
                        categories.map((category, i) => {
                        return (<div className="genre" key={i}>
                            <div className="checkbox">
                                <input type="checkbox" id={i} name="check" onChange={handleChecked}/>
                                <label for={i}>{ category }</label>
                            </div>
                        </div>
                        )})
                    }
                </div>
                <div className="prefer-bottom">
                    <div className="error-hint" style={ uponLimit? { display: "flex"}:{ display: "none" }}>
                        3 categories limited !
                    </div>
                    <div className="confirm">
                        <button className="confirm-btn" 
                            style={ uponLimit? { opacity:0.5 }:{} } 
                            disabled={ uponLimit? true:false }
                            onClick={() => {
                                navigateToHome();
                                alert('Success!')
                            }}>
                            Confirm
                        </button>
                    </div>
                    <div className="skip">
                        <div className="skip-txt" onClick={() => navigateToHome()}>
                            Skip
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preference;