import { Component, OnInit, NgZone } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConstHelperService } from 'src/app/services/const-helper.service';
import { ManagePostsService } from 'src/app/services/manage-posts.service';
import { IHomePost } from 'src/app/models/home-post.model';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class ManagePostsComponent implements OnInit {
  private posts: IHomePost[];

  constructor(
    private titleService: Title,
    private constHelper: ConstHelperService,
    private managePostsService: ManagePostsService,
    private snackBarService: SnackBarService,
    private zone: NgZone
  ) { }

  public isGetInProgress = false;
  displayedColumns: string[] = ['homePostId', 'area.name', 'homeType.name', 'postStatusType', 'postDateTime'];
  dataSource = this.posts;
  expandedRow: IHomePost | null;

  ngOnInit() {
    this.titleService.setTitle('Manage Posts | ' + this.constHelper.PageTitle);

    this.getPosts();
  }

  // #region "Private functions"
  private getPosts(): void {
    this.isGetInProgress = true;

    this.managePostsService.getPosts().subscribe(
      (posts: IHomePost[]) => {
        this.isGetInProgress = false;
        this.zone.run(() => {
          this.posts = posts;
          this.dataSource = posts;
        });
      },
      error => {
        this.isGetInProgress = false;
        this.snackBarService.showError(error.error);
      }
    );
  }
  // #endregion

}
