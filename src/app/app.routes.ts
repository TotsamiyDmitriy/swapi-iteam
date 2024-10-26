import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CharacterComponent } from './pages/character/character.component';
import { FilmComponent } from './pages/film/film.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
	{title : 'Home Page', path:'', pathMatch:'full', component: HomeComponent},
	{title : 'Film Information', path:'film/:id', pathMatch:'prefix', component: FilmComponent},
	{title : 'Character Information', path:'character/:id', pathMatch:'prefix', component: CharacterComponent},
	{title: 'Not Found', path:'**', component: NotFoundComponent}
];
