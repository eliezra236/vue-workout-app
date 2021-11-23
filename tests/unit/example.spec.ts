import {mount, shallowMount} from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';
import testItem from "@/components/testItem.vue";
import ElementPlus from "element-plus";
import WorkoutList from "@/components/WorkoutList.vue";

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

describe('testItem.vue', () => {
  it('try to test form submit', async() => {
    const wrapper = mount(testItem, {
      global: {
        plugins: [ElementPlus],
      },
    });
    const counterVal = wrapper.find('#counter-text').text();
    expect(counterVal).toEqual("1");
    const testForm = await wrapper.find('.el-form');
    await testForm.trigger('submit');
    // const submitBtn = await wrapper.find('button');
    // await submitBtn.trigger('click');
    const newVal = wrapper.find('#counter-text').text();
    expect(newVal).toEqual("2");
  });
});

describe('WorkoutList.vue', () => {
  const wrapper = mount(WorkoutList, {
    global: {
      plugins: [ElementPlus],
    },
  });
  const newWorkoutExample = 'Hello New Workout';
  it('Adds new workout', async () => {

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
  it('Try To Add New Exercise', async() => {
    const allWorkouts = wrapper.findAll('.workout-item');
    const lastWorkout = allWorkouts.at(-1);
    const oldExercisesLen = lastWorkout.findAll('li').length;
    const newExerciseTitle = 'Hello New Exercise';
    const newExerciseInput = lastWorkout.find('.new-exercise-form input');
    await newExerciseInput.setValue(newExerciseTitle);
    await newExerciseInput.trigger('input');
    await lastWorkout.find('.new-exercise-form').trigger('submit');
    const newExercisesLen = lastWorkout.findAll('li').length;
    expect(lastWorkout.text()).toContain(newExerciseTitle);
    expect(newExercisesLen).toBe(oldExercisesLen + 1);
  })
});
