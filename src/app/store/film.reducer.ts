import { createReducer, on } from '@ngrx/store';
import {FilmsActions} from './actions/load-films.actions';
import { FilmState } from '../types/state.types';
import { CharactersActions } from './actions/load-characters.actions';

export const initialState:FilmState = {
	  films: null,
  	characters: null,
  	loading: false,
    loadingChar : false,
  	error: null,
	};

export const filmReducer = createReducer(
  initialState,
  on(FilmsActions.loadFilms, (state) => ({...state, loading: true})),
  on(FilmsActions.loadFilmsSuccess, (state, payload) => {
    const filmsMap = payload.films.reduce((acc, film) => ({ ...acc, [film.episode_id]: film }), {});
    return { ...state, films: { ...state.films, ...filmsMap }, loading: false };
  }),
  on(FilmsActions.loadFilmsFailure, (state, payload) => ({ ...state, loading: false, error : payload.error }))
,
  on(FilmsActions.loadFilm, (state) => ({...state, loading: true})),
  on(FilmsActions.loadFilmSuccess, (state, payload) => {
    const stateFilms = {...state.films }
    stateFilms[payload.film.episode_id] = payload.film;
    return { ...state, films: { ...stateFilms }, loading: false };
  }),

  on(CharactersActions.loadCharacters, (state) => ({ ...state, loadingChar: true })),
  on(CharactersActions.loadCharactersSuccess, (state, payload) => ( { ...state, loadingChar: false, characters: state.characters ?  [...state.characters, ...payload.characters] : [...payload.characters] })),
  on(CharactersActions.loadCharactersFailure, (state, payload) => ({ ...state, loadingChar: false, error : payload.error })),


  on(CharactersActions.loadCharacter, (state) => ({ ...state, loadingChar: true })),
  on(CharactersActions.loadCharacterSuccess, (state, payload) => {
    if (state.characters?.find((char) => char.id === payload.character.id)) return {...state, loadingChar: false}
    return { ...state, loadingChar: false, characters: state.characters ? [...state.characters, payload.character] :  [payload.character] }
  }),
  on(CharactersActions.loadCharacterFailure, (state, payload) => ({ ...state, loadingChar: false, error : payload.error })),

);