import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Repo } from './repo.model';
import { Injectable } from '@angular/core';
import { FetchAllRepos } from './repo.actions';
import { RepoService } from "../services/repo.service";
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


export interface RepoStateModel {
  repoList: Repo[],
  pageNumber: number,
  loading: boolean,
  error: boolean
}

@State<RepoStateModel>({
  name: 'repoList',
  defaults: {
    repoList: [],
    pageNumber: 1,
    loading: true,
    error: false
  }
})
@Injectable()
export class RepoState {
  constructor(private repoService: RepoService) { }

  @Selector()
  static getRepoList(state: RepoStateModel) {
    return state.repoList
  }

  @Selector()
  static isLoading(state: RepoStateModel) {
    return state.loading
  }

  @Action(FetchAllRepos)
  fetchRepos({ getState, setState, patchState }: StateContext<RepoStateModel>) {
    const state = getState();
    const pageNumber = state.pageNumber;
    const repoList = state.repoList;

    patchState({
      loading: true
    })
    
    return this.repoService.fetchRepos(pageNumber).pipe(
      tap((result) => {
        console.log(result)
        setState({
          ...state,
          repoList: [],
          error: false,
          loading: false
        })
      }), catchError((err) => {
        console.log(`ERROR: ${err}`)
        setState({
          ...state,
          error: true,
          loading: false
        })
        return of('')
      })
    )
  }
}

