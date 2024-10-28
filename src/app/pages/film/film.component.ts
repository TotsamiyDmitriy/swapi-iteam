import { Component, OnInit } from '@angular/core';
import { Film } from '../../types/swapi.types';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCharactersByFilmId, selectFilmById, selectFilmLoading } from '../../store/selectors/selectors';
import { CommonModule } from '@angular/common';
import { FilmsActions } from '../../store/actions/load-films.actions';
import { DataType, ExpansionComponent } from '../../components/expansion/expansion.component';
import { CharactersActions } from '../../store/actions/load-characters.actions';

@Component({
  selector: 'app-film',
  standalone: true,
  imports: [CommonModule, ExpansionComponent],
  templateUrl: './film.component.html',
  styleUrl: './film.component.scss'
})
export class FilmComponent implements OnInit {
  
  film$!: Observable<Film | null>
  characters$! : Observable<any>
  loading$! : Observable<boolean>

  id: string | null = null;

  constructor(private route : ActivatedRoute, private store : Store, private router : Router) {
  this.loading$ = this.store.select(selectFilmLoading)
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.store.dispatch(FilmsActions.loadFilms())
      this.store.dispatch(CharactersActions.loadCharacters({id :this.id}))
      if(this.id) {
        this.film$ = this.store.select(selectFilmById(this.id))
        this.characters$ = this.store.select(selectCharactersByFilmId(this.id)).pipe(
          )
      } else {
        this.router.navigate(['/'], {skipLocationChange : true})
      }
    });
}
}