import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Film } from '../../types/swapi.types';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatAccordion,
    MatExpansionModule
    ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input('film') film!: Film


}
