// import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './HomePage/HomePage';
import MyFridge from './MyFridge/myfridge';
import Settings from './Settings/Settings';
import Recipe from './Recipe/recipe';
import LoginPage from './Login/LoginPage';
import SignupPage from './Signup/SignupPage';
import SetPassword from './SetPassword/SetPassword';
import Header from "./Header/Header";
import Detail from "./Recipe/detail";
import Recipe_search_result from './Recipe/recipe-search-result';
import MyArchive from "./MyArchive/MyArchive";
import styled from 'styled-components';
import MyPage from './MyPage/MyPage';
import { useState, useEffect } from "react";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import {LoginContextProvider} from './Context/LoginCnt'
import { IntlProvider } from "react-intl";
import { UseLangContext } from "./Context/LangCnt";
import { LangContextProvider } from "./Context/LangCnt";

const Wrapper = styled.div`
  position: fixed;
  width:100%;
  height:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow:scroll;
`

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // you can play with this and click the user icon on the header
  const [locale, setLocale] = useState(undefined)
  const {lang} = UseLangContext()

  useEffect(() => {
    async function fetchLang () {
        try {
            const resp = await fetch(`./lang/${lang}.json`)
            const data = await resp.json()
            console.log(data)
            setLocale(data)
          } catch (error) {
            console.error(`Error fetching translation file for ${lang}:`, error)
          }
    }
    fetchLang()
  },[lang])

  return (
    <Wrapper id="rootMain">
      <IntlProvider locale="en" messages={locale}>
      <LangContextProvider>
      <LoginContextProvider>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={ <HomePage/> } />
          <Route path='/myfridge' element={<MyFridge/>} />
          {/* <Route path='/myfridge' element={
                  <ProtectedRoutes>
                    <MyFridge/>
                  </ProtectedRoutes>} /> */}
          <Route path='/recipe' element={ <Recipe/> } />
          <Route path='/login' element={ <LoginPage/> } />
          <Route path='/Signup' element={ <SignupPage/> } />
          <Route path='/SetPassword' element={ <SetPassword/> } />
          <Route path="/modal" element={ <Detail/> }/>
          <Route path='/recipe-search-result' element={ <Recipe_search_result/> } />
          <Route path='/myfridge' element={<Settings/>} />
          {/* <Route path='/settings' element={
                 <ProtectedRoutes>
                    <Settings/>
                  </ProtectedRoutes>} /> */}
          <Route path='/myfridge' element={<MyArchive/>} />
          {/* <Route path='/myArchive' element={
                 <ProtectedRoutes>
                    <MyArchive/>
                  </ProtectedRoutes>} /> */}
          <Route path='/myfridge' element={<MyPage/>} />
          {/* <Route path='/mypage' element={
                 <ProtectedRoutes>
                    <MyPage/>
                  </ProtectedRoutes>}/> */}
        </Routes>
      </Router>
      </LoginContextProvider>
      </LangContextProvider>
      </IntlProvider>
    </ Wrapper>
  );
}

export default App;
