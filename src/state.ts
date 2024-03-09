import { BehaviorSubject } from "rxjs";
import { RecipeWithInformation } from "./types/Recipe";
import initalState from './stateTest.json';

let recipeState: RecipeWithInformation = initalState as any
export const state = new BehaviorSubject({ recipe: recipeState })