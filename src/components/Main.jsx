import React from "react";
import video from "../assets/video.mp4";
import Form from "./Form";

const Main = () => {
  return (
    <div className="main">
      <div className="overlay"></div>
      <video src={video} autoPlay loop muted />
      <div className="content">
      <h1>University Tours</h1>
        <h2>Welcome to the University Tours App</h2>
      <Form/>
      </div>
    </div>
  );
}

export default Main;
