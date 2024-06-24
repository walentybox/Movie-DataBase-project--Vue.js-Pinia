<template>
  <div class="movies-item" >
    <h2>{{ props.movie.title }}</h2>
    <img
      :src="props.movie.posterURL"
      :alt="props.movie.title"
      loading="lazy"
      @error="$event.target.parentElement.parentElement.style.display = 'none'"
    />
    <div class="movies-data">
      <p v-if="props.movie.genre">
        <strong>Genre: </strong>{{ props.movie.genre }}
      </p>
    </div>
    <div class="movies-btns">
      <my-button
        @click="addMovieFavorite(props.movie.title)"
        :disabled="checkAdd(props.movie)"
        >Add
      </my-button>
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

  function addMovieFavorite(title) {
    store.moviesData.forEach((element) => {
      if (element.title == title) {
        if (!store.favoriteMovies.includes(element)) {
          store.favoriteMovies.push(element);
          store.activeMovies.push(element.title);
        }
        element.isAdded = !element.isAdded;
      }
    });
    localStorage.setItem(
      "favoriteMovies",
      JSON.stringify(store.favoriteMovies)
    );
  }

  function checkAdd(item) {
    let boolean = null;
    store.activeMovies.forEach((el) => {
      if (el == item.title) {
        console.log(item.isAdded);
        boolean = item.isAdded;
      }
    });
    return boolean;
  }
</script>

<style lang="scss" scoped>
  h2 {
    text-decoration: underline;
    margin: 20px 0;
  }
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
