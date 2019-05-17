import React, { Component, Fragment } from "react";
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

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredGnomes: [],
      filterName: "",
      minimumAge: "",
      maximumAge: "",
      filterColor: "",
      colors: [],
      error: ""
    };
  }

  componentDidMount() {
    //we call funcs we defined as 'Actions':
    this.props.getAllGnomes();
  }

  componentDidUpdate(prevProps, prevState) {
    const { gnomes } = this.props;
    const { filterName, minimumAge, maximumAge, filterColor } = this.state;

    //set colors for select option once received props redux state.gnomes:
    if (prevProps.gnomes !== gnomes) {
      try {
        logic
          .setColors(gnomes)
          .then(res => this.setState({ ...this.state, colors: res }))
          .catch(({ message }) => {
            this.setState({ error: message }, () => {
              setTimeout(() => {
                this.setState({ error: null });
              }, 2000);
            });
          });
      } catch ({ message }) {
        this.setState({ error: message }, () => {
          setTimeout(() => {
            this.setState({ error: null });
          }, 2000);
        });
      }
    }

    if (
      prevState.filterName !== filterName ||
      prevState.minimumAge !== minimumAge ||
      prevState.maximumAge !== maximumAge ||
      prevState.filterColor !== filterColor
    ) {
      try {
        logic
          .filterQuery(
            gnomes,
            filterName,
            parseInt(minimumAge) || 0,
            parseInt(maximumAge) || 400,
            filterColor
          )
          .then(res => {
            console.log(res);
            this.setState({ ...this.state, filteredGnomes: res });
          })
          .catch(({ message }) => {
            this.setState({ error: message }, () => {
              setTimeout(() => {
                this.setState({ error: null });
              }, 2000);
            });
          });
      } catch ({ message }) {
        this.setState({ error: message }, () => {
          setTimeout(() => {
            this.setState({ error: null });
          }, 2000);
        });
      }
    }
  }

  onChange = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  render() {
    const username = sessionStorage.getItem("user");
    const { gnomes } = this.props;
    const { onChange } = this;
    const {
      filteredGnomes,
      filterName,
      minimumAge,
      maximumAge,
      filterColor,
      colors,
      error
    } = this.state;
    const someOfAllGnomes = gnomes.slice(0, 20);
    const someOfFiltered =
      (filteredGnomes.length && filteredGnomes.slice(0, 20)) || [];

    const ages = [0, 50, 100, 150, 200, 250, 300, 350, 400];

    return (
      <div className="text-light">
        <NavBar />
        <div className="mx-3">
          <h5 className="my-4">
            <span className="name">{username}</span>, <br />
            there are more than one thousand gnomes in this area so you can use
            the next filters to get more concrete search results:
          </h5>
          <form className="mx-5">
            <div className="row form-group">
              <label className="form-label label" htmlFor="filterName">
                Filter by name:
              </label>
              <input
                autoFocus
                name="filterName"
                type="text"
                className="form-control col-sm-4 mr-5"
                placeholder="Write something..."
                onChange={onChange}
              />
            </div>

            <div className="row form-group">
              <label className="form-label label mr" htmlFor="minimumAge">
                Older than:
              </label>

              <select
                className="custom-select col-sm-4"
                name="minimumAge"
                onChange={onChange}
              >
                <option>Choose an age</option>
                {ages.map((num, i) => (
                  <option key={i} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="row form-group">
              <label className="form-label label mr" htmlFor="maximumAge">
                Younger than:
              </label>

              <select
                className="custom-select col-sm-4"
                name="maximumAge"
                onChange={onChange}
              >
                <option>Choose an age</option>
                {ages.map((num, i) => (
                  <option key={i} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="row form-group">
              <label className="form-label label mr" htmlFor="filterColor">
                Filter by hair color:
              </label>

              <select
                className="custom-select col-sm-4"
                name="filterColor"
                onChange={onChange}
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
          <h2 className="center-text text-light">
            {filterName || minimumAge || maximumAge || filterColor ? (
              filteredGnomes.length ? (
                `Found ${filteredGnomes.length} gnomes matching your filters!`
              ) : (
                <Fragment>
                  {"Any found gnome ...don't be so demanding!"}{" "}
                  <i className="text-danger fas fa-heart-broken" />
                </Fragment>
              )
            ) : (
              `There are ${gnomes.length} gnomes, use the filters!`
            )}
          </h2>

          <GnomesList
            filteredGnomes={filteredGnomes}
            someOfFiltered={someOfFiltered}
            someOfAllGnomes={someOfAllGnomes}
            filterName={filterName}
            minimumAge={minimumAge}
            maximumAge={maximumAge}
            filterColor={filterColor}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ gnomes: state.gnomes });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAllGnomes }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
