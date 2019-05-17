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
      <div className="text-light text-center landing-bg">
        <h1 className="py-5">Welcome to Gnome Finder</h1>
        <p className="py-4">
          This app is private, so in order to access and to use the app you just
          should provide your username:
        </p>
        <form className="col-md-4 mx-auto" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="text-light mr-2" htmlFor="username">
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
      </div>
    );
  }
}

export default LandingPage;
