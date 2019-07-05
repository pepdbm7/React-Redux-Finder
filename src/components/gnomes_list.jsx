import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

class GnomesList extends Component {
  state = {};

  handleGnomeClick = id => {
    this.props.history.push(`/gnome/${id}`);
  };

  render() {
    const {
      filteredGnomes,
      someOfFiltered,
      someOfAllGnomes,
      filterName,
      minimumAge,
      maximumAge,
      filterColor
    } = this.props;

    return (
      <Fragment>
        <table className="table table-hover">
          <thead className="table-header text-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Hair Color</th>
              <th scope="col">Weight</th>
              <th scope="col">Height</th>
            </tr>
          </thead>

          <tbody>
            {filterName || minimumAge || maximumAge || filterColor
              ? filteredGnomes.length
                ? someOfFiltered.map(g => (
                    <tr
                      onClick={() => this.handleGnomeClick(g.id)}
                      id={g.id}
                      key={g.id}
                    >
                      <th scope="row">{g.name} </th>
                      <td>{g.age}</td>
                      <td>{g.hair_color}</td>
                      <td>{parseInt(g.weight)}</td>
                      <td>{parseInt(g.height)}</td>
                    </tr>
                  ))
                : null
              : someOfAllGnomes.map(g => (
                  <tr
                    onClick={() => this.handleGnomeClick(g.id)}
                    id={g.id}
                    key={g.id}
                  >
                    <th scope="row">{g.name} </th>
                    <td>{g.age}</td>
                    <td>{g.hair_color}</td>
                    <td>{parseInt(g.weight)}</td>
                    <td>{parseInt(g.height)}</td>
                  </tr>
                ))}
          </tbody>
        </table>
        {((filterName || minimumAge || maximumAge || filterColor) &&
          !filteredGnomes.length) ||
        (filteredGnomes.length && filteredGnomes.length <= 20) ? null : (
          <p className="text-center my-4 text-info">... ETC</p>
        )}
      </Fragment>
    );
  }
}

export default withRouter(GnomesList);
