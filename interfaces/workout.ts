import type { Exercise } from "./exercise";

export interface WorkoutPlan {
  warmup: Exercise[];
  mainWorkout: Exercise[];
  cooldown: Exercise[];
}
