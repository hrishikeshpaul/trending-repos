import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RepoState } from './../../store/repo.state';
import { FetchAllRepos } from './../../store/repo.actions';
import { Repo } from './../../store/repo.model';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Select(RepoState.getRepoList) repos$: Observable<Repo[]>;
  @Select(RepoState.isLoading) isLoading$: Observable<Boolean>;

  repoList: Repo[];

  constructor(private store: Store) {
    this.store.dispatch(new FetchAllRepos());
  }

  ngOnInit(): void {
    this.repos$.subscribe(data => {
      this.repoList = data;
    })
  }

  getRepoList() {
    this.store.dispatch(new FetchAllRepos());
  }

}
