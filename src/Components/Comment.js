import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { database } from "../firebase";

function Comment({ userData, postData }) {
  const [likes, setLikes] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    setLikes(postData.likes.length);
  }, []);

  const handlePostComment = () => {
    let obj = {
      comment: text,
      user: userData.fullName,
      profileImage: userData.profileImageURL,
    };

    database.comments.add(obj).then((doc) => {
      database.posts.doc(postData.postId).update({
        comments: [...postData.comments, doc.id],
      });
    });
    setText("");
  };

  return (
    <div style={{ padding: "0.5rem" }}>
      {likes !== 0 && <Typography>Liked by {likes} users</Typography>}
      <div style={{ display: "flex", marginTop: "0.5rem" }}>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          size="small"
          id="name"
          label="Write Comment here"
          type="name"
          variant="outlined"
        />
        <Button
          onClick={() => handlePostComment()}
          style={{ marginLeft: "1rem" }}
          variant="contained"
        >
          Post
        </Button>
      </div>
    </div>
  );
}

export default Comment;
