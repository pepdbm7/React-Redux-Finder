const axios = require("axios");
const expect = require("chai").expect;
const logic = require("./logic");

describe("logic", () => {
  describe("get different data by adding filters", () => {
    const URL =
      "https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json";

    it("should return data filtered by name", () => {
      axios.get(URL).then(res => {
        const allGnomes = res.data.Brastlewark;
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
    });

    it("should return data filtered by name and haircolor", () => {
      axios.get(URL).then(res => {
        const allGnomes = res.data.Brastlewark;
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
      axios.get(URL).then(res => {
        const allGnomes = res.data.Brastlewark;
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
    });

    it("should return empty array when no matching results found", () => {
      axios.get(URL).then(res => {
        const allGnomes = res.data.Brastlewark;
        logic
          .filterQuery(allGnomes, "a", 0, 400, "")
          .then(filteredGnomes => {
            expect(filteredGnomes).to.be.an("array").that.is.empty;
          })
          .catch(err => err.message);
      });
    });

    // it("should throw error with gnomes as undefined", () => {
    //   expect(() =>
    //     logic
    //       .filterQuery(undefined, "a", 250, 300, "Pink")
    //   ).to.throw(TypeError, "gnomes is not a array");
    // });

    // it("should throw error with undefined as a name", () => {
    //   expect(() =>
    //     logic.filterQuery(allGnomes, undefined, 250, 300, "Pink")
    //   ).to.throw(TypeError, "allGnomes is not a array");
    // });

    // it("should throw error with undefined as a minimum age", () => {
    //   expect(() =>
    //     logic.filterQuery(allGnomes, "a", undefined, 300, "Pink")
    //   ).to.throw(TypeError, "gnomes is not a array");
    // });

    // it("should throw error with undefined as a maximum age", () => {
    //   expect(() =>
    //     logic.filterQuery(allGnomes, "a", 250, undefined, "Pink")
    //   ).to.throw(TypeError, "gnomes is not a array");
    // });

    // it("should throw error with undefined as a hair color", () => {
    //   expect(() =>
    //     logic.filterQuery(allGnomes, "a", 250, 300, undefined)
    //   ).to.throw(TypeError, "gnomes is not a array");
    // });
  });

  describe("should get the 5 possible hair color a gnome can have", () => {
    const URL =
      "https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json";

    it("should return a list of 5 colors", () => {
      axios.get(URL).then(res => {
        const allGnomes = res.data.Brastlewark;
        logic.setColors(allGnomes).then(res => {
          expect(res).to.be.an("array").that.is.not.empty;
          expect(res).to.have.lengthOf(5);
          expect(res[0]).to.be.a("string");
          expect(res[0]).to.equal("Pink");
        });
      });
    });

    // it("should throw error with a string as a argument", () => {
    //   expect(() => logic.setColors("hello!")).to.throw(
    //     TypeError,
    //     "gnomes is not a array"
    //   );
    // });

    it("should throw error if returns empty array", () => {
      axios.get(URL).then(res => {
        expect(() => {
          axios
            .get(URL)
            .then(res => {
              const allGnomes = res.data.Brastlewark;
              const someGnomes = allGnomes.slice(0, 3);
              logic.setColors(someGnomes);
            })
            .to.throw(Error, "There are not 5 colors");
        });
      });
    });
  });
});
