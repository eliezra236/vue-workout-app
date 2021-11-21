<template>
  <div id="workout-list">
    <h3>{{ name }} Workouts</h3>
    <el-collapse>
      <workout-item
        v-for="(workout, index) in workouts"
        :key="index"
        :index="index"
        :name="workout.name"
        :exercises="workout.exercises"
        @new-exercise="addExercise"
        @change-exercise-status="changeExerciseStatus"
      />
    </el-collapse>
    <el-input v-model="newWorkout" placeholder="Add Workout" clearable />
    <el-button type="danger" @click="addWorkout">+</el-button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import WorkoutItem from './WorkoutItem.vue';
import IWorkoutItemProps from '@/types/IWorkoutItemProps';
import IExerciseItemProps from '@/types/IExerciseItemProps';

const defaultWorkouts: IWorkoutItemProps[] = [
  { exercises: [{ name: 'Lift', isCompleted: false }, { name: 'Drop', isCompleted: false }], name: 'Legs', isCompleted: false },
  { exercises: [{ name: 'Lift', isCompleted: false }, { name: 'Drop', isCompleted: false }], name: 'Chest', isCompleted: false },
];

export default defineComponent({
  name: 'WorkoutList',
  data() {
    return {
      name: 'Eli',
      newWorkout: '',
      workouts: defaultWorkouts as IWorkoutItemProps[],
    };
  },
  components: { WorkoutItem },
  methods: {
    addWorkout() {
      const newWorkoutInstance: IWorkoutItemProps = {
        isCompleted: true, exercises: [], name: this.newWorkout,
      };
      this.workouts.push(newWorkoutInstance);
    },
    addExercise(workoutIndex: number, newExercise: IWorkoutItemProps) {
      this.workouts[workoutIndex].exercises.push(newExercise);
    },
    changeExerciseStatus(newValue: boolean, exerciseIndex: number, workoutIndex: number): void {
      const workout: IWorkoutItemProps = this.workouts[workoutIndex];
      const exercise: IExerciseItemProps = workout.exercises[exerciseIndex];
      exercise.isCompleted = newValue;
      this.updateWorkoutStatus(workout);
    },
    updateWorkoutStatus(workout: IWorkoutItemProps) {
      workout.isCompleted = this.isWorkoutCompleted(workout);
    },
    isWorkoutCompleted(workout: IWorkoutItemProps): boolean {
      for (let exercise of workout.exercises) {
        if (!exercise.isCompleted) {
          return false;
        }
      }
      return true;
    },
  },
});
</script>

<style scoped>
#workout-list {
  width: 30rem;
  margin: auto;
}
</style>

<docs>
On real app I would use Ajax to call API and get the items / edit them.
</docs>
