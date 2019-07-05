import React, { Component } from "react";

class LandingPage extends Component {
  state = {
    username: ""
  };

  handleChange = e => {
    this.setState({ username: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    sessionStorage.clear();

    const { username } = this.state;

    if (username.trim()) {
      sessionStorage.setItem("user", username);
      this.props.history.push("/finder");
    }
  };

  render() {
    const { handleChange, handleSubmit } = this;

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
              onChange={handleChange}
            />
            <button className="btn btn-success" type="submit">
              Enter
            </button>
          </div>
        </form>
        <div class="imagesContainer">
          <img
            src="https://images.freeimages.com/images/large-previews/3d7/just-a-swingin-2-1557548.jpg"
            alt="two gnomes"
          />
          <img
            class="fadeInClass"
            src="https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/rich_media_quiz/topic/rmq_dating/getty_rf_twofinger.jpg?resize=692px:*"
            alt="fingerslove"
          />
        </div>
      </div>
    );
  }
}

export default LandingPage;
