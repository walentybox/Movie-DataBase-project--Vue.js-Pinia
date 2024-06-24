<template>
  <header>
    <h1>My Favorite Movies</h1>
    <div class="btns-box">
      <my-button
        @click="store.activeTab('1')"
        :class="{ btns_color: store.btnState == '1' }"
        >Favorite</my-button
      >
      <my-button
        @click="store.activeTab('2')"
        :class="store.btnState == '2' ? 'btns_color' : '1'"
        >Search</my-button
      >
    </div>
    <search-box v-if="store.btnState === '2'"></search-box>
  </header>

  <main>
    <div v-if="store.btnState === '2'" class="movies-list">
      <h2>Movies List</h2>
      <div
        v-if="store.moviesData.length > 0"
        v-for="item in store.moviesData"
        :key="item.Title"
        class="movies-box"
      >
        <my-item :movie="item"></my-item>
      </div>
      <p v-else>
        Sorry, we couldn't find any results for "{{ store.searchData }}"
      </p>
    </div>

    <div v-else="store.btnState === '1'" class="movies-list">
      <h2>Movies Favorite List</h2>
      <div v-if="store.watched.length > 0">
        <h3>Watched movies: (count:{{ store.watched.length }})</h3>
        <div v-for="item in store.watched" :key="item.title" class="movies-box">
          <my-favorite :movie="item"></my-favorite>
        </div>
      </div>
      <div v-if="store.favoriteMovies.length > 0">
        <h3>All Favorite Movies (count: {{ store.favoriteMovies.length }})</h3>
        <div
          v-for="item in store.favoriteMovies"
          :key="item.Title"
          class="movies-box"
        >
          <my-favorite :movie="item"></my-favorite>
        </div>
      </div>
      <div v-else class="movies-center-box">
        <div class="movies-red">
          <p>You didn't add Favorite Movies to the list</p>
        </div>
        <my-button @click="store.activeTab('2')">Add Movies</my-button>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { useMovieStore } from "@/stores/MovieStore";
  import MyItem from "@/components/MyItem.vue";
  import MyFavorite from "@/components/MyFavoriteItem.vue";
  import SearchBox from "@/components/SearchBox.vue";
  import MyButton from "@/UI/MyButton.vue";

  const store = useMovieStore();

  store.getData();
</script>

<style lang="scss" scoped>
  .movies-box {
    padding-bottom: 30px;
  }
  .movies-red {
    text-align: center;
    line-height: 48px;
    font-size: larger;
    font-weight: bolder;
    color: red;
  }

  .btns-box {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
  }
  .btns_color {
    background-color: rgba(0, 81, 106, 0.695);
  }
  .movies-center-box {
    text-align: center;
  }
</style>
