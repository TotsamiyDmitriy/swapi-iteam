import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character, Film, GetData } from '../types/swapi.types';
import { catchError, forkJoin, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://swapi.dev/api'
  constructor(private http : HttpClient) {
  }

  cache$! : Observable<any>

  getFilms() {
    return this.http.get<GetData<Film[]>>(`${this.apiUrl}/films`)
  }

  getFilmById(id : string) {
    return this.http.get<Film>(`${this.apiUrl}/films/${id}`)
  }

  getCharactersByIds(ids :string[]) {
   return forkJoin(ids.map((id) =>this.http.get<Character>(`${this.apiUrl}/people/${id}`))).pipe(catchError((err) => throwError(() => err)))
}
}