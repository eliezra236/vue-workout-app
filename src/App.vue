<template>
  <h1>Welcome to Vue Workout App!</h1>
<!--  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
  <WorkoutList/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WorkoutList from './components/WorkoutList.vue';

export default defineComponent({
  name: 'App',
  components: {
    WorkoutList,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
