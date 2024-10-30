import { Actions, createEffect, ofType } from "@ngrx/effects"
import { ApiService } from "../services/api.service"
import { FilmsActions } from "./actions/load-films.actions"
import { catchError, concatMap, count, delay, EMPTY, map, mergeMap, of, retry, switchMap, take, withLatestFrom } from "rxjs"
import { Injectable } from "@angular/core"
import { select, Store } from "@ngrx/store"
import { selectAllFilms, selectCharacterById, selectCharactersByFilmId, selectFilmById } from "./selectors/selectors"
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

loadCharactersByFilm$ = createEffect(() =>
	this.actions$.pipe(
	  ofType(CharactersActions.loadCharacters),
	  mergeMap(action =>
		this.store.select(selectCharactersByFilmId(action.id)).pipe(
		  take(1),
		  switchMap(cachedCharacters => {
			return this.store.select(selectFilmById(action.id)).pipe(
			  take(1),
			  switchMap(film => {
				if (!film) {
				  return of(CharactersActions.loadCharactersFailure({ error: '' }));
				}
				const characterIds = film.characters.map(url => {
				  const splited = url.split('/');
				  return splited[splited.length - 2];
				});
				const cachedIds = cachedCharacters?.map(char => char.id) || [];
                const missingCharacterIds = characterIds.filter(id => !cachedIds.includes(id));
				if (missingCharacterIds.length === 0 && cachedCharacters) {
					return of(CharactersActions.loadCharactersSuccess({ characters: [] }));
				  }

				return this.api.getCharactersByIds(missingCharacterIds).pipe(
				  map(characters => {
					characters = characters.map((char : any) => {
						const splited = char.url.split('/')
						return {...char, id : splited[splited.length - 2]}
					})
					return CharactersActions.loadCharactersSuccess({ characters })
				}),
				  retry({count: 3, delay:3000}),
				  catchError(error => of(CharactersActions.loadCharactersFailure({ error })))
				);
			  })
			);
		  })
		)
	  )
	)
  );

  loadCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharactersActions.loadCharacter),
      concatMap((action) =>
        this.store.select(selectCharacterById(action.id)).pipe(
			take(1),
          map((cachedCharacter) => ({ action, cachedCharacter }))
        )
      ),
      mergeMap(({ action, cachedCharacter }) => {
        if (cachedCharacter) {
          return of(CharactersActions.loadCharacterSuccess({ character: cachedCharacter }));
        }
          if (action.id) {
          return this.api.getCharactersByIds([action.id]).pipe(
            map((character) => {
				character[0].id = action.id ? action.id : ''
				return CharactersActions.loadCharacterSuccess({ character : character[0] })}),
            retry({count: 3, delay : 3000}),
			catchError((error) => of(CharactersActions.loadCharacterFailure({ error })))
          );
        }
		return of(CharactersActions.loadCharacterFailure({error : ''}))
      })
    )
  );
}
