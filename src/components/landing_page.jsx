import React, { useState } from "react";

const LandingPage = ({ history }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    sessionStorage.clear();

    if (username.trim()) {
      sessionStorage.setItem("user", username);
      history.push("/finder");
    }
  };

  return (
    <div className="landing text-center">
      <h1 className="py-5 landing-title">Welcome to Gnome Finder</h1>
      <p className="py-4">
        This app is private, so in order to use it you should provide a
        username:
      </p>
      <form className="col-md-4 mx-auto form-landing" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="mr-3" htmlFor="username">
            Username:
          </label>
          <input
            id="username"
            type="text"
            className="mr-2"
            placeholder="Write here..."
            onChange={e => setUsername(e.target.value)}
          />
          <button className="btn btn-success" type="submit">
            Enter
          </button>
        </div>
      </form>
      <div className="imagesContainer">
        <img
          src="https://images.freeimages.com/images/large-previews/3d7/just-a-swingin-2-1557548.jpg"
          alt="two gnomes"
        />
        <img
          className="fadeInClass"
          src="https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/rich_media_quiz/topic/rmq_dating/getty_rf_twofinger.jpg?resize=692px:*"
          alt="fingerslove"
        />
      </div>
    </div>
  );
};

export default LandingPage;
