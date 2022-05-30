import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { database } from "../firebase";
import UploadVideo from "./UploadVideo";
import Post from "./Post";
import NavBar from "./NavBar";

function Feed() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState();

  useEffect(() => {
    let unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setUserData(snapshot.data());
    });
    return () => {
      unsub();
    };
  }, [user]);

  return (
    <div>
      {userData ? (
        <>
          <NavBar user={userData} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {/* <h1>Welcome to feed</h1> */}
            {/* <button onClick={logout}>Logout</button> */}

            <UploadVideo user={userData} />
            <Post user={userData} />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Feed;
