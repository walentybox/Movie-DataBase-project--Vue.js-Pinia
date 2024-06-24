<template>
  <div class="search-box">
    <form class="search-form" @submit.self.prevent="store.searchFilter(store.searchData)">
      <input
        type="text"
        v-model="store.searchData"
        placeholder="search ..."
        class="search-input"
      />
    </form>
    <div class="search-btns">
      <h2>Movies Genre</h2>
      <my-button
        v-for="item of store.genre"
        @click="store.getData(item)"
        :class="{ btns_color: item == store.activeGenre }"
        >{{ item }}</my-button
      >
    </div>
  </div>
</template>

<script setup>
  import { useMovieStore } from "@/stores/MovieStore";
  import MyButton from "@/UI/MyButton.vue";

  const store = useMovieStore();
</script>

<style lang="scss" scoped>
  .search-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
  }

  .search-form {
    width: 100%;
  }
  input {
    display: block;
    margin: 0 auto;
    width: 90%;
    border-radius: 5px;
    padding: 5px;
    border: 1px solid gray;
    &:focus {
      border: none;
    }
  }
  .btns_color {
    background-color: rgba(0, 81, 106, 0.695);
  }
  .search-btns {
    padding: 15px auto;
  }
</style>
