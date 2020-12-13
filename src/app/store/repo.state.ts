import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Repo, Error } from './repo.model';
import { Injectable } from '@angular/core';
import { FetchAllRepos } from './repo.actions';
import { RepoService } from '../services/repo.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

/**
 * Interface for the state
 */
export interface RepoStateModel {
  repoList: Repo[];
  pageNumber: number;
  loading: boolean;
  status: number;
  error: Error;
}

@State<RepoStateModel>({
  name: 'repoList',
  defaults: {
    repoList: [],
    pageNumber: 1,
    loading: true,
    status: 200,
    error: {}
  }
})
@Injectable()
export class RepoState {
  constructor(private repoService: RepoService) { }

  /**
   * Selector to return the current state
   * @param state: current state
   */
  @Selector()
  static getState(state: RepoStateModel) {
    return state;
  }

  /**
   * Selector to return the current repository list
   * @param state: current state
   */
  @Selector()
  static getRepoList(state: RepoStateModel) {
    return state.repoList;
  }
  
  /**
   * Selector to return the loading state
   * @param state: current state
   */
  @Selector()
  static isLoading(state: RepoStateModel) {
    return state.loading;
  }

  /**
   * Selector to return the status
   * @param state: current state
   */
  @Selector()
  static getStatus(state: RepoStateModel) {
    return state.status;
  }
  
  /**
   * Selector to return the errors if any
   * @param state: current state
   */
  @Selector()
  static getError(state: RepoStateModel) {
    return state.error;
  }

  /**
   * Action to fetch all repositories
   * Sets the leading to state to true till API request is complete
   * Ultimately, sets the data and increments the error
   * Or sets the error object with the repective values
   */
  @Action(FetchAllRepos)
  fetchRepos({ getState, setState, patchState }: StateContext<RepoStateModel>) {
    const state = getState();
    const pageNumber = state.pageNumber;
    const repoList = state.repoList;
    
    // Show that the system is successfully loading
    patchState({
      loading: true,
      status: 200
    });

    return this.repoService.fetchRepos(pageNumber).pipe(
      tap((result) => {
        setState({
          ...state,
          repoList: [...repoList, ...result],
          pageNumber: pageNumber + 1,
          error: {},
          loading: false,
          status: 200
        });
      }), catchError((err) => {
        setState({
          ...state,
          status: err.status,
          error: {
            message: err.message,
            statusText: err.statusText,
            troublshooot: err.error.documentation_url
          },
          loading: false
        });
        return of('');
      })
    );
  }
}

