import React, { useState, useEffect } from "react";
//redux:
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//components:
import NavBar from "./navbar";
import GnomesList from "./gnomes_list";

//helpers:
import logic from "../logic";

//actions:
import { getAllGnomes } from "../actions/gnomes";

const HomePage = ({ gnomes, getAllGnomes }) => {
  const [username, setUsername] = useState("");
  const [ages, setAges] = useState([]);
  const [someOfAllGnomes, setSomeOfAllGnomes] = useState([]);
  const [filteredGnomes, setFilteredGnomes] = useState([]);
  const [foundNumber, setFoundNumber] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [minimumAge, setMinimumAge] = useState("");
  const [maximumAge, setMaximumAge] = useState("");
  const [filterColor, setFilterColor] = useState("");
  const [colors, setColors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllGnomes();

    const username = sessionStorage.getItem("user");
    setUsername(username);

    setAges([0, 50, 100, 150, 200, 250, 300, 350, 400]);
  }, [getAllGnomes]);

  useEffect(() => {
    try {
      //to show only the first 20:
      setSomeOfAllGnomes(gnomes.slice(0, 20));

      //to set the different hair colors:
      if (gnomes.length)
        logic
          .setColors(gnomes)
          .then(colors => setColors(colors))
          .catch(({ message }) => {
            setError(message, () => {
              setTimeout(() => {
                setError(null);
              }, 2000);
            });
          });
    } catch ({ message }) {
      setError(message, () => {
        setTimeout(() => {
          setError(null);
        }, 2000);
      });
    }
  }, [gnomes]);

  useEffect(() => {
    try {
      setFoundNumber(0);
      //to fetch the gnomes according the new filters:
      logic
        .filterQuery(
          gnomes,
          filterName,
          parseInt(minimumAge) || 0,
          parseInt(maximumAge) || 400,
          filterColor
        )
        .then(filteredGnomes => {
          const foundNumber = filteredGnomes.length || 0;
          setFoundNumber(foundNumber);
          //to show only a maximum of 20 filtered gnomes:
          const onlySome = filteredGnomes.slice(0, 20) || [];
          setFilteredGnomes(onlySome);
        })
        .catch(({ message }) => {
          setError(message, () => {
            setTimeout(() => {
              setError(null);
            }, 2000);
          });
        });
    } catch ({ message }) {
      setError(message, () => {
        setTimeout(() => {
          setError(null);
        }, 2000);
      });
    }
  }, [gnomes, filterName, minimumAge, maximumAge, filterColor]);

  return (
    <div>
      <NavBar />
      <div className="text-center home">
        <h5 className="intro__text">
          <span className="name">{username}</span>, <br />
          there are more than one thousand gnomes in this area so you can use
          the next filters to get more concrete search results:
        </h5>
        <form className="filters__form">
          <div className="row form-group form__item ">
            <label className="form-label label" htmlFor="filterName">
              Name:
            </label>
            <input
              autoFocus
              name="filterName"
              type="text"
              className="form-control"
              placeholder="Write something..."
              onChange={e => setFilterName(e.target.value)}
            />
          </div>

          <div className="row form-group form__item">
            <label className="form-label label mr" htmlFor="minimumAge">
              Minimum Age:
            </label>

            <select
              className="custom-select"
              name="minimumAge"
              onChange={e => setMinimumAge(e.target.value)}
            >
              <option>Choose an age</option>
              {ages.map((num, i) => (
                <option key={i} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="row form-group form__item">
            <label className="form-label label mr" htmlFor="maximumAge">
              Maximum age:
            </label>

            <select
              className="custom-select"
              name="maximumAge"
              onChange={e => setMaximumAge(e.target.value)}
            >
              <option>Choose an age</option>
              {ages.map((num, i) => (
                <option key={i} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="row form-group form__item">
            <label className="form-label label mr" htmlFor="filterColor">
              Hair color:
            </label>

            <select
              className="custom-select"
              name="filterColor"
              onChange={e => setFilterColor(e.target.value)}
            >
              <option value="">Choose a color</option>
              {colors
                ? colors.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))
                : null}
            </select>
          </div>
          {error && (
            <div className="text-center font-weight-bold text-danger mt-2">
              {error}
            </div>
          )}
        </form>

        {/* gnomes list: */}
        {filterName || minimumAge || maximumAge || filterColor ? (
          foundNumber ? (
            <h3 className="center-text resultsFeedback">
              Found <span className="foundNumber">{foundNumber}</span> gnomes
              matching your filters!
            </h3>
          ) : (
            <h3 className="center-text resultsFeedback">
              Any found gnome ...don't be so demanding!
              <i className="text-danger fas fa-heart-broken" />
            </h3>
          )
        ) : (
          <h3 className="center-text resultsFeedback">
            There are <span className="foundNumber">{gnomes.length}</span>{" "}
            gnomes, use the filters!
          </h3>
        )}

        <GnomesList
          filteredGnomes={filteredGnomes}
          someOfAllGnomes={someOfAllGnomes}
          filterName={filterName}
          minimumAge={minimumAge}
          maximumAge={maximumAge}
          filterColor={filterColor}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ gnomes: state.gnomes });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAllGnomes }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
