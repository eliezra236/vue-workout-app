import IExerciseItemProps from "@/types/IExerciseItemProps";

export default interface IWorkoutItemProps {
  name: string,
  exercises?: IExerciseItemProps[],
};
