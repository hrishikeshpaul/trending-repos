import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Repo } from 'src/app/store/repo.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() repoList: Array<Repo>;

  constructor(){
  }

  ngOnInit(): void {

  }



}
