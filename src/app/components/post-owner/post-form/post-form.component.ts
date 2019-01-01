import { Component, OnInit, Input, NgZone } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormGroupDirective,
  NgForm
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IArea } from './../../../models/area.model';
import { AreaService } from './../../../services/area.service';
import { IHomeType } from './../../../models/home-type.model';
import { HomeTypeService } from './../../../services/home-type.service';
import { ManagePostsService } from '../../../services/manage-posts.service';
import { ConstHelperService } from './../../../services/const-helper.service';
import { startWith, map } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { IHomePost } from 'src/app/models/home-post.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  showError = false;
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return control && control.invalid && this.showError;
  }
}

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  private areaControl: FormControl;
  private homeTypeControl: FormControl;
  private sqFtCtrl: FormControl;
  private rentCtrl: FormControl;
  private depositCtrl: FormControl;
  private addressPremiseNameCtrl: FormControl;
  private addressStreetCtrl: FormControl;
  private contactPersonCtrl: FormControl;
  private contactPhoneCtrl: FormControl;

  public savePostFormGroup: FormGroup;
  public areas: IArea[];
  public homeTypes: IHomeType[];
  public errorMessage: any;
  public rentInWords: string;
  public depositInWords: string;
  public isSaveButtonClicked = false;

  public isSaveInProgress = false;
  public filteredAreaOptions: Observable<IArea[]>;
  public filteredHomeTypeOptions: Observable<IHomeType[]>;

  public matcher = new MyErrorStateMatcher();
  constructor(
    private managePostsService: ManagePostsService,
    private areaService: AreaService,
    private homeTypeService: HomeTypeService,
    private router: Router,
    private constHelper: ConstHelperService,
    private snackBarService: SnackBarService,
    private zone: NgZone
  ) {}

  @Input()
  saveMode: string;

  @Input()
  postId = -1;

  ngOnInit() {
    //#region Create Form Controls
    this.areaControl = new FormControl(
      this.managePostsService.area,
      Validators.required
    );
    this.homeTypeControl = new FormControl(
      this.managePostsService.homeType,
      Validators.required
    );
    this.sqFtCtrl = new FormControl(this.managePostsService.sqFt, [
      Validators.min(25),
      Validators.max(10000)
    ]);
    this.rentCtrl = new FormControl(this.managePostsService.rent, [
      Validators.required,
      Validators.min(0),
      Validators.max(10000000)
    ]);
    this.depositCtrl = new FormControl(this.managePostsService.deposit, [
      Validators.required,
      Validators.min(0),
      Validators.max(100000000)
    ]);
    this.addressPremiseNameCtrl = new FormControl(
      this.managePostsService.addressPremiseName,
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)]
    );

    this.addressStreetCtrl = new FormControl(
      this.managePostsService.addressStreet,
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)]
    );

    this.contactPersonCtrl = new FormControl(
      this.managePostsService.contactPerson,
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)]
    );

    this.contactPhoneCtrl = new FormControl(
      this.managePostsService.contactPhone,
      [
        Validators.required,
        Validators.min(1000000000),
        Validators.max(9999999999)
      ]
    );

    this.savePostFormGroup = new FormGroup({
      areaId: this.areaControl,
      homeTypeId: this.homeTypeControl,
      sqFt: this.sqFtCtrl,
      rent: this.rentCtrl,
      deposit: this.depositCtrl,
      addressPremiseName: this.addressPremiseNameCtrl,
      addressStreet: this.addressStreetCtrl,
      contactPerson: this.contactPersonCtrl,
      contactPhone: this.contactPhoneCtrl
    });
    //#endregion

    this.getAreas();
    this.getHomeTypes();

    this.savePostFormGroup.valueChanges.subscribe(() => {
      this.managePostsService.canDeactivate = false;
    });

    if (this.saveMode === 'update') {
      this.loadPost(this.postId);
    }
  }

  //#region getter properties
  get savePostLabel(): string {
    return this.saveMode === 'update' ? 'Update Post' : 'Save Post';
  }

  get savingLabel(): string {
    return this.saveMode === 'update' ? 'Updating...' : 'Saving...';
  }

  get sqFt() {
    return this.savePostFormGroup.get('sqFt');
  }
  get rent() {
    return this.savePostFormGroup.get('rent');
  }
  get deposit() {
    return this.savePostFormGroup.get('deposit');
  }
  get contactPerson() {
    return this.savePostFormGroup.get('contactPerson');
  }
  get contactPhone() {
    return this.savePostFormGroup.get('contactPhone');
  }
  get addressPremiseName() {
    return this.savePostFormGroup.get('addressPremiseName');
  }
  get addressStreet() {
    return this.savePostFormGroup.get('addressStreet');
  }
  //#endregion

  //#region Private methods

  private navigateToPreviousPage() {
    if (this.saveMode === 'update') {
      this.router.navigate([this.constHelper.ManagePostsPageUrl]);
    } else {
      this.router.navigate([this.constHelper.HomePageUrl]);
    }
  }

  private filterAreas(area: any): IArea[] {
    const filterValue =
      area === ''
        ? ''
        : area.name === undefined
        ? area.toLowerCase()
        : area.name.toLowerCase();

    return this.areas.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private filterHomeTypes(homeType: any): IHomeType[] {
    const filterValue =
      homeType === ''
        ? ''
        : homeType.name === undefined
        ? homeType.toLowerCase()
        : homeType.name.toLowerCase();

    return this.homeTypes.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private getAreas(): void {
    this.areaService.getAreas().subscribe(
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
    this.homeTypeService.getHomeTypes().subscribe(
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

  private loadPost(homePostId: number): void {
    this.managePostsService.getMyPost(homePostId).subscribe(
      (post: IHomePost) => {
        this.zone.run(() => {
          this.areaControl.setValue(post.area);
          this.homeTypeControl.setValue(post.homeType);
          this.rentCtrl.setValue(post.rent);
          this.depositCtrl.setValue(post.deposit);
          this.sqFtCtrl.setValue(post.sqFt);
          this.addressPremiseNameCtrl.setValue(post.addressPremiseName);
          this.addressStreet.setValue(post.addressStreet);
          this.contactPersonCtrl.setValue(post.contactPerson);
          this.contactPhoneCtrl.setValue(post.contactPhone);
        });
    }, error => {
        
    });
  }
  //#endregion

  //#region Public methods
  public getAreaNameById(area: IArea): string {
    return area ? area.name : '';
  }

  public getHomeTypeNameById(homeType: IHomeType): string {
    return homeType ? homeType.name : '';
  }

  public saveHomePost(formValues): void {
    this.isSaveButtonClicked = true;

    if (!this.savePostFormGroup.valid) {
      this.matcher.showError = true;
    } else {
      this.isSaveInProgress = true;

      this.managePostsService.savePost(formValues).subscribe(
        resp => this.onSuccessfulPost(resp),
        error => {
          this.onPostError(error);
        }
      );
    }
  }

  public onSuccessfulPost(resp: any) {
    this.isSaveInProgress = false;
    this.snackBarService.showInfo('Post Saved Succesfully.');
    this.managePostsService.canDeactivate = true;
    this.navigateToPreviousPage();
  }

  public onPostError(error: any): void {
    this.isSaveInProgress = false;
    let errorMsg = 'Failed to Save Post. ';

    if (error.status === 0) {
      errorMsg += 'KA32 Servers are temporarily down.';
    } else if (error.error === 'You reached maximum posts limit') {
      errorMsg += error.error;
    }

    this.snackBarService.showError(errorMsg);
  }

  public cancelPost(): void {
    this.navigateToPreviousPage();
  }

  public showRentInWords(rent: number): void {
    this.rentInWords = this.managePostsService.convertNumberToWords(rent);
  }

  public showRentLabel(state: boolean) {
    if (!state) {
      this.rentInWords = '';
    }
  }

  showDepositInWords(deposit: number): void {
    this.depositInWords = this.managePostsService.convertNumberToWords(deposit);
  }

  showDepositLabel(state: boolean) {
    if (!state) {
      this.depositInWords = '';
    }
  }
  //#endregion

  //#region Public validation methods
  public isInvalidArea(): boolean {
    return (
      this.savePostFormGroup.controls.areaId.invalid && this.isSaveButtonClicked
    );
  }

  public isInvalidHomeType(): boolean {
    return (
      this.savePostFormGroup.controls.homeTypeId.invalid &&
      this.isSaveButtonClicked
    );
  }

  public isInvalidSqFt(): boolean {
    return (
      this.savePostFormGroup.controls.sqFt.invalid && this.isSaveButtonClicked
    );
  }

  public isInvalidRent(): boolean {
    return (
      this.savePostFormGroup.controls.rent.invalid && this.isSaveButtonClicked
    );
  }

  public isInvalidDeposit(): boolean {
    return (
      this.savePostFormGroup.controls.deposit.invalid &&
      this.isSaveButtonClicked
    );
  }

  public isInvalidAddressPremiseName(): boolean {
    return (
      this.savePostFormGroup.controls.addressPremiseName.invalid &&
      this.isSaveButtonClicked
    );
  }

  public isInvalidAddressStreetName(): boolean {
    return (
      this.savePostFormGroup.controls.addressStreet.invalid &&
      this.isSaveButtonClicked
    );
  }

  public isInvalidContactName(): boolean {
    return (
      this.savePostFormGroup.controls.contactPerson.invalid &&
      this.isSaveButtonClicked
    );
  }

  public isInvalidContactPhone(): boolean {
    return (
      this.savePostFormGroup.controls.contactPhone.invalid &&
      this.isSaveButtonClicked
    );
  }

  public isInvalidForm(): boolean {
    return this.savePostFormGroup.invalid && this.isSaveButtonClicked;
  }

  public get AreaErrorMessage(): string {
    return 'Required';
  }

  public get HomeTypeErrorMessage(): string {
    return 'Required';
  }

  public get SqFtErrorMessage(): string {
    let errorMessage = '';
    if (this.sqFt.hasError('required')) {
      errorMessage = 'Required';
    } else if (this.sqFt.hasError('min') || this.sqFt.hasError('max')) {
      errorMessage = 'Should be 25 to 10,000';
    }

    return errorMessage;
  }

  public get RentErrorMessage(): string {
    let errorMessage = '';
    if (this.rent.hasError('required')) {
      errorMessage = 'Required';
    } else if (this.rent.hasError('min') || this.rent.hasError('max')) {
      errorMessage = 'Should be 0 to 1,00,00,000';
    }

    return errorMessage;
  }

  public get DepositErrorMessage(): string {
    let errorMessage = '';
    if (this.deposit.hasError('required')) {
      errorMessage = 'Required';
    } else if (this.deposit.hasError('min') || this.deposit.hasError('max')) {
      errorMessage = 'Should be 0 to 10,00,00,000';
    }

    return errorMessage;
  }

  public get AddressPremiseNameErrorMessage(): string {
    let errorMessage = '';
    if (this.addressPremiseName.hasError('required')) {
      errorMessage = 'Required';
    } else if (
      this.addressPremiseName.hasError('minlength') ||
      this.addressPremiseName.hasError('maxlength')
    ) {
      errorMessage = 'Should have 3 to 100 characters';
    }

    return errorMessage;
  }

  public get AddressStreetNameErrorMessage(): string {
    let errorMessage = '';
    if (this.addressStreet.hasError('required')) {
      errorMessage = 'Required';
    } else if (
      this.addressStreet.hasError('minlength') ||
      this.addressStreet.hasError('maxlength')
    ) {
      errorMessage = 'Should have 3 to 100 characters';
    }

    return errorMessage;
  }

  public get ContactNameErrorMessage(): string {
    let errorMessage = '';
    if (this.contactPerson.hasError('required')) {
      errorMessage = 'Required';
    } else if (
      this.contactPerson.hasError('minlength') ||
      this.contactPerson.hasError('maxlength')
    ) {
      errorMessage = 'Should have 3 to 100 characters';
    }

    return errorMessage;
  }

  public get ContactNumberErrorMessage(): string {
    let errorMessage = '';
    if (this.contactPhone.hasError('required')) {
      errorMessage = 'Required';
    } else if (
      this.contactPhone.hasError('minlength') ||
      this.contactPhone.hasError('maxlength')
    ) {
      errorMessage = 'Should have 10 digits';
    } else if (this.contactPhone.hasError('pattern')) {
      errorMessage = 'Should be a valid mobile number';
    }

    return errorMessage;
  }
  //#endregion
}
