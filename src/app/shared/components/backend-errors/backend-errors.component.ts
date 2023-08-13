import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendErrors } from '../../types/backend-errors.interface';

@Component({
  selector: 'app-backend-errors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backend-errors.component.html',
  styleUrls: ['./backend-errors.component.scss']
})
export class BackendErrorsComponent implements OnInit {
  @Input() backendErrors: BackendErrors = {}

  errorMessages: string[] = []

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      const messages = this.backendErrors[name].join(' ')

      return `${name} ${messages}`
    })
  }
}
