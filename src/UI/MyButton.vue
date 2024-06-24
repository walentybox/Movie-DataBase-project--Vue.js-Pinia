<template>
  <button class="movies-btn"><slot></slot></button>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>
  .movies-btn {
    background-color: transparent;
    padding: 10px 20px;
    margin: 10px 20px;
    border-radius: 5px;
    border: 1px solid black;
    box-shadow: 3px 3px black;
    cursor: pointer;
  }
  .movies-btn:active {
    box-shadow: 0px 0px black;
    transform: translate(3px, 3px);
  }
</style>
