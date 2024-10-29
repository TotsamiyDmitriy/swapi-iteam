import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { Character, Film } from '../../types/swapi.types';
import { Store } from '@ngrx/store';
import { selectCharacterById, selectCharactersLoading, selectFilmError, selectFilmsByCharId } from '../../store/selectors/selectors';
import { ActivatedRoute } from '@angular/router';
import { CharactersActions } from '../../store/actions/load-characters.actions';
import { DataType, ExpansionComponent } from '../../components/expansion/expansion.component';
import { CommonModule } from '@angular/common';
import { FilmsActions } from '../../store/actions/load-films.actions';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [ExpansionComponent,CommonModule,],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent implements OnInit {
  films$!: Observable<DataType | null>
  character$! : Observable<Character | null>
  loading$! : Observable<boolean>
  error$! : Observable<any>

  id: string | null = null;

  constructor(private store : Store, private route : ActivatedRoute) {
    this.loading$ = this.store.select(selectCharactersLoading);
    this.error$ = this.store.select(selectFilmError);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.store.dispatch(CharactersActions.loadCharacter({id: this.id}))
      this.store.dispatch(FilmsActions.loadFilms())
    });
    if (this.id) {
      this.character$ = this.store.select(selectCharacterById(this.id)).pipe(
        tap((char) => {
        this.films$ = this.store.select(selectFilmsByCharId(this.id)).pipe(
          map((films) => {
            if (!films) return null;
            return Object.values(films).reduce<DataType>((acc, film, index) => {
              acc[index] = {
                title: film.title,
                desc: `Directed by: ${film.director}`,
                expantionInfo: film.opening_crawl,
                routerLink: ['/film', ''+film.episode_id],
                actionTitle: 'Resolve',
              };
              return acc;
            }, {});
          })
        )
      }))
    
    }
  }}
