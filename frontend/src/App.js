// import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header/Header";
// import Footer from "./Footer/Footer";
import styled from 'styled-components';
import Main from "./main/main";
import { ToastContainer} from 'react-toastify';
import React, { useEffect } from 'react';
import { UseGeneralContext } from "./Context/generalTables";

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
  const { changeIngredientTable, ingredientTable } = UseGeneralContext();
  const { changeCategoryTable } = UseGeneralContext();
  const { changeLabelTable } = UseGeneralContext();

  useEffect(() => {
    changeIngredientTable();
    changeCategoryTable();
    changeLabelTable();
  }, []);

  return (
    <>
      <ToastContainer />
      <Wrapper id="rootMain">
        <Router>
          <Header/>
          <Routes>
            <Route path='/*' element={ <Main/> } />
          </Routes>
          {/* <Footer/> */}
        </Router>
      </ Wrapper>
    </>
  );
}

export default App;
