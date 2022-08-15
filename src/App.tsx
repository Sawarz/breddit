import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import NotFound from "./components/multiple-use/notFound/NotFound";
import PostCreator from "./components/postCreator/PostCreator";
import PostEdit from "./components/postEdit/PostEdit";
import Post from "./components/post/Post";
import Register from "./components/auth/register/Register";
import Login from "./components/auth/login/Login";
import FirebaseCore from "./firebase/FirebaseCore";
import Board from "./components/board/Board";
import Community from "./components/community/Community";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userID, setUserID] = useState<string | undefined>();

  useEffect(() => {
    onAuthStateChanged(FirebaseCore.auth, (user) => {
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
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Board loggedIn={loggedIn}/>}></Route>
          <Route path="/post" element={<PostCreator />}></Route>
          <Route path="/posts/:postID" element={<Post />}></Route>
          <Route path="/posts/:postID/edit" element={<PostEdit />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/:communityID" element={<Community loggedIn={loggedIn}/>}></Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
