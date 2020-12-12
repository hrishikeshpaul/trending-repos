import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Repo } from '../store/repo.model';
import URL from '../../assets/static';
import * as moment from 'moment';

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

  fetchRepos(page: number) {

    const repoList: Repo[] = [];

    const last30DaysDate = new Date(new Date().setDate(new Date().getDate() - 30))

    return this.http.get<GHResponse>(URL(moment(last30DaysDate).format('YYYY-MM-DD'), page)).pipe(
      map((repos) => {
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
            idx: i % 10
          });
        });

        return repoList;
      }), catchError(err => {
        return throwError(err);
      })
    );
  }

  filterRepos(repoList: Array<Repo>) {
    const currentDate = new Date();
    const currentDateTime = currentDate.getTime();
    const last30DaysDate = new Date(currentDate.setDate(currentDate.getDate() - 50));
    const last30DaysDateTime = last30DaysDate.getTime();
    console.log(moment(last30DaysDate).format('YYYY-MM-DD'))

    let updatedList = repoList.filter(repo => {
      const elementDateTime = new Date(repo.created).getTime();
      if (elementDateTime <= currentDateTime && elementDateTime > last30DaysDateTime) {
        return true;
      }
      return false;
    });

    updatedList = updatedList.map(
      (repo, i) => {
        const obj = Object.assign({}, repo);
        obj.idx = i;
        return obj;
      });

    return updatedList;
  }
}
