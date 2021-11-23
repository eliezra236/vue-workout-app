<template>
  <li>
    <el-checkbox :label="name" :checked="isCompleted" @change="changeCompleted"></el-checkbox>
    <el-button class="delete-exercise-btn" type="danger" size="mini"
               :icon="Delete" @click="deleteExercise" circle></el-button>
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
<script setup lang="ts">
import { Delete } from '@element-plus/icons';

</script>

<style scoped>
.delete-exercise-btn {
}
.el-checkbox {
  text-align: left;
  margin-right: 1rem;
}
</style>
