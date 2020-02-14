const axios = require("axios");
const expect = require("chai").expect;
const logic = require("./logic");

describe("logic", () => {
  let URL = "",
    allGnomes = [];

  beforeEach(() => {
    URL =
      "https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json";

    allGnomes = axios.get(URL).then(response => response.data.Brastlewark);
  });

  describe("get different data by adding filters", () => {
    it("should return data filtered by name", () => {
      logic
        .filterQuery(allGnomes, "a", 0, 400, "")
        .then(res => {
          expect(res).to.be.an("array").that.is.not.empty;
          expect(res).to.have.lengthOf(845);
          expect(res[0].name).to.be.a("string");
          expect(res[0].name).to.equal("Malbin Chromerocket");
          expect(res[0].age).to.equal(166);
        })
        .catch(err => err.message);
    });

    it("should return data filtered by name and haircolor", () => {
      logic
        .filterQuery(allGnomes, "a", 0, 400, "Pink")
        .then(filteredGnomes => {
          expect(filteredGnomes).to.be.an("array").that.is.not.empty;
          expect(filteredGnomes).to.have.lengthOf(179);
          expect(filteredGnomes[0].name).to.be.a("string");
          expect(filteredGnomes[0].name).to.equal("Malbert Quicklauncher");
          expect(filteredGnomes[0].age).to.equal(169);
        })
        .catch(err => err.message);
    });

    it("should return filtered data by name, minimumAge and hairColor", () => {
      axios
        .get(URL)
        .then(res => {
          const allGnomes = res.data.Brastlewark;
          logic.filterQuery(allGnomes, "a", 250, 400, "Pink");
        })
        .then(filteredGnomes => {
          expect(filteredGnomes).to.be.an("array").that.is.not.empty;
          expect(filteredGnomes).to.have.lengthOf(66);
          expect(filteredGnomes[0].name).to.be.a("string");
          expect(filteredGnomes[0].name).to.equal("Whitwright Magnaspackle");
          expect(filteredGnomes[0].age).to.equal(376);
        })
        .catch(err => err.message);
    });

    it("should return filtered data by name, minimumAge, maximumAge and hairColor", () => {
      logic
        .filterQuery(allGnomes, "a", 250, 300, "Pink")
        .then(filteredGnomes => {
          expect(filteredGnomes).to.be.an("array").that.is.not.empty;
          expect(filteredGnomes).to.have.lengthOf(25);
          expect(filteredGnomes[0].name).to.be.a("string");
          expect(filteredGnomes[0].name).to.equal("Kinthony Voidblade");
          expect(filteredGnomes[0].age).to.equal(251);
        })
        .catch(err => err.message);
    });

    it("should return empty array when no matching results found", () => {
      logic
        .filterQuery(allGnomes, "a", 0, 400, "")
        .then(filteredGnomes => {
          expect(filteredGnomes).to.be.an("array").that.is.empty;
        })
        .catch(err => err.message);
    });

    it("should throw error with gnomes as undefined", () => {
      logic
        .filterQuery(undefined, "a", 250, 300, "Pink")
        .catch(e => expect(e.message).to.be("allGnomes is not a array"));
    });

    it("should throw error with undefined as a name", () => {
      logic
        .filterQuery(allGnomes, undefined, 250, 300, "Pink")
        .catch(e => expect(e.message).to.be("filterName is not a string"));
    });

    it("should throw error with undefined as a minimum age", () => {
      logic
        .filterQuery(allGnomes, "a", undefined, 300, "Pink")
        .catch(e => expect(e.message).to.be("minimumAge is not a number"));
    });

    it("should throw error with undefined as a maximum age", () => {
      logic
        .filterQuery(allGnomes, "a", 250, undefined, "Pink")
        .catch(e => expect(e.message).to.be("maximumAge is not a number"));
    });

    it("should throw error with undefined as a hair color", () => {
      logic
        .filterQuery(allGnomes, "a", 250, 300, undefined)
        .catch(e => expect(e.message).to.be("filterColor is not a string"));
    });
  });

  describe("getting the 5 possible hair color a gnome can have", () => {
    it("should return a list of 5 colors", () => {
      logic
        .setColors(allGnomes)
        .then(res => {
          expect(res).to.be.an("array").that.is.not.empty;
          expect(res).to.have.lengthOf(5);
          expect(res[0]).to.be.a("string");
          expect(res[0]).to.equal("Pink");
        })
        .catch(e => e.message);
    });

    it("should throw error with a string as an argument", () => {
      logic
        .setColors("hello!")
        .catch(e => expect(e.message).to.be("gnomes is not a array"));
    });

    it("should throw error if argument is an empty array", () => {
      logic
        .setColors([])
        .catch(e => expect(e.message).to.be("No gnomes to set colors from"));
    });

    it("should throw error if returns empty array", () => {
      logic
        .setColors(allGnomes[0])
        .catch(e => expect(e.message).to.be("There are not 5 colors"));
    });
  });
});
