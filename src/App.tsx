import { useState, useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import { HashRouter, Routes, Route } from "react-router-dom";
import PostCreator from "./components/postCreator/PostCreator";
import Post from "./components/post/Post";
import Register from "./components/auth/register/Register";
import Login from "./components/auth/login/Login";
import { onAuthStateChanged } from "firebase/auth";
import Firebase from "./firebase/Firebase";
import Board from "./components/board/Board";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userID, setUserID] = useState<string | undefined>();

  useEffect(() => {
    onAuthStateChanged(Firebase.auth, (user) => {
      if(user){
        setLoggedIn(true);
        setUserID(user?.uid);
      }
      else{
        setLoggedIn(false);
        setUserID(undefined);
      }
    });
  }, [])

  return (
    <HashRouter>
      <Navbar loggedIn={loggedIn} userID={userID}/>
      <div className="App">
        <Routes>
          <Route path="/" element={<Board loggedIn={loggedIn}/>}></Route>
          <Route path="/post" element={<PostCreator />}></Route>
          <Route path="/posts/:postID" element={<Post />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
