import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React, {useEffect,useContext} from 'react';
import PostProvider from './store/PostContext';
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import { AuthContext, FirebaseContext } from './store/Context';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
function App() {
  const {user,setUser} = useContext(AuthContext);
  const auth = getAuth()

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if (user){
        setUser(user)
      }else{
        console.log("not logged in")
      }
    })
  },[user])
  return (
    <Router>
      <PostProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/view" element={<View />} />
      </Routes>
      </PostProvider>
    </Router>
  );
}

export default App;
