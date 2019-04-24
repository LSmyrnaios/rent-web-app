import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../shared/services/authentication.service';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {LoginForm} from '../../../shared/models/payload/login-form';
import * as moment from 'moment';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-connect-form',
  templateUrl: './connect-form.component.html',
  styleUrls: ['./connect-form.component.scss']
})
export class ConnectFormComponent implements OnInit, OnDestroy {
  @ViewChild('loginFormEmail') loginFormEmail: ElementRef;
  loginProgress = false;
  registerProgress = false;
  loginForm: FormGroup;
  registerForm: FormGroup;
  routeSub: Subscription;
  returnUrl: string;

  constructor(
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private rfb: FormBuilder,
    private lfb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.loginForm = this.lfb.group(
      {
        l_email: ['', [Validators.required, Validators.email]],
        l_password: ['', [Validators.required, Validators.minLength(6)]],
        l_remember: [false]
      }
    );
    this.registerForm = this.rfb.group(
      {
        r_username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
        r_email: ['', [Validators.required, Validators.email]],
        r_passwordGroup: this.rfb.group({
            r_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
            r_confirmPassword: ['', Validators.required],
          }, {
            validator: (group: FormGroup) => {
              const pass = group.controls.r_password.value;
              const confirmPassword = group.controls.r_confirmPassword.value;
              if (pass === confirmPassword) {
                return null;
              } else {
                return {notSame: true};
              }
            }
          }
        ),
        r_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        r_surname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        r_remember: [false]
      }
    );
  }

  ngOnInit() {
    console.log('connect form ng on init');
    this.routeSub = this.route.queryParams
      .subscribe((params: any) => {
        this.returnUrl = params.returnUrl;
      });
  }

  signIn($event: MouseEvent) {
    const container = document.getElementById('container');
    container.classList.remove('right-panel-active');
  }

  signUp($event: MouseEvent) {
    const container = document.getElementById('container');
    container.classList.add('right-panel-active');
  }

  onLoginSubmit(data: LoginForm) {
    this.loginForm.markAsPristine();
    this.loginProgress = true;
    this.auth.login(data)
      .pipe(first())
      .subscribe((response: any) => {
          console.log('response', response);
          this.loginProgress = false;
          this.registerForm.reset();
          document.getElementById('connectModal').click();
          if (this.returnUrl) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.router.navigate(['/']);
          }
        },
        error => {
          console.error(error);
          this.loginProgress = false;
          this.loginForm.get('email').setValue('');
          this.loginForm.get('password').setValue('');
          this.loginFormEmail.nativeElement.focus();
        });
  }

  onRegisterSubmit(data: any) {
    console.log(data);
    this.registerForm.markAsPristine();
    this.registerProgress = true;
    this.auth.register({
      username: data.r_username,
      email: data.r_email,
      password: data.r_passwordGroup.r_password,
      name: data.r_name,
      surname: data.r_surname,
      birthday: moment().format('YYYY-MM-DD')
    })
      .pipe(first())
      .subscribe((response: any) => {
          console.log('response', response);
          this.registerProgress = false;
          this.registerForm.reset();
          this.toastr.success('We are happy to have you!', 'Welcome aboard');
          if (this.returnUrl) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.router.navigate(['/']);
          }
        },
        error => {
          console.error('error', error);
          this.registerProgress = false;
        });
  }

  ngOnDestroy(): void {
    if (this.routeSub !== undefined) {
      this.routeSub.unsubscribe();
    }
  }
}