// import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './HomePage';
import MyFridge from './MyFridge/myfridge';
import Startup from './Startup/Startup';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={ <HomePage/> } /> */}
        {/* <Route path='/myfridge' element={ <MyFridge/> } /> */}
        <Route path='/' element={ <Startup/> } />
      </Routes>
    </Router>
  );
}

export default App;
