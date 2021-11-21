import IExerciseItemProps from '@/types/IExerciseItemProps';

export default interface IWorkoutItemProps {
  index?: number,
  isCompleted: boolean,
  name: string,
  exercises: IExerciseItemProps[],
};
