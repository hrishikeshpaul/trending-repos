import { Component } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import { RepoState } from './store/repo.state';
import { FetchAllRepos } from './store/repo.actions';
import { Repo } from './store/repo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Select(RepoState.getRepoList) repos$: Observable<Repo[]>;
  @Select(RepoState.isLoading) isLoading$: Observable<Boolean>;

  constructor(private store: Store) {
    this.store.dispatch(new FetchAllRepos());
  }

  do() {
    this.store.dispatch(new FetchAllRepos());
  }
}
