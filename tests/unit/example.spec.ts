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
  it('Adds a new workout', async () => {
    const msg = 'hello world';
    const wrapper = mount(WorkoutList, {
      global: {
        plugins: [ElementPlus],
      },
    });
    const newWorkoutInput = wrapper.find('#new-workout-form input');
    await newWorkoutInput.setValue(msg);
    // @ts-ignore
    const inputElem: HTMLInputElement = newWorkoutInput.element;
    await newWorkoutInput.trigger('input');
    expect(inputElem.value).toMatch(msg);
    const oldLength = wrapper.findAll('.workout-item').length;
    const addWorkoutForm = wrapper.get('#new-workout-form');
    await addWorkoutForm.trigger('submit');
    const newLength = wrapper.findAll('.workout-item').length;
    expect(newLength).toBe(oldLength + 1);
    expect(wrapper.text()).toContain(msg);
  });
});
