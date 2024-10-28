import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from "@angular/material/button"
import { FilmsActions } from '../../store/actions/load-films.actions';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {map, Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card'
import { Store } from '@ngrx/store';
import { selectAllFilms, selectFilmError, selectFilmLoading } from '../../store/selectors/selectors';
import { RouterModule } from '@angular/router';
import { DataType, ExpansionComponent } from '../../components/expansion/expansion.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, ExpansionComponent, CommonModule, MatCardModule, RouterModule, MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  films$!: Observable<DataType | null>;
  loading$! : Observable<boolean>;
  error$!: Observable<any>

  constructor(private store : Store) {
    this.films$ = this.store.select(selectAllFilms).pipe(
      map((films) => {
        let acc : DataType | null = null
        if(films) {
        Object.keys(films)
        .map((id) => {
          const film = films[id]
          acc = {...acc}
          acc[id] = {
            title : film.title,
            desc: `Directed by: ${film.director}`,
            expantionInfo: film.opening_crawl,
            routerLink : ['film', ''+ film.episode_id],
            actionTitle : 'Release'
          }
        })} 
        return acc
      }));
    this.loading$ = this.store.select(selectFilmLoading).pipe(tap((d) => console.log(d)));
    this.error$ = this.store.select(selectFilmError).pipe(tap((d) => console.log(d)))
  }

 ngOnInit(): void {
  this.store.dispatch(FilmsActions.loadFilms()); 
 }





}
