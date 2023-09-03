import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormValues } from '../../types/article-form-values.interface';
import { BackendErrors } from '../../types/backend-errors.interface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BackendErrorsComponent } from '../backend-errors/backend-errors.component';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [CommonModule, BackendErrorsComponent, ReactiveFormsModule],
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {
  @Input() initialValues?: ArticleFormValues;
  @Input() isSubmitting: boolean = false;
  @Input() errors: BackendErrors | null = null;

  @Output() articleSubmit = new EventEmitter<ArticleFormValues>();

  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    title: '',
    description: '',
    body: '',
    tagList: '',
  })

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    if (!this.initialValues) {
      throw new Error('Inputs are not completed')
    }

    this.form.patchValue({
      title: this.initialValues?.title,
      description: this.initialValues?.description,
      body: this.initialValues?.body,
      tagList: this.initialValues?.tagList.join(' '),

    })
  }

  onSubmit() {
    const formValue = this.form.getRawValue()

    const articleFormValues: ArticleFormValues = {
      ...formValue,
      tagList: formValue.tagList.split(' ')
    }

    this.articleSubmit.emit(articleFormValues)
  }
}
