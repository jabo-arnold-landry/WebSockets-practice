import { useState } from "react";

import socket from "./socketsFolder/socket";
import IdeaBox from "./IdeaBox";
import Login from "./authanticationFolder/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoute";
import PersistLogin from "./LoginPersist/PersistLogin";
import NotFound from "./NotFound";
import PostPage from "./PostPage";

function App() {
  // states initialization and declaration section
  const [toggleIdeaBox, setToggler] = useState(false);
  function toggleOnAndOffIdeaBox() {
    setToggler((currvalue) => !currvalue);
  }

  return (
    <>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/"
              element={
                <>
                  <header>
                    <h1>Title</h1>
                    <button onClick={toggleOnAndOffIdeaBox}>Add +</button>
                    {toggleIdeaBox && (
                      <div>
                        <IdeaBox kind={setToggler} />
                      </div>
                    )}
                  </header>

                  <PostPage />
                </>
              }
            />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
