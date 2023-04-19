import "./PreferencePage.css";

const Preference = () => {

    const categories = ['Chinese', 'Japanese', 'American', 'French', 'Korean', 'Italian', 'Thai', 'Vietnam', 'Taiwanese']

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
                                <input type="checkbox" id={i} name="check"/>
                                <label for={i}>{ category }</label>
                            </div>
                        </div>
                        )})
                    }
                </div>
                <div className="prefer-bottom">
                    <div className="confirm">
                        <button className="confirm-btn">Confirm</button>
                    </div>
                    <div className="skip">
                        <div className="skip-txt">
                            Skip
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preference;