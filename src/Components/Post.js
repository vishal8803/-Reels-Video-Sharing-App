import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { CircularProgress } from "@mui/material";
import { Avatar } from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Dialog from "@mui/material/Dialog";
import Like from "./Like";
import Video from "./Video";
import "./Post.css";
import Comment from "./Comment";
import ShowComments from "./ShowComments";

function Post({ user }) {
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    let parr = [];

    const unsub = database.posts
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        parr = [];
        snapshot.forEach((obj) => {
          let data = { ...obj.data(), postId: obj.id };
          parr.push(data);
        });
        setPosts(parr);
      });

    return () => unsub();
  }, []);

  return (
    <div className="post-body">
      {posts == null || user == null ? (
        <CircularProgress />
      ) : (
        <div className="video-container">
          {posts.map((post, index) => (
            <React.Fragment key={index}>
              <div className="videos">
                <Video src={post.pUrl} />
                <div className="fa">
                  <Avatar
                    style={{ marginRight: "1rem" }}
                    src={post.userImage}
                  />
                  <h4>{post.user}</h4>
                  <Like user={user} post={post} />
                  <ChatBubbleIcon
                    className="comment-icon"
                    onClick={() => handleClickOpen(post.pId)}
                    fontSize="large"
                  />
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
      )}
    </div>
  );
}

export default Post;
