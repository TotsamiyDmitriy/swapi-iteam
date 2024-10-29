import { createAction, props } from "@ngrx/store";
import { Character } from "../../types/swapi.types";

const loadCharacters = createAction('Load Characters', props<{id : string | null}>())
const loadCharactersSuccess = createAction('Load Characters Success', props<{ characters : Character[]}>());
const loadCharactersFailure = createAction('Load Characters Failure', props<{ error: any }>());

const loadCharacter = createAction('Load Character', props<{id : string | null}>())
const loadCharacterSuccess = createAction('Load Character Success', props<{ character : Character }>());
const loadCharacterFailure = createAction('Load Character Failure', props<{ error: any }>());

export const CharactersActions = {
	loadCharacters,
	loadCharactersSuccess,
	loadCharactersFailure,

	loadCharacter,
	loadCharacterSuccess,
	loadCharacterFailure
}