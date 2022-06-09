import { Login, Home, Private, Post, SinglePost, Update } from "./components";
import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route exact element={<Private />}>
          <Route exact path="/" element={<Home />} />
          <Route path="post" element={<Post />} />
          <Route path="posts/:user/:blog/" element={<SinglePost />} />
          <Route path="posts/:user/:blog/update" element={<Update />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
