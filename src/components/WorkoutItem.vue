<template>
  <li>
  <el-collapse-item class="workout-item">
    <template #title>
      <div :class="[{completed: isCompleted}]">
        {{ name }}
      </div>
    </template>
    <ul class="exercise-list styleless-ul">
      <ExerciseItem
        v-for="(exercsie, index) in exercises"
        :key="index"
        :index="index"
        :isCompleted="exercsie.isCompleted"
        :name="exercsie.name"
        @change-status="changeExerciseStatus"
        @delete-exercise="deleteExercise"
      />
    </ul>
    <el-form @submit.prevent="addExercise" class="flex-input">
      <el-form-item>
        <el-input v-model="newExercise" placeholder="Add Exercise" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addExercise">+</el-button>
      </el-form-item>
    </el-form>
    <a class="delete-link" href="#" @click="deleteWorkout">delete workout</a>
  </el-collapse-item>
  </li>

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
    isCompleted: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      newExercise: '',
    };
  },
  methods: {
    addExercise() {
      if (this.newExercise === '') {
        alert('Cannot add empty exercise');
        return;
      }
      const newExerciseInstance: IExerciseItemProps = {
        name: this.newExercise,
        isCompleted: false,
      };
      this.$emit('new-exercise', this.index, newExerciseInstance);
      this.newExercise = '';
    },
    changeExerciseStatus(newValue, exerciseIndex) {
      // emit new event that includes the workout index, to be updated on the main list.
      this.$emit('change-exercise-status', newValue, exerciseIndex, this.index);
    },
    deleteExercise(exerciseIndex: number) {
      this.$emit('delete-exercise', exerciseIndex, this.index);
    },
    deleteWorkout() {
      this.$emit('delete-workout', this.index);
      console.log('here');
    },
  },
  components: {
    ExerciseItem,
  },
});
</script>

<style scoped>
.el-input {
  width: 20rem;
}

.completed {
  text-decoration: line-through;
}
.workout-item {
  text-align: left;
}

.delete-link {
  color: red;
  display: inline-block;
  text-align: left !important;
  width: initial;
}
</style>
