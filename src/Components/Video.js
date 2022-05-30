import React from "react";
import "./Video.css";
import ReactDOM from "react-dom";

function Video({ src }) {
  const handleClick = (e) => {
    e.preventDefault();
    e.target.muted = !e.target.muted;
  };

  const handleScroll = (e) => {
    let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
    if (next) {
      next.scrollIntoView();
      e.target.muted = true;
    }
  };

  return (
    <video
      src={src}
      onEnded={handleScroll}
      className="videos-styling"
      muted="muted"
      onTouchStart={handleClick}
      onClick={handleClick}
    />
  );
}

export default Video;
