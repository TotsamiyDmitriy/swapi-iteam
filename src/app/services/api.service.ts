import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Character, Film, GetData } from '../types/swapi.types';
import { State, Store } from '@ngrx/store';
import { catchError, count, EMPTY, forkJoin, map, Observable, of, retry, switchMap, throwError } from 'rxjs';
import { selectFilmById } from '../store/selectors/selectors';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://swapi.dev/api'
  constructor(private http : HttpClient, private store : Store) {
  }

  cache$! : Observable<any>

  getFilms() {
    return this.http.get<GetData<Film[]>>(`${this.apiUrl}/films`)
  }

  getFilmById(id : string) {
    return this.http.get<Film>(`${this.apiUrl}/films/${id}`)
  }

  getCharactersByFilmId(id :string) {
   return this.store.select(selectFilmById(id)).pipe(map((film) => film ? film.characters : null),
  switchMap((char) => {
    if (char) {
      return forkJoin(char?.map(url => this.http.get<Character>(url).pipe(retry({count: 3, delay:3000}),catchError((err) => {
        return throwError(() => err)
      })
    )
  ))
    }
    return EMPTY
  }))
}
}
