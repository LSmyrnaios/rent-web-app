import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../../../../shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UsersListResolver implements Resolve<any> {
  private username: string;

  constructor(
    private userService: UserService
  ) {
  }

  resolve(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.username = state.url.substr(18);
    console.log('this.selected', this.username);
    return this.userService.getAll({size: 10, page: 0, username: this.username});
  }
}
