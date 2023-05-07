import './MyArchive.css';

import { UseDataContext } from "../Context/useUserData"

const MyArchive = () => {
    const { data } = UseDataContext();
    const favList = data.favorite;

    return (
        <div className="favRecipeList">
            {
                (favList.length === 0)
                ? <h3 id="nothingText">Nothing here.<br/> Go find some nice recipes.</h3> 
                : favList.map((e) => {return (
                    <p>{e}</p>
                )})
            }
        </div>
    )
}

export default MyArchive;