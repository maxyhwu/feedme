import {
    Routes,
    Route,
  } from "react-router";
import NoSignup from "./page/noSignup";
import NoVerified from "./page/noVerifed";
import SomthinWrong from "./page/somethinWrong";
import HasRegistered from "./page/hasRegistered";

const GoogleError = () => {
    return (
        <div>
        <Routes>
            <Route path='something-wrong' element={<SomthinWrong/>}/>
            <Route path='no-verified' element={<NoVerified/>}/>
            <Route path='no-signup' element={<NoSignup/>}/>
            <Route path='has-registed' element={<HasRegistered/>}/>
        </Routes>
        </div>
    )
}

export default GoogleError