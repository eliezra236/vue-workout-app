<template>
  <li>
    <el-checkbox :label="name" :checked="isCompleted" @change="changeCompleted"></el-checkbox>
    <a href="#" @click="deleteExercise">x</a>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ExerciseItem',
  props: {
    index: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    changeCompleted(cbValue) {
      this.$emit('change-status', cbValue, this.index);
    },
    deleteExercise() {
      this.$emit('delete-exercise', this.index);
    },
  },
});
</script>

<style scoped>
.el-checkbox {
  text-align: left;
  margin-right: 1rem;
}
</style>
