import React, { Component } from "react";

//redux:
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//components:
import NavBar from "./navbar";

//actions:
import { showBackButton, hideBackButton } from "../actions/backButton";
import { fetchGnomeById } from "../actions/gnomes";

class ShowGnome extends Component {
  componentDidMount() {
    const id = parseInt(this.props.match.params.id);
    this.props.showBackButton();
    this.props.fetchGnomeById(id);
  }
  componentWillUnmount() {
    this.props.hideBackButton();
  }

  render() {
    const {
      name,
      age,
      friends,
      hair_color,
      weight,
      height,
      thumbnail,
      professions
    } = this.props.singleGnome;

    const weightTofixed = weight && parseInt(weight);
    const heightTofixed = height && parseInt(height);
    const friendsTxt =
      friends && friends.join(", ").replace(/,(?=[^,]*$)/, " and");
    const professionsTxt =
      professions && professions.join(", ").replace(/,(?=[^,]*$)/, " and");

    return (
      <div>
        <NavBar />
        <div className="card">
          <div className="card-header">
            <img src={`${thumbnail}`} alt="gnomo profile pic" />
          </div>
          <div className="card-body">
            <h1 className="card-title text-light">{name}</h1>
            <p>I am {age} years old</p>
            <p>My hair is {hair_color}</p>
            <p>
              I weight {weightTofixed} kg, and I am {heightTofixed} cm tall
            </p>
            {friends ? (
              friends.length === 1 ? (
                <p>
                  My friend is <span className="card-details">{friends}</span>
                </p>
              ) : (
                <p>
                  My friends are:{" "}
                  <span className="card-details">{friendsTxt}</span>
                </p>
              )
            ) : (
              <p>I didn't have time to make nor keep friends</p>
            )}
            {professions ? (
              professions.length === 1 ? (
                <p>
                  I work as a{" "}
                  <span className="card-details">{professions}</span>
                </p>
              ) : (
                <p>
                  I don't have much time as I work as a :{" "}
                  <span className="card-details">{professionsTxt}</span>
                </p>
              )
            ) : (
              <p>
                I have plenty of time as I don't work, so we can meet whenever
                you want
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ singleGnome: state.gnome });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { showBackButton, hideBackButton, fetchGnomeById },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowGnome);
