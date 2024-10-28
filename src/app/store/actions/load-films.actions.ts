import { createAction, props } from '@ngrx/store';
import { Film } from '../../types/swapi.types';

const loadFilms = createAction('Load Films');
const loadFilmsSuccess = createAction('Load Films Success', props<{ films: Film[] }>());
const loadFilmsFailure = createAction('Load Films Failure', props<{ error: any }>());

const loadFilm = createAction('Load Film', props<{id : string | null}>())
const loadFilmSuccess = createAction('Load Film Success', props<{ film: Film}>());
const loadFilmFailure = createAction('Load Film Failure', props<{ error: any }>());
export const FilmsActions = {
	loadFilms,
	loadFilmsSuccess,
	loadFilmsFailure,

	loadFilm,
	loadFilmSuccess,
	loadFilmFailure
}