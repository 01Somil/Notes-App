import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Alert from './components/Alert';
import Contact from './components/Contact';
import SideBar from './components/SideBar';
import Navbar from './components/Navbar';
import UserState from './context/users/UserState';

function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  return (
    <>
      <UserState>
        <NoteState>
          <BrowserRouter>
            <Navbar/>
            <SideBar>
            <Alert alert={alert}/>
            <div className='container'>
              <Routes>
                <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>
                <Route exact path="/about" element={<About />}></Route>
                <Route exact path="/contact" element={<Contact />}></Route>
                <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
                <Route exact path="/signup" element={<Signup showAlert={showAlert} />}></Route>
              </Routes>
            </div>
            </SideBar>
          </BrowserRouter>
        </NoteState>
      </UserState>
    </>
  );
}

export default App;
