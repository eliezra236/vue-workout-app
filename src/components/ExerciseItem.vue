<template>
    <el-checkbox :label="name" :checked="isCompleted" @change="changeCompleted"></el-checkbox>
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
  },
});
</script>

<style scoped>
.el-checkbox {
  text-align: left;
  display: block;
}
</style>
