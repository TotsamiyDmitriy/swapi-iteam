import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FilmState } from '../../types/state.types';


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

export const selectCharactersLoading = createSelector(selectFilmState, (state: FilmState) => state.loadingChar);