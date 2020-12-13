import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Repo, Error } from '../store/repo.model';
import URL from '../../assets/static';
import * as moment from 'moment';

/**
 * Interface for the GitHub Reponse object
 */
export interface GHResponse {
  total_count: number;
  incomplete_results: false;
  items: Array<any>;
}

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  constructor(private http: HttpClient) { }

  /**
   * Function to make an API call to retrieve the repos given the page number
   * and the last 30 days date.
   *
   * @param page: page number
   *
   * @returns A list of repositories
   * @throws Error if fething is unsuccessful
   */

  fetchRepos(page: number): Observable<Repo[]> {

    // Stores the list of repositories
    const repoList: Repo[] = [];

    // Calculate date
    const last30DaysDate = new Date(new Date().setDate(new Date().getDate() - 30));

    return this.http.get<GHResponse>(URL(moment(last30DaysDate).format('YYYY-MM-DD'), page)).pipe(
      map((repos) => {

        /**
         * From the response, create each repo object by picking
         * out the required defails
         */

        repos.items.forEach((repo, i) => {
          repoList.push({
            name: repo.name,
            url: repo.html_url,
            owner: repo.owner.login,
            owner_url: repo.owner.html_url,
            avatar: repo.owner.avatar_url,
            description: repo.description,
            stars: repo.stargazers_count,
            issues: repo.open_issues,
            created: repo.created_at,
            dur: i % 5
          });
        });

        return repoList;
      }), catchError(err => {
        return throwError(err);
      })
    );
  }
}
