<template>

    <el-checkbox :label="name"></el-checkbox>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ExerciseItem',
  props: {
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
});
</script>

<style scoped>
.el-checkbox {
  text-align: left;
  display: block;
}
</style>
