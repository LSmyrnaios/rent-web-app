import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class ProviderGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private toastr: ToastrService
  ) {
  }

  /*
  * ΠΕΡΙΠΤΩΣΕΙΣ GIA TO BUTTON <<RENT YOUR SHIT>>>
(lg =  einai logged in)

ΚΑΤΑΣΤΑΣΗ             // ->    REDIRECT
lg     + user        // -> apply
lg     + paroxos    // -> dashboard
lg     + pending   //  -> errror
nolg+ paroxos      // -> login    -> dashboard
nolg+ pending     // -> ????
nolg+ user        // -> login     -> apply
nolg+ visitor    // -> login      -> apply
* */

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    const session = this.auth.session;
    console.log('session', session);
    if (session) {
      if (session.user.role === Role.Provider) {
        this.router.navigate(['/management'], {queryParams: {returnUrl: state.url}});
        return false;
      } else {
        const pendingProvider = sessionStorage.getItem('pending_provider');
        if (pendingProvider !== 'null' && pendingProvider === 'true') {
          this.toastr.warning('Please wait for your provider application to be accepted.', 'Pending confirmation');
          return false;
        }
        return true;
      }
    } else {
      this.toastr.warning('No rights to access this route!', 'Protected route');
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
