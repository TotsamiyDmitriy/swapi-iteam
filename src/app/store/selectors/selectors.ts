import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FilmState } from '../../types/state.types';
import { Character, Film } from '../../types/swapi.types';


export const selectFilmState = createFeatureSelector<FilmState>('film');

export const selectAllFilms = createSelector(selectFilmState, (state: FilmState) => {
  return state.films}
);

export const selectFilmById = (filmId: string | null) =>  createSelector(selectFilmState, (state: FilmState) => state.films && filmId ? state.films[filmId] : null);

export const selectFilmLoading = createSelector(selectFilmState, (state: FilmState) => state.loading);

export const selectFilmError = createSelector(selectFilmState, (state: FilmState) => state.error);

export const selectCharactersByFilmId = (filmId: string | null) => createSelector(selectFilmState, (state: FilmState) => { 
  if (filmId && state.films) {
    if (!state.films[filmId]) return undefined
    const filmCharacters = state.films[filmId].characters.map((char) => char.split('/')[char.split('/').length-2])
    return state.characters?.filter((val, id) => filmCharacters.includes(val.id))
  }
  return null
})

export const selectFilmsByCharId = (id: string | null) => createSelector(selectFilmState, (state: FilmState) => {
  if (!id || !state.characters) return null;
  const characterFilmsIds = state.characters
    .find((char) => char.id === id)?.films.map(
      (film) => film.split('/')[film.split('/').length - 2]);

  const films = characterFilmsIds?.reduce<{ [key: string]: Film }>((acc, filmId) => {
    if (state.films && state.films[filmId]) {
      acc[filmId] = state.films[filmId];
    }
    return acc;
  }, {});
  return films && Object.keys(films).length > 0 ? films : null;
})

export const selectCharactersLoading = createSelector(selectFilmState, (state: FilmState) => state.loadingChar);

export const selectCharacterById =  (id: string | null) => createSelector(selectFilmState, (state: FilmState) => {

    const character = state.characters?.find((char) => char.id === id)
    return character ? character : null})