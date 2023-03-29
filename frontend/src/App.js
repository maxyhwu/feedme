// import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './HomePage/HomePage';
import MyFridge from './MyFridge/myfridge';
import LoginPage from './Login/LoginPage';
import SignupPage from './Signup/SignupPage';
import SetPassword from './SetPassword/SetPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <HomePage/> } />
        <Route path='/myfridge' element={ <MyFridge/> } />
        <Route path='/login' element={ <LoginPage/> } />
        <Route path='/signup' element={ <SignupPage/> } />
        <Route path='/setpassword' element={ <SetPassword/> } />
      </Routes>
    </Router>
  );
}

export default App;
