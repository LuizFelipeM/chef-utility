import { BehaviorSubject } from "rxjs";
import { RecipeWithInformation } from "./types/Recipe";

let recipeState: RecipeWithInformation = undefined
export const state = new BehaviorSubject({ recipe: recipeState })