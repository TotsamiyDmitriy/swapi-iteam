import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FilmState } from '../../types/state.types';


export const selectFilmState = createFeatureSelector<FilmState>('film');

export const selectAllFilms = createSelector(selectFilmState, (state: FilmState) => {
  return state.films}
);

export const selectFilmById = (filmId: string | null) =>  createSelector(selectFilmState, (state: FilmState) => state.films && filmId ? state.films[filmId] : null);

export const selectFilmLoading = createSelector(selectFilmState, (state: FilmState) => state.loading);

export const selectFilmError = createSelector(selectFilmState, (state: FilmState) => state.error);

export const selectCharactersByFilmId = (filmId: string | null) => createSelector(selectFilmState, (state: FilmState) => state.characters && filmId ? state.characters[filmId] : null)

export const selectCharLoading = createSelector(selectFilmState, (state: FilmState) => state.loadingChar);