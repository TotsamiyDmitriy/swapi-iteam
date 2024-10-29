import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Film } from '../../types/swapi.types';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCharactersByFilmId, selectCharactersLoading, selectFilmById, selectFilmError, selectFilmLoading } from '../../store/selectors/selectors';
import { CommonModule } from '@angular/common';
import { FilmsActions } from '../../store/actions/load-films.actions';
import { DataType, ExpansionComponent } from '../../components/expansion/expansion.component';
import { CharactersActions } from '../../store/actions/load-characters.actions';

@Component({
  selector: 'app-film',
  standalone: true,
  imports: [CommonModule, ExpansionComponent],
  templateUrl: './film.component.html',
  styleUrl: './film.component.scss',
  changeDetection : ChangeDetectionStrategy.OnPush,
})
export class FilmComponent implements OnInit {
  
  film$!: Observable<Film | null>
  characters$! : Observable<DataType | null>
  loading$! : Observable<boolean>
  error$! : Observable<any>

  id: string | null = null;

  constructor(private route : ActivatedRoute, private store : Store, private router : Router) {
  this.loading$ = this.store.select(selectCharactersLoading);
  this.error$ = this.store.select(selectFilmError);
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.store.dispatch(FilmsActions.loadFilms())
      if(this.id) {
        this.film$ = this.store.select(selectFilmById(this.id))
        this.film$.pipe(tap((film) =>{

          (film)
           if (film) {
            this.store.dispatch(CharactersActions.loadCharacters({id :this.id}))
          this.characters$ = this.store.select(selectCharactersByFilmId(this.id)).pipe(map((chars) => {
            let acc : DataType | null = null
            chars?.map((char) => {
              acc = {...acc}
              acc[char.id] = {
                title : char.name,
                desc : '',
                expantionInfo : `Hairs : ${char.hair_color}, Eyes : ${char.eye_color}`,
                routerLink: ['/character', char.id],
                actionTitle : 'Resolve'
              }
            })
            return acc
          })
        )
           }
          }
        )).subscribe()
      } else {
        this.router.navigate(['/'], {skipLocationChange : true})
      }
    });
}
}