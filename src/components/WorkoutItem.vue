<template>
  <el-collapse-item :title="name">
      <ExerciseItem
        v-for="(exercsie, index) in exercises"
        :key="index"
        :index="index"
        :isCompleted="exercsie.isCompleted"
        :name="exercsie.name"
        @change-status="changeExerciseStatus"
      />
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
    index: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    exercises: {
      type: Array as PropType<IExerciseItemProps[]>,
      required: false,
      default: [] as IExerciseItemProps[],
    },
  },
  data() {
    return {
      newExercise: '',
    };
  },
  methods: {
    addExercise() {
      const newExerciseInstance: IExerciseItemProps = {
        name: this.newExercise,
        isCompleted: false,
      };
      this.$emit('new-exercise', this.index, newExerciseInstance);
    },
    changeExerciseStatus(newValue, exerciseIndex) {
      // emit new event that includes the workout index, to be updated on the main list.
      this.$emit('change-exercise-status', newValue, exerciseIndex, this.index);
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
