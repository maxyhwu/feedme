// import './App.css';
import {
    Routes,
    Route,
  } from "react-router";
import HomePage from '../HomePage/HomePage';
import MyFridge from '../MyFridge/myfridge';
import Settings from '../Settings/Settings';
import { Recipe } from '../Recipe/recipe';
import LoginPage from '../Login/LoginPage';
// import SignupPage from '../Signup/SignupPage';
import RegisterPage from "../RegisterPage/RegisterPage";
import Contact from "../Contact/Contact";
import SetPassword from '../SetPassword/SetPassword';
import {RecipeDetailShare} from "../Recipe/detail";
import Recipe_search_result from '../Recipe/recipe-search-result';
import MyArchive from "../MyArchive/MyArchive";
import MyPage from '../MyPage/MyPage';
import EditProfile from "../MyPage/EditProfile";
import { useState, useEffect } from "react";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import { IntlProvider } from "react-intl";
import { UseLangContext } from "../Context/LangCnt";
import { UseDataContext } from "../Context/useUserData";
import Preference from "../Signup/PreferencePage";
import GoogleError from "../googleError/googleError";

function Main() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // you can play with this and click the user icon on the header
  const [locale, setLocale] = useState(undefined)
  const {data} = UseDataContext()
  const {lang} = UseLangContext()

  useEffect(() => {
    async function fetchLang () {
        try {
            const resp = await fetch(`./lang/${lang}.json`)
            const data = await resp.json()
            setLocale(data)
          } catch (error) {
            console.error(`Error fetching translation file for ${lang}:`, error)
          }
    }
    fetchLang()
  }, [lang])

  useEffect(() => {
    console.log(data)
    // data.then((datas)=>console.log(datas))
  }, [data])

  return (
      <IntlProvider locale="en" messages={locale}>
        <Routes>
          <Route path='/' element={ <HomePage/> } />
          <Route path='recipe' element={ <Recipe/> } />
          <Route path='myrecipe' element={ <Recipe/> } />
          <Route path='suggestrecipe' element={ <Recipe/> } />
          <Route path='login' element={ <LoginPage/> } />
          <Route path='register' element={ <RegisterPage/> } />
          <Route path='contactus' element={ 
                  <ProtectedRoutes>
                    <Contact/> 
                  </ProtectedRoutes>} />
          {/* <Route path='Signup' element={ <SignupPage/> } /> */}
          {/* <Route path = 'registerr' element = {<Register/>} /> */}
          <Route path='SetPassword' element={ <SetPassword/> } />
          <Route path="detail/:recipeID" element={ <RecipeDetailShare /> } />
          <Route path='recipe-search-result' element={ <Recipe_search_result/> } />
          <Route path='/myfridge' element={
                  <ProtectedRoutes>
                    <MyFridge/>
                  </ProtectedRoutes>} />
          <Route path='/settings' element={
                 <ProtectedRoutes>
                    <Settings/>
                  </ProtectedRoutes>} />
          <Route path='/myArchive' element={
                 <ProtectedRoutes>
                    <MyArchive/>
                  </ProtectedRoutes>} />
          <Route path='/mypage' element={
                 <ProtectedRoutes>
                    <MyPage/>
                  </ProtectedRoutes>
                  }/>
          <Route path='/edit-profile' element={
                 <ProtectedRoutes>
                    <EditProfile/>
                  </ProtectedRoutes>
                  }/>
          <Route path='/preference' element={
                 <ProtectedRoutes>
                    <Preference/>
                  </ProtectedRoutes>}/>
            <Route path='/oauth/error/*' element={<GoogleError/>}/>
            <Route path="preference" element={ <Preference/> }/>
        </Routes>
    </IntlProvider>
  );
}

export default Main;
