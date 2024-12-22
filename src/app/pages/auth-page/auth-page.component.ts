import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AddCategoryComponent } from 'src/app/components/modal-dialog/add-category/add-category.component';
import { ICategory } from 'src/app/model/category';
import { FilterCategoryPipe } from 'src/app/pipes/filter-category.pipe';
import { CategoryService } from 'src/app/services/category.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {
  // loginForm: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // this.loginForm = this.fb.group({
    //   username: ['',],
    //   password: ['', [Validators.required, Validators.minLength(6)]]
    // });
  }

    form = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })

  submit() {
      if (this.form.valid) {
        this.loading = true;
        this.errorMessage = '';
  
        const {login, password} = this.form.value;
  
        this.authService.login(login!, password!).subscribe({
          next: () => {
            this.router.navigate(['/'], { relativeTo: this.route })
              .then(() => console.log('Navigation successful', this.route))
              .catch(err => console.error('Navigation failed:', err));
          },
          error: (error) => {
            this.errorMessage = error.error.message || 'Произошла ошибка при входе';
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          }
        });
      } else {
        this.form.markAllAsTouched();
      }
  }
}
