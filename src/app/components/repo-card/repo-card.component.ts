import { Component, OnInit, Input } from '@angular/core';
import { Repo } from 'src/app/store/repo.model';
import * as moment from 'moment';


@Component({
  selector: 'app-repo-card',
  templateUrl: './repo-card.component.html',
  styleUrls: ['./repo-card.component.scss']
})
export class RepoCardComponent implements OnInit {
  
  @Input() repo: Repo;

  moment = moment;


  constructor() { }

  ngOnInit(): void {
  }

}
