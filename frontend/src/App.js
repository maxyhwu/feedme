// import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import styled from 'styled-components';
import {LoginContextProvider} from './Context/LoginCnt'
import { LangContextProvider } from "./Context/LangCnt";
import Main from "./main/main";

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

  return (
    <LangContextProvider>
      <LoginContextProvider>
        <Wrapper id="rootMain">
          <Router>
            <Header/>
            <Routes>
              <Route path='/*' element={ <Main/> } />
            </Routes>
            {/* <Footer/> */}
          </Router>
        </ Wrapper>
      </LoginContextProvider>
      </LangContextProvider>
  );
}

export default App;
