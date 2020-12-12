import { Component, OnInit, Input } from '@angular/core';
import { Error } from 'src/app/store/repo.model';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  @Input() error: Error
  @Input() status: number;
  constructor() { }

  ngOnInit(): void {

  }

}
