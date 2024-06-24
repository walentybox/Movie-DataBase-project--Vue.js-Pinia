<template>
  <div class="movies-item" loading="lazy">
    <h2>{{ props.movie.title }}</h2>
    <img :src="props.movie.posterURL" :alt="props.movie.title"  />

    <div class="movies-data">
      <p v-if="props.movie.genre">
        <strong>Genre: </strong>{{ props.movie.genre }}
      </p>
    </div>

    <div class="movies-btns">
      <my-button
        v-if="JSON.parse(props.movie.isWatched) === false"
        @click="watchedMovie(props.movie.title)"
        >Watched</my-button
      >
      <my-button v-else @click="watchedMovie(props.movie.title)"
        >Unwatched</my-button
      >
      <my-button @click="deleteMovie(props.movie.title)">Delete</my-button>
    </div>
  </div>
</template>

<script setup>
  import MyButton from "@/UI/MyButton.vue";
  import { useMovieStore } from "@/stores/MovieStore";

  const store = useMovieStore();

  const props = defineProps({
    movie: Object,
    required: true,
    default: () => {},
  });

  function deleteMovie(activeTitle) {
    store.favoriteMovies.forEach((element) => {
      if (element.title == activeTitle) {
        const indx = store.favoriteMovies.indexOf(element);
        store.favoriteMovies.splice(indx, 1);
      }
    });
    localStorage.setItem(
      "favoriteMovies",
      JSON.stringify(store.favoriteMovies)
    );
    activeCard(activeTitle);
  }

  function activeCard(activeTitle) {
    store.moviesData.forEach((element) => {
      if (element.title == activeTitle) {
        console.log(element.title, element.isAdded);

        element.isAdded = !element.isAdded;
        console.log(element.title, element.isAdded);
      }
    });
  }

  function watchedMovie(watchedTitle) {
    store.favoriteMovies.forEach((element) => {
      if (element.title == watchedTitle) {
        if (element.isWatched == "true") {
          element.isWatched = "false";
        } else {
          element.isWatched = "true";
        }
      }
    });
    localStorage.setItem(
      "favoriteMovies",
      JSON.stringify(store.favoriteMovies)
    );
  }
</script>

<style lang="scss" scoped>
  .movies {
    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: rgba(0, 81, 106, 0.695);
    }
    &-btns {
      text-align: center;
      margin: 20px 10px;
    }
    &-data {
      display: flex;
      justify-content: space-between;
      p {
        padding: 10px;
      }
    }
  }
</style>
