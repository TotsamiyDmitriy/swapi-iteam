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
    const filmCharacters = state.films[filmId].characters.map((char) => char.split('/')[char.split('/').length-2])
    return state.characters?.filter((val, id) => filmCharacters.includes(val.id))
  }
  return null
})

export const selectFilmsByCharId = (id: string | null) => createSelector(selectFilmState, (state: FilmState) => {
  if (!id || !state.characters) return null;
  
  const characterFilmsIds = state.characters
    .find((char) => char.id === id)
    ?.films.map((film) => film.split('/')[film.split('/').length - 2]);

  if (!characterFilmsIds) return null;

  return characterFilmsIds.reduce<{ [key: string]: Film }>((acc, filmId) => {
    if (state.films && state.films[filmId]) {
      acc[filmId] = state.films[filmId];
    }
    return acc;
  }, {});
})

export const selectCharactersLoading = createSelector(selectFilmState, (state: FilmState) => state.loadingChar);

export const selectCharacterById =  (id: string | null) => createSelector(selectFilmState, (state: FilmState) => {
  let character : Character | null = null
  if (state.characters && id) {
    for (let char of state.characters) {
      if (char.id === id) {
        character = char
        break;
      }
    }
  }  return character})