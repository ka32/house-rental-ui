import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ConstHelperService } from '../../services/const-helper.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private route: Router,
    private constHelper: ConstHelperService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Page Not Found | ' + this.constHelper.PageTitle);
  }

  onGoHomeClick() {
    this.route.navigate(['/']);
  }

}
