import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase";
import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Like from "./Like";
import "./Post.css";
import Comment from "./Comment";
import ShowComments from "./ShowComments";
import NavBar from "./NavBar";
import "./Profile.css";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    async function fecthData() {
      database.users.doc(id).onSnapshot((snap) => {
        setUser(snap.data());
      });
    }
    fecthData();
  }, [id]);

  useEffect(() => {
    if (user != null && user.postIds != null) {
      async function fecthData() {
        let parr = [];
        for (let i = 0; i < user.postIds.length; i++) {
          let res = await database.posts.doc(user.postIds[i]).get();
          parr.push({ ...res.data(), postId: res.id });
        }
        setPosts(parr);
      }
      fecthData();
    }
  });

  console.log(user)
  console.log(posts)

  return (
    <div>
      {user && posts ? (
        <div>
          <NavBar user={user} />
          <div className="spacer"></div>
          <div className="container">
            <div className="upper-part">
              <div className="profile-img">
                <img src={user.profileImageURL} alt="user_image" />
              </div>
              <div className="info">
                <Typography variant="h6">Name : {user.fullName}</Typography>
                <Typography variant="h6">
                  Posts : {user.postIds.length}
                </Typography>
              </div>
            </div>
            <hr style={{ marginTop: "3rem", marginBottom: "3rem" }} />
            <div className="profile-videos">
              {posts.map((post, index) => (
                <React.Fragment key={index}>
                  <div className="videos">
                    <video onClick={() => handleClickOpen(post.pId)}>
                      <source src={post.pUrl}></source>
                    </video>
                    <div className="fa">
                      <Dialog
                        open={open === post.pId}
                        maxWidth="lg"
                        onClose={handleClose}
                      >
                        <div className="dialog-box">
                          <div className="video-box">
                            <video autoPlay muted controls loop="infinte">
                              <source src={post.pUrl}></source>
                            </video>
                          </div>
                          <div className="comment-box">
                            <div className="show-comments-box">
                              <ShowComments postData={post} />
                            </div>
                            <div className="post-comments-box">
                              <Like user={user} post={post} />
                              <Comment userData={user} postData={post} />
                            </div>
                          </div>
                        </div>
                      </Dialog>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {
              user ?<>
              
          <NavBar user={user} />
          <div className="spacer"></div>
          <div className="container">
            <div className="upper-part">
              <div className="profile-img">
                <img src={user.profileImageURL} alt="user_image" />
              </div>
              <div className="info">
                <Typography variant="h6">Name : {user.fullName}</Typography>
                <Typography variant="h6">
                  Posts : {user.postIds ? user.postIds.length : 0}
                </Typography>
              </div>
            </div>
            <hr style={{ marginTop: "3rem", marginBottom: "3rem" }} />
              </div>
              </> :  <CircularProgress />
          }
         
        </>
      )}
    </div>
  );
}

export default Profile;
