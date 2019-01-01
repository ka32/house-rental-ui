import { Component, OnInit } from '@angular/core';
import { ConstHelperService } from 'src/app/services/const-helper.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  constructor(
    private constHelper: ConstHelperService,
    private titleService: Title,
    private route: ActivatedRoute
  ) { }

  public postIdFromUrl: -1;
  public updateMode = 'update';

  ngOnInit() {
    this.titleService.setTitle('Edit Post | ' + this.constHelper.PageTitle);

    this.route.params.subscribe(params => {
      this.postIdFromUrl = params['id'];
    });
  }

}
