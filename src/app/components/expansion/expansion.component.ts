import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

interface ExpansionData {
  title : string,
  desc : string,
  expantionInfo : string,
  routerLink : [string, string],
  actionTitle: string
}

export type DataType = {
  [x: string] : ExpansionData
}

@Component({
  selector: 'app-expansion',
  standalone: true,
  imports: [MatAccordion, MatExpansionModule, MatButtonModule, RouterModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './expansion.component.html',
  styleUrl: './expansion.component.scss',
  
})
export class ExpansionComponent {
  @Input('data') data$!: Observable<DataType | null>
  @Input('loading') loading$!: Observable<boolean>
  @Input('error') error$!: Observable<any>
  constructor() {}
}
