import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
import { Repo } from "../store/repo.model";
export interface GHResponse {
  total_count: number,
  incomplete_results: false,
  items: Array<any>;
}

@Injectable({
  providedIn: 'root'
})
export class RepoService {
  
  constructor(private http: HttpClient) { }

  fetchRepos(page: number) {
    const currentDate = new Date();
    const currentDateTime = currentDate.getTime();
    const last30DaysDate = new Date(currentDate.setDate(currentDate.getDate() - 30));
    const last30DaysDateTime = last30DaysDate.getTime();

    const repoList: Repo[] = [];

    return this.http.get<GHResponse>(`https://api.github.com/search/repositories?q=created:%3E2020-05-22&sort=stars&order=desc&page=${page}`).pipe(
      map((repos) => {
        repos.items.forEach(repo => {
          repoList.push({
            name: repo.name,
            url: repo.html_url,
            owner: repo.owner.login,
            avatar: repo.owner.avatar_url,
            description: repo.description,
            stars: repo.stargazers_count,
            issues: repo.open_issues,
            created: repo.created_at
          })
        })

        return repoList
      }), catchError(err => {
        return throwError('Could not fetch data.')
      })
    )
  }

  filterRepos(repoList: Array<any>) {

  }
}
