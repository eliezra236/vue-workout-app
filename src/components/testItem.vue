<template>
  <div>
    <p id="counter-text">{{counter}}</p>
    <el-form @submit.prevent="incCounter">
      <el-form-item>
        <el-button @click="incCounter">add</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'testItem',
  data() {
    return {
      counter: 1,
    };
  },
  methods: {
    incCounter() {
      this.counter++;
    },
  },
});
</script>

<style scoped>

</style>
