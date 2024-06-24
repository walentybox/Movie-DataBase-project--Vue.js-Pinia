import { defineStore } from "pinia";
import { ref } from "vue";

export const useMovieStore = defineStore("movieStore", {
  state: () => {
    return {
      btnState: ref("2"),
      moviesData: ref([]),
      activeGenre: ref(""),
      favoriteMovies: ref([]),
      activeMovies: ref([]),
      searchData: ref(""),
      genre: [
        "animation",
        "classic",
        "comedy",
        "drama",
        "horror",
        "family",
        "mystery",
        "western",
      ],
    };
  },

  getters: {
    watched(state) {
      return state.favoriteMovies.filter(
        (el) => JSON.parse(el.isWatched) === false
      );
    },
    watchedCount() {
      return this.watched.length;
    },
  },

  actions: {
    async getData(genre) {
      const baseURL = `https://api.sampleapis.com/movies/`;

      if (!localStorage.getItem("activeGenre")) {
        this.activeGenre = "animation";
      } else if (!genre) {
        this.activeGenre = JSON.parse(localStorage.getItem("activeGenre"));
      } else {
        this.activeGenre = genre;
      }
      localStorage.setItem("activeGenre", JSON.stringify(this.activeGenre));

      await fetch(`${baseURL + this.activeGenre}`)
        .then((resp) => resp.json())
        .then(
          (data) =>
            (this.moviesData = data.map((el) => ({
              ...el,
              isWatched: "true",
              isAdded: false,
              genre: this.activeGenre,
            })))
        );
      this.loadFavorite();
    },

    loadFavorite() {
      this.favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies"));
    },

    activeTab(id) {
      this.btnState = id;
    },

    async searchFilter(input) {
      await this.getData();
      this.moviesData = this.moviesData.filter(
        (item) => item.title.toLowerCase().indexOf(input) !== -1
      );
    },
  },
});
