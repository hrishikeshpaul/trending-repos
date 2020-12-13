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
  // Declare Selector observables for retrieves the data
  // from the store
  @Select(RepoState.getRepoList) repos$: Observable<Repo[]>;
  @Select(RepoState.isLoading) isLoading$: Observable<boolean>;
  @Select(RepoState.getStatus) status$: Observable<number>;
  @Select(RepoState.getError) error$: Observable<Error>;

  status: number;
  error: Error;
  repoList: Repo[];
  isLoading: boolean;

  constructor(private store: Store) {
    // Initialize animation on scroll for cards
    AOS.init({
      offset: -200,
      easing: 'ease',
      once: true
    });

    // On creation, fetch all the repos
    this.store.dispatch(new FetchAllRepos());
  }

  ngOnInit() {
    // Subscribe to retrieve the data when updated
    this.repos$.subscribe(data => {
      this.repoList = data;
    });
    
    // Subscribe to retrieve the status of app
    this.status$.subscribe(status => {
      this.status = status;
    });
    
    // Subscribe to recieve errors when occur
    this.error$.subscribe(error => {
      this.error = error;
    });
  }
  
  /**
   * Function to dispatch an action to retrieve the repo list
   */
  getRepoList(): void {
    this.store.dispatch(new FetchAllRepos());
  }
  
  /**
   * Watch the scroll
   * When tscrolled to bottom, get a new set of repo list
   */
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (
      window.innerHeight + window.pageYOffset ===
      document.documentElement.offsetHeight
    ) {
      this.getRepoList();
    }
  }
}
