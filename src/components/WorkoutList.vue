<template>
  <div id="workout-list">
    <h3>{{ name }} Workouts</h3>
    <el-collapse>
      <workout-item
        v-for="(workout, index) in workouts"
        :key="index"
        :name="workout.name"
        :exercises="workout.exercises"
      />
    </el-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import WorkoutItem from './WorkoutItem.vue';
import IWorkoutItemProps from '@/types/IWorkoutItemProps';

const defaultWorkouts: IWorkoutItemProps[] = [
  { exercises: [{ name: 'Lift' }, { name: 'Drop' }], name: 'Legs' },
  { exercises: [{ name: 'Lift' }, { name: 'Drop' }], name: 'Chest' },
];

export default defineComponent({
  name: 'WorkoutList',
  components: { WorkoutItem },
  props: {
    workouts: {
      type: Array as PropType<IWorkoutItemProps[]>,
      default: defaultWorkouts,
    },
  },
  data() {
    return {
      name: 'Eli',
    };
  },
});
</script>

<style scoped>
.el-collapse {
  width: 30rem;
  margin: auto;
}
</style>
