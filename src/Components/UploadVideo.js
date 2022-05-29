import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import MovieIcon from "@mui/icons-material/Movie";
import LinearProgress from "@mui/material/LinearProgress";
import { database, storage } from "../firebase";
import { v4 as uuidv4 } from "uuid";

function UploadVideo(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorState, setErrorState] = useState("error");

  //   console.log(props.user);

  const handleUploadVideo = (file) => {
    if (file == null) {
      setError("Please Upload the video");
      setErrorState("error");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    if (file.size / (1024 * 1024) > 100) {
      setError("Video Size should be less than 100 MB");
      setErrorState("error");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    setLoading(true);
    let uuid = uuidv4();
    const uploadTask = storage.ref(`/posts/${uuid}/${file.name}`).put(file);

    uploadTask.on("state_changed", fn1, fn2, fn3);

    function fn1(snapshot) {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`File uploding... ${progress}% done`);
    }

    function fn2(err) {
      console.log(err);
    }

    function fn3() {
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        let obj = {
          likes: [],
          comments: [],
          pId: uuid,
          pUrl: url,
          user: props.user.fullName,
          userImage: props.user.profileImageURL,
          userId: props.user.userId,
          createdAt: database.getTimeStamp(),
        };
        // console.log(url)
        // console.log(obj);

        database.posts.add(obj).then(async (ref) => {
          let res = database.users
            .doc(props.user.userId)
            .update({
              postIds:
                props.user.postIds != null
                  ? [...props.user.postIds, ref.id]
                  : [ref.id],
            })
            .then(() => {
              setError("Posted Successfully");
              setErrorState("success");
              setTimeout(() => {
                setError("");
              }, 2000);
              setLoading(false);
            })
            .catch((e) => {
              setError(e);
              setErrorState("error");
              setTimeout(() => {
                setError("");
              }, 2000);
              setLoading(false);
            });
        });
      });
    }
  };

  return (
    <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      {error != "" ? (
        <Alert severity={errorState}>{error}!</Alert>
      ) : (
        <>
          <input
            type="file"
            accept="video/*"
            id="video-input"
            style={{ display: "none" }}
            onChange={(e) => handleUploadVideo(e.target.files[0])}
            disabled={loading}
          />
          <label htmlFor="video-input">
            <Button
              component="span"
              color="secondary"
              variant="outlined"
              startIcon={<MovieIcon />}
              disabled={loading}
            >
              Upload Video
            </Button>
          </label>
          {loading && (
            <LinearProgress color="secondary" style={{ marginTop: "3%" }} />
          )}
        </>
      )}
    </div>
  );
}

export default UploadVideo;
