import { mount } from '@vue/test-utils';
import ElementPlus from 'element-plus';
import WorkoutList from '@/components/WorkoutList.vue';

describe('WorkoutList.vue', () => {
  const wrapper = mount(WorkoutList, {
    global: {
      plugins: [ElementPlus],
    },
  });
  const newWorkoutExample = 'Hello New Workout';
  it('Add a New Workout', async () => {
    // Add Workout
    const newWorkoutInput = wrapper.find('#new-workout-form input');
    await newWorkoutInput.setValue(newWorkoutExample);
    await newWorkoutInput.trigger('input');
    const oldWorkoutsLength = wrapper.findAll('.workout-item').length;
    const addWorkoutForm = wrapper.find('#new-workout-form');
    await addWorkoutForm.trigger('submit');
    const newWorkoutsLength = wrapper.findAll('.workout-item').length;
    expect(newWorkoutsLength).toBe(oldWorkoutsLength + 1);
    expect(wrapper.text()).toContain(newWorkoutExample);
  });
  it('Add and Delete New Exercise', async () => {
    // Adds the exercise
    const lastWorkout = wrapper.findAll('.workout-item').at(-1);
    const firstExercisesLen = lastWorkout.findAll('li').length;
    const newExerciseTitle = 'Hello New Exercise';
    const newExerciseInput = lastWorkout.find('.new-exercise-form input');
    await newExerciseInput.setValue(newExerciseTitle);
    await newExerciseInput.trigger('input');
    await lastWorkout.find('.new-exercise-form').trigger('submit');
    let newExercisesLen = lastWorkout.findAll('li').length;
    expect(lastWorkout.text()).toContain(newExerciseTitle);
    expect(newExercisesLen).toBe(firstExercisesLen + 1);
    // Deletes It
    const lastExercise = lastWorkout.findAll('li').at(-1);
    const exerciseDelBtn = lastExercise.find('.delete-exercise-btn');
    await exerciseDelBtn.trigger('click');
    newExercisesLen = lastWorkout.findAll('li').length;
    expect(newExercisesLen).toBe(firstExercisesLen);
  });
  it('Delete a Workout', async () => {
    const allWorkouts = wrapper.findAll('.workout-item');
    const firstWorkoutsLen = allWorkouts.length;
    const lastWorkout = allWorkouts.at(-1);
    await lastWorkout.find('.delete-link').trigger('click');
    const newWorkoutsLen = wrapper.findAll('.workout-item').length;
    expect(newWorkoutsLen).toBe(firstWorkoutsLen - 1);
  });
});
