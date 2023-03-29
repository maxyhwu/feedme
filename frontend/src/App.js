// import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './HomePage/HomePage';
import MyFridge from './MyFridge/myfridge';
import Recipe from './Recipe/recipe';
import LoginPage from './Login/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <HomePage/> } />
        <Route path='/myfridge' element={ <MyFridge/> } />
        <Route path='/recipe' element={ <Recipe/> } />
        <Route path='/login' element={ <LoginPage/> } />
      </Routes>
    </Router>
  );
}

export default App;
