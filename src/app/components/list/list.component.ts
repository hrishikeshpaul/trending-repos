import { Component, OnInit, Input } from '@angular/core';
import { Repo } from 'src/app/store/repo.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
  @Input() repoList: Array<Repo>;

  // repoList = [{
  //   avatar: "https://avatars0.githubusercontent.com/u/4620457?v=4",
  //   created: "2020-12-06T12:39:08Z",
  //   description: "Recovers passwords from pixelized screenshots",
  //   issues: 6,
  //   name: "Depix",
  //   owner: "beurtschipper",
  //   owner_url: "https://github.com/beurtschipper",
  //   stars: 9661,
  //   url: "https://github.com/beurtschipper/Depix",
  // }]
  
  constructor(){
  }

  ngOnInit(): void {
    
  }

  
}
