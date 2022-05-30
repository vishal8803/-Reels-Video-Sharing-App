import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { CircularProgress } from "@mui/material";
import { Avatar } from "@mui/material";

function ShowComments({ postData }) {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    async function fecthData() {
      let arr = [];
      for (let i = 0; i < postData.comments.length; i++) {
        let data = await database.comments.doc(postData.comments[i]).get();
        arr.push(data.data());
      }
      setComments(arr);
    }
    fecthData();
  }, [postData]);

  return (
    <div style={{ margin: "5px" }}>
      {comments == null ? (
        <CircularProgress />
      ) : (
        <>
          {comments.map((comment, index) => (
            <div style={{ display: "flex" }} key={index}>
              <Avatar src={comment.profileImage} />
              <p>
                &nbsp;&nbsp;
                <span style={{ fontWeight: "bold" }}>{comment.user}</span>
                &nbsp;&nbsp; {comment.comment}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default ShowComments;
