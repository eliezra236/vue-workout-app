<template>
  <div id="workout-list-div">

    <el-collapse>
      <ul class="workout-list styleless-ul">
      <workout-item
        v-for="(workout, index) in workouts"
        :key="index"
        :index="index"
        :name="workout.name"
        :exercises="workout.exercises"
        :isCompleted="workout.isCompleted"
        @new-exercise="addExercise"
        @change-exercise-status="changeExerciseStatus"
        @delete-exercise="deleteExercise"
        @delete-workout="deleteWorkout"
      />
      </ul>
    </el-collapse>
    <el-form id="new-workout-form" @submit.prevent="addWorkout" class="flex-input">
      <el-form-item>
        <el-input v-model="newWorkout" type="text" placeholder="Add Workout" />
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="addWorkout">+</el-button>
      </el-form-item>
    </el-form>

    <a href="#" id="reset-to-default-btn" @click="resetToDefault">Delete All Workouts (Reset to Default)</a>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WorkoutItem from './WorkoutItem.vue';
import IWorkoutItemProps from '@/types/IWorkoutItemProps';
import IExerciseItemProps from '@/types/IExerciseItemProps';

const LOCAL_STORAGE_KEY = 'workoutApp.workouts';

const defaultWorkouts: IWorkoutItemProps[] = [
  { name: 'Click Here For Toturial', isCompleted: false, exercises: [
    { name: '<-- Mark as Completed', isCompleted: false },
      { name: 'Delete Exercise -->', isCompleted: false },
      { name: 'Easy, right?', isCompleted: false },
      { name: 'Mark Everything as Completed', isCompleted: false },
      { name: 'You Completed The Tuturial, have fun :)', isCompleted: false }]},
];

const getInitialWorkouts = () : IWorkoutItemProps[] => {
  // checks if there is workouts saved in localstorage, returns the default values if not.
  const storedWorkouts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if (storedWorkouts) {
    return storedWorkouts;
  }
  return defaultWorkouts;
};

export default defineComponent({
  name: 'WorkoutList',
  data() {
    return {
      newWorkout: '',
      workouts: getInitialWorkouts(),
    };
  },
  watch: {
    workouts: {
      handler(newWorkouts) {
        // saves the workouts to local storage whenever there's a change
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newWorkouts));
      },
      deep: true,
    },
  },
  components: { WorkoutItem },
  methods: {
    addWorkout() {
      if (this.newWorkout === '') {
        alert("Cannot add empty workout");
        return;
      }
      const newWorkoutInstance: IWorkoutItemProps = {
        isCompleted: false, exercises: [], name: this.newWorkout,
      };
      this.workouts.push(newWorkoutInstance);
      this.newWorkout = '';
    },
    deleteWorkout(workoutIndex: number) {
      this.workouts.splice(workoutIndex, 1);
    },
    addExercise(workoutIndex: number, newExercise: IWorkoutItemProps): void {
      this.workouts[workoutIndex].exercises.push(newExercise);
    },
    changeExerciseStatus(newValue: boolean, exerciseIndex: number, workoutIndex: number): void {
      const workout: IWorkoutItemProps = this.workouts[workoutIndex];
      const exercise: IExerciseItemProps = workout.exercises[exerciseIndex];
      exercise.isCompleted = newValue;
      this.updateWorkoutStatus(workout);
    },
    deleteExercise(exerciseIndex: number, workoutIndex: number) {
      const workout: IWorkoutItemProps = this.workouts[workoutIndex];
      workout.exercises.splice(exerciseIndex, 1);
    },
    updateWorkoutStatus(workout: IWorkoutItemProps): void {
      workout.isCompleted = this.isWorkoutCompleted(workout);
    },
    isWorkoutCompleted(workout: IWorkoutItemProps): boolean {
      if (workout.exercises.length === 0) {
        return false;
      }
      for (const exercise of workout.exercises) {
        if (!exercise.isCompleted) {
          return false;
        }
      }
      return true;
    },
    resetToDefault() {
      const sure = confirm('Are you sure you want to delete all exercises? this action is irreversible');
      if (sure) {
        this.workouts = defaultWorkouts;
      }
    },
  },
});
</script>

<style scoped>

.el-input {
  width: 20rem;
}

#workout-list-div {
  width: 30rem;
  margin: auto;
}

#reset-to-default-btn {
  font-size: 0.8rem;
}
</style>

<docs>
On real app I would use Ajax to call API and get the items / edit them.
</docs>
