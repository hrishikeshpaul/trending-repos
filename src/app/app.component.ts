import { Component, OnInit, HostListener } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RepoState, RepoStateModel } from './store/repo.state';
import { FetchAllRepos } from './store/repo.actions';
import { Repo } from './store/repo.model';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Select(RepoState.getRepoList) repos$: Observable<Repo[]>;
  @Select(RepoState.isLoading) isLoading$: Observable<Boolean>;
  @Select(RepoState.getStatus) status$: Observable<number>;
  @Select(RepoState.getError) error$: Observable<Error>;
  @Select(RepoState.isLoading) state$: Observable<RepoStateModel>;

  status: number;
  error: Error;
  repoList: Repo[];
  isLoading: boolean;


  constructor(private store: Store) {
    AOS.init({
      offset: -200
    });
    this.store.dispatch(new FetchAllRepos());
  }

  ngOnInit() {
    this.repos$.subscribe(data => {
      this.repoList = data;
    })

    this.status$.subscribe(status => {
      this.status = status
    })

    this.error$.subscribe(error => {
      this.error = error;
    })
  }

  getRepoList() {
    this.store.dispatch(new FetchAllRepos());
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (
      window.innerHeight + window.pageYOffset ===
      document.documentElement.offsetHeight
    ) {
      this.getRepoList()
    }
  }
}
