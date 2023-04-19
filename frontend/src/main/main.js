// import './App.css';
import {
    Routes,
    Route,
  } from "react-router";
import HomePage from '../HomePage/HomePage';
import MyFridge from '../MyFridge/myfridge';
import Settings from '../Settings/Settings';
import Recipe from '../Recipe/recipe';
import LoginPage from '../Login/LoginPage';
import SignupPage from '../Signup/SignupPage';
import SetPassword from '../SetPassword/SetPassword';
import Detail from "../Recipe/detail";
import Recipe_search_result from '../Recipe/recipe-search-result';
import MyArchive from "../MyArchive/MyArchive";
import MyPage from '../MyPage/MyPage';
import { useState, useEffect } from "react";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import { IntlProvider } from "react-intl";
import { UseLangContext } from "../Context/LangCnt";
import Preference from "../Signup/PreferencePage";

function Main() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // you can play with this and click the user icon on the header
  const [locale, setLocale] = useState(undefined)
  const {lang} = UseLangContext()

  useEffect(() => {
    async function fetchLang () {
        try {
            console.log(lang)
            const resp = await fetch(`./lang/${lang}.json`)
            const data = await resp.json()
            console.log(data)
            setLocale(data)
          } catch (error) {
            console.error(`Error fetching translation file for ${lang}:`, error)
          }
    }
    fetchLang()
  }, [lang])

  return (
      <IntlProvider locale="en" messages={locale}>
        <Routes>
          <Route path='/' element={ <HomePage/> } />
          <Route path='recipe' element={ <Recipe/> } />
          <Route path='login' element={ <LoginPage/> } />
          <Route path='Signup' element={ <SignupPage/> } />
          <Route path='SetPassword' element={ <SetPassword/> } />
          <Route path="modal" element={ <Detail/> }/>
          <Route path='recipe-search-result' element={ <Recipe_search_result/> } />
          {/* <Route path='/myfridge' element={
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
                  </ProtectedRoutes>}/> */}
            <Route path='myfridge' element={<MyFridge/>} />
            <Route path='settings' element={<Settings/>} />
            <Route path='myArchive' element={<MyArchive/>} />
            <Route path='mypage' element={<MyPage/>} />
            <Route path="preference" element={ <Preference/> }/>
        </Routes>
    </IntlProvider>
  );
}

export default Main;
