import { Component, OnInit, Input } from '@angular/core';
import { IHomePost } from '../../models/home-post.model';

@Component({
  selector: 'app-search-home-results',
  templateUrl: './search-home-results.component.html',
  styleUrls: ['./search-home-results.component.css']
})
export class SearchHomeResultsComponent implements OnInit {

  @Input() public homePosts: IHomePost[];
  @Input()  errorMessage: string;

  constructor() { }

  ngOnInit() {
  }

}
