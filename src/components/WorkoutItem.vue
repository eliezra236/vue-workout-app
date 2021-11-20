<template>
  <el-collapse-item :title="name">
      <ExerciseItem
        v-for="(exercsie, index) in exercises"
        :key="index"
        :isCompleted="exercsie.isCompleted"
        :name="exercsie.name"/>
    <el-input v-model="newExercise" placeholder="Add Exercise" clearable />
    <el-button type="primary" @click="addExercise">+</el-button>
  </el-collapse-item>

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ExerciseItem from './ExerciseItem.vue';
import IExerciseItemProps from '@/types/IExerciseItemProps';

export default defineComponent({
  name: 'WorkoutItem',
  props: {
    name: {
      type: String,
      required: true,
    },
    exercises: {
      type: Array as PropType<IExerciseItemProps[]>,
      required: false,
      default: [],
    },
  },
  data() {
    return {
      newExercise: '',
    };
  },
  methods: {
    addExercise() {
      // const newExerciseInstance: IExerciseItemProps = { name: this.newExercise };
      // this.exercises.push(newExerciseInstance);
      console.log("here");
    },
  },
  components: {
    ExerciseItem,
  },
});
</script>

<style scoped>
.el-input {
  display: inline-block;
  width: 40%;
}
</style>
