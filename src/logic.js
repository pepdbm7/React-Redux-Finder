let countFilters = 0;

const logic = {
  //promise with Promise.then.catch
  filterQuery(allGnomes, filterName, minimumAge, maximumAge, filterColor) {
    return Promise.resolve()
      .then(() => {
        if (typeof allGnomes !== "object")
          throw TypeError("allGnomes is not a array");
        if (typeof filterName !== "string")
          throw TypeError("filterName is not a string");
        if (typeof minimumAge !== "number")
          throw TypeError("minimumAge is not a number");
        if (typeof maximumAge !== "number")
          throw TypeError("maximumAge is not a number");
        if (typeof filterColor !== "string")
          throw TypeError("filterColor is not a string");
        if (minimumAge > maximumAge)
          throw new Error("Maximum age should be greater than minimum age");

        let filteredByName = [];
        let filteredByColor = [];
        let filteredMinimumAge = [];
        let filteredMaximumAge = [];

        if (filterName) {
          filteredByName = allGnomes.filter(gnome =>
            gnome.name.includes(filterName)
          );
          countFilters++;
        }
        if (filterColor) {
          filteredByColor = allGnomes.filter(
            gnome => gnome.hair_color === filterColor
          );
          countFilters++;
        }

        if (minimumAge && minimumAge !== 0) {
          filteredMaximumAge = allGnomes.filter(
            gnome => gnome.age > minimumAge
          );
          countFilters++;
        }

        if (maximumAge && maximumAge !== 400) {
          filteredMinimumAge = allGnomes.filter(
            gnome => gnome.age < maximumAge
          );
          countFilters++;
        }

        const result = [
          ...filteredByName,
          ...filteredByColor,
          ...filteredMinimumAge,
          ...filteredMaximumAge
        ];

        return { result, countFilters };
      })
      .then(res => {
        //count repeated times each gnome, and only return the ones found by every used filter

        countFilters = 0;

        const findRepeated = res.result.reduce((a, b) => {
          let i = a.findIndex(x => x.id === b.id);
          return i === -1 ? a.push({ ...b, reps: 1 }) : a[i].reps++, a;
        }, []);

        //now we only take the ones repeated as many times as filters have been used:
        const filterByReps = findRepeated.filter(
          g => g.reps === res.countFilters
        );

        //avoid repeated items:
        const onlyOnce = [...new Set(filterByReps)];

        return onlyOnce;
      });
  },

  //promise with ASYNC / AWAIT:
  async setColors(gnomes) {
    if (typeof gnomes !== "object") throw TypeError("gnomes is not a array");

    let colors = [];

    await gnomes.forEach(g => colors.push(g.hair_color));

    const uniqueColors = await [...new Set(colors)];

    if (uniqueColors.length === 5) throw Error("There are not 5 colors");

    return uniqueColors;
  }
};

export default logic;

// module.exports = logic;
