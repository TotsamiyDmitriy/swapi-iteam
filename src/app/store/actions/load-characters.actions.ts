import { createAction, props } from "@ngrx/store";
import { Character } from "../../types/swapi.types";

const loadCharacters = createAction('Load Characters', props<{id : string | null}>())
const loadCharactersSuccess = createAction('Load Characters Success', props<{ characters : any}>());
const loadCharactersFailure = createAction('Load Characters Failure', props<{ error: any }>());
export const CharactersActions = {
	loadCharacters,
	loadCharactersSuccess,
	loadCharactersFailure
}