import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConstHelperService } from 'src/app/services/const-helper.service';
@Component({
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  constructor(
    private constHelper: ConstHelperService,
    private titleService: Title
  ) { }

  public createMode = 'create';

  ngOnInit() {
    this.titleService.setTitle('Add New Post | ' + this.constHelper.PageTitle);
  }
}
