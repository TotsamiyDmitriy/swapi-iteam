import { Actions, createEffect, ofType } from "@ngrx/effects"
import { ApiService } from "../services/api.service"
import { FilmsActions } from "./actions/load-films.actions"
import { catchError, EMPTY, map, mergeMap, of, retry, switchMap, tap, withLatestFrom } from "rxjs"
import { Injectable } from "@angular/core"
import { Store } from "@ngrx/store"
import { selectAllFilms, selectCharactersByFilmId } from "./selectors/selectors"
import { CharactersActions } from "./actions/load-characters.actions"


  @Injectable()
export class FilmEffects {
  constructor(private actions$: Actions, private api : ApiService, private store : Store) {}

  loadFilms$ = createEffect(() => 
	this.actions$.pipe(
	ofType(FilmsActions.loadFilms),
	withLatestFrom(this.store.select(selectAllFilms)),
	switchMap(([_action, filmsLoaded]) => {
		if (filmsLoaded) {
			return of(FilmsActions.loadFilmsSuccess({films : Object.values(filmsLoaded)}))
		} 
		return this.api.getFilms().pipe(
		map(data => FilmsActions.loadFilmsSuccess({films : data.results})),
		retry({count : 3, delay: 3000}),
		catchError((error) => of(FilmsActions.loadFilmsFailure({error}))
		)
		)}
	))
)

	loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharactersActions.loadCharacters),
      mergeMap(action => {
		if (action.id) {
		return this.api.getCharactersByFilmId(action.id).pipe(
          map(characters => CharactersActions.loadCharactersSuccess({ characters })),
          catchError(error => of(CharactersActions.loadCharactersFailure({ error })))
		)
		
	  } return of(CharactersActions.loadCharactersFailure({ error: '' }))}
        
        
      )
    )
  );
}
