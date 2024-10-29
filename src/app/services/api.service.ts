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

  getCharactersByIds(ids :string[]) {
   return forkJoin(ids.map((id) =>this.http.get<Character>(`${this.apiUrl}/people/${id}`))).pipe(map(() => ),catchError((err) => throwError(() => err)))
}
}