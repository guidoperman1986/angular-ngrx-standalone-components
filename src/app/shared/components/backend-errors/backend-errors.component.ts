import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendErrors } from '../../types/backend-errors.interface';

@Component({
  selector: 'app-backend-errors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backend-errors.component.html',
  styleUrls: ['./backend-errors.component.scss']
})
export class BackendErrorsComponent implements OnInit, OnChanges {
  @Input() backendErrors: BackendErrors = {}

  errorMessages: string[] = []

  ngOnInit(): void {
    this.buildErrorMessages()
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    this.buildErrorMessages()
  }

  buildErrorMessages() {
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      const messages = this.backendErrors[name].join(' ')

      return `${name} ${messages}`
    })
  }
}
