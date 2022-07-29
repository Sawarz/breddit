import Navbar from "./components/multiple-use/navbar/Navbar";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import PostCreator from "./components/postCreator/PostCreator";
import Post from "./components/post/Post";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/post" element={<PostCreator />}></Route>
          <Route path="/posts/:postID" element={<Post />}></Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
