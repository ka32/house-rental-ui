import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SearchHomeService } from '../../services/search-home.service';
import { IArea } from './../../models/area.model';
import { AreaService } from '../../services/area.service';
import { IHomeType } from '../../models/home-type.model';
import { HomeTypeService } from './../../services/home-type.service';
import { Observable } from 'rxjs/internal/Observable';
import { Title } from '@angular/platform-browser';
import { ConstHelperService } from '../../services/const-helper.service';
import { IHomePost } from '../../models/home-post.model';
import { startWith, map } from '../../../../node_modules/rxjs/operators';
// declare const firebase: any;

@Component({
  selector: 'app-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.css']
})
export class SearchHomeComponent implements OnInit {
  public areaControl: FormControl;
  public homeTypeControl: FormControl;

  public searchFormGroup: FormGroup;
  public areas: IArea[];
  public homeTypes: IHomeType[];
  public homePosts: IHomePost[];
  public errorMessage: any;
  public isSearchButtonClicked = false;

  public filteredAreaOptions: Observable<IArea[]>;
  public filteredHomeTypeOptions: Observable<IHomeType[]>;

  constructor(
    private searchPostService: SearchHomeService,
    private areaService: AreaService,
    private homeTypeService: HomeTypeService,
    private constHelper: ConstHelperService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Search Home | ' + this.constHelper.PageTitle);

    this.areaControl = new FormControl(this.searchPostService.selectedArea, Validators.required);
    this.homeTypeControl = new FormControl(this.searchPostService.selectedHomeType, Validators.required);

    this.searchFormGroup = new FormGroup({
      area: this.areaControl,
      homeType: this.homeTypeControl
    });

    this.getAreas();
    this.getHomeTypes();

    this.getHomePosts(undefined);
  }

  private filterAreas(area: any): IArea[] {
    const filterValue = area === '' ? '' : area.name === undefined ? area.toLowerCase() : area.name.toLowerCase();

    return this.areas.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private filterHomeTypes(homeType: any): IHomeType[] {
    const filterValue = homeType === '' ? '' : homeType.name === undefined ? homeType.toLowerCase() : homeType.name.toLowerCase();

    return this.homeTypes.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private getAreas(): void {
    this.areaService
      .getAreas()
      .subscribe(
        (areas: IArea[]) => {
          this.areas = areas;

          this.filteredAreaOptions = this.areaControl.valueChanges.pipe(
            startWith(''),
            map(value => this.filterAreas(value))
          );
        },
        error => (this.errorMessage = error)
      );
  }

  private getHomeTypes(): void {
    this.homeTypeService
      .getHomeTypes()
      .subscribe(
        (homeTypes: IHomeType[]) => {
          this.homeTypes = homeTypes;

          this.filteredHomeTypeOptions = this.homeTypeControl.valueChanges.pipe(
            startWith(''),
            map(value => this.filterHomeTypes(value))
          );
        },
        error => (this.errorMessage = error)
      );
  }

  getHomePosts(formValues): void {
    this.isSearchButtonClicked = true;

    let areaId: number;
    let homeTypeId: number;

    areaId = this.areaControl.value.areaId;
    homeTypeId = this.homeTypeControl.value.homeTypeId;
// To do: Prod - remove this mock
    if (areaId === undefined) {
      areaId = 2;
      homeTypeId = 2;
    } else {
      areaId = this.areaControl.value.areaId;
      homeTypeId = this.homeTypeControl.value.homeTypeId;
    }

    this.searchPostService.getHomePosts(areaId, homeTypeId)
      .subscribe(
        (homePosts: IHomePost[]) => {
          this.homePosts = homePosts;
          this.errorMessage = '';
        },
        error => {
          this.homePosts = undefined;
          this.errorMessage = <any>error.status;
        }
      );
  }

  getDateDiff(fromDate: string): string {
    const date1 = new Date(fromDate);
    const today = new Date();
    const timeDiff = Math.abs(today.getTime() - date1.getTime());
    const diffDays = Math.round(timeDiff / (1000 * 3600 * 24));

    let diffString: string;

    if (diffDays < 1) {
      diffString = 'Today';
    } else if (diffDays === 1) {
      diffString = '1 day ago';
    } else if (diffDays < 30) {
      diffString = diffDays + ' days ago';
    } else if (diffDays > 30) {
      if (diffDays < 335) {
        diffString = Math.round(diffDays / 30) + ' months ago';
      } else {
        const years = Math.round(diffDays / 365);
        if (years <= 1) {
          diffString = years + ' year ago';
        } else {
          diffString = years + ' years ago';
        }
      }
    }

    return diffString;
  }

  getAreaNameById(area: IArea): string {
    return area ? area.name : '';
  }

  getHomeTypeNameById(homeType: IHomeType): string {
    return homeType ? homeType.name : '';
  }
}
