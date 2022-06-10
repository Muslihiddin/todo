<script>
import ToDo from "./components/ToDo.vue";
export default {
  components: { ToDo },
  name: "App",
};
</script>

<template>
  <to-do />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  font-family: sans-serif;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  padding-bottom: 30px;
}
</style>
