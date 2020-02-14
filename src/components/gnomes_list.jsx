import React from "react";
import { withRouter } from "react-router-dom";

const GnomesList = props => {
  const {
    filteredGnomes,
    someOfAllGnomes,
    filterName,
    minimumAge,
    maximumAge,
    filterColor,
    history
  } = props;

  const handleGnomeClick = id => {
    history.push(`/gnome/${id}`);
  };

  return (
    <>
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
              ? filteredGnomes.map(g => (
                  <tr
                    onClick={() => handleGnomeClick(g.id)}
                    id={g.id}
                    key={g.id}
                  >
                    <td>{g.name} </td>
                    <td>{g.age}</td>
                    <td>{g.hair_color}</td>
                    <td>{parseInt(g.weight)}</td>
                    <td>{parseInt(g.height)}</td>
                  </tr>
                ))
              : null
            : someOfAllGnomes.map(g => (
                <tr onClick={() => handleGnomeClick(g.id)} id={g.id} key={g.id}>
                  <td>{g.name} </td>
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
    </>
  );
};

export default withRouter(GnomesList);
