import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/auth/store/auth.reducer';
import { combineLatest } from 'rxjs';
import { RouterLink } from '@angular/router';
import { authActions } from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  
  store = inject(Store);
  
  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser)
    
  })

  ngOnInit(): void {
    this.data$.subscribe(({currentUser})=>{
      if (currentUser === undefined) {
        this.store.dispatch(authActions.getCurrentUser())
      }

    })
  }
}
