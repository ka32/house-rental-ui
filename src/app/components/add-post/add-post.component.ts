import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IArea } from './../../models/area.model';
import { AreaService } from './../../services/area.service';
import { FurnishTypeService } from './../../services/furnish-type.service';
import { IHomeType } from './../../models/home-type.model';
import { IFurnishType } from './../../models/furnish-type.model';
import { HomeTypeService } from './../../services/home-type.service';
import { AddPostService } from './../../services/add-post.service';
import { ConstHelperService } from './../../services/const-helper.service';
import { Title } from '@angular/platform-browser';
import { startWith, map } from 'rxjs/operators';
@Component({
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  private areaControl: FormControl;
  private homeTypeControl: FormControl;
  private furnishTypeControl: FormControl;

  private sqFtCtrl: FormControl;
  private rentCtrl: FormControl;
  private depositCtrl: FormControl;
  private addressPremiseNameCtrl: FormControl;
  private addressStreetCtrl: FormControl;
  private contactPersonCtrl: FormControl;
  private contactPhoneCtrl: FormControl;

  savePostFormGroup: FormGroup;
  areas: IArea[];
  homeTypes: IHomeType[];
  furnishTypes: IFurnishType[];
  errorMessage: any;
  rentInWords: string;
  depositInWords: string;
  showLoader = false;

  isSaveButtonClicked = false;

  public filteredAreaOptions: Observable<IArea[]>;
  filteredHomeTypeOptions: Observable<IHomeType[]>;
  filteredFurnishTypeOptions: Observable<IFurnishType[]>;

  constructor(private addPostService: AddPostService, private areaService: AreaService,
    private homeTypeService: HomeTypeService, private furnishTypeService: FurnishTypeService,
    private router: Router, private constHelper: ConstHelperService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Add New Post | ' + this.constHelper.PageTitle);

    this.areaControl = new FormControl(this.addPostService.area, Validators.required);
    this.homeTypeControl = new FormControl(this.addPostService.homeType, Validators.required);
    this.furnishTypeControl = new FormControl(this.addPostService.furnishType, Validators.required);
    this.sqFtCtrl = new FormControl(this.addPostService.sqFt, [Validators.required, Validators.min(25), Validators.max(10000)]);
    this.rentCtrl = new FormControl(this.addPostService.rent, [Validators.required, Validators.min(0), Validators.max(10000000)]);
    this.depositCtrl = new FormControl(this.addPostService.deposit, [Validators.required, Validators.min(0), Validators.max(100000000)]);
    this.addressPremiseNameCtrl = new FormControl(
      this.addPostService.addressPremiseName,
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)]);

    this.addressStreetCtrl = new FormControl(
      this.addPostService.addressStreet,
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)]);

    this.contactPersonCtrl = new FormControl(
      this.addPostService.contactPerson,
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)]);

    this.contactPhoneCtrl = new FormControl(
      this.addPostService.contactPhone, [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]);

    this.savePostFormGroup = new FormGroup({
      areaId: this.areaControl,
      homeTypeId: this.homeTypeControl,
      furnishTypeId: this.furnishTypeControl,
      sqFt: this.sqFtCtrl,
      rent: this.rentCtrl,
      deposit: this.depositCtrl,
      addressPremiseName: this.addressPremiseNameCtrl,
      addressStreet: this.addressStreetCtrl,
      contactPerson: this.contactPersonCtrl,
      contactPhone: this.contactPhoneCtrl
    });

    this.getAreas();
    this.getHomeTypes();
    this.getFurnishTypes();
  }

  get sqFt() { return this.savePostFormGroup.get('sqFt'); }
  get rent() { return this.savePostFormGroup.get('rent'); }
  get deposit() { return this.savePostFormGroup.get('deposit'); }
  get contactPerson() { return this.savePostFormGroup.get('contactPerson'); }
  get contactPhone() { return this.savePostFormGroup.get('contactPhone'); }
  get addressPremiseName() { return this.savePostFormGroup.get('addressPremiseName'); }
  get addressStreet() { return this.savePostFormGroup.get('addressStreet'); }

  private filterAreas(area: any): IArea[] {
    const filterValue = area === '' ? '' : area.name === undefined ? area.toLowerCase() : area.name.toLowerCase();

    return this.areas.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private filterHomeTypes(homeType: any): IHomeType[] {
    const filterValue = homeType === '' ? '' : homeType.name === undefined ? homeType.toLowerCase() : homeType.name.toLowerCase();

    return this.homeTypes.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private filterFurnishTypes(furnishType: any): IFurnishType[] {
    const filterValue = furnishType === '' ? '' :
      furnishType.name === undefined ? furnishType.toLowerCase() : furnishType.name.toLowerCase();

    return this.furnishTypes.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
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

  private getFurnishTypes(): void {
    this.furnishTypeService
      .getFurnishTypes()
      .subscribe(
        (furnishTypes: IFurnishType[]) => {
          this.furnishTypes = furnishTypes;

          this.filteredFurnishTypeOptions = this.furnishTypeControl.valueChanges.pipe(
            startWith(''),
            map(value => this.filterFurnishTypes(value))
          );
        },
        error => (this.errorMessage = error)
      );
  }

  getAreaNameById(area: IArea): string {
    return area ? area.name : '';
  }

  getHomeTypeNameById(homeType: IHomeType): string {
    return homeType ? homeType.name : '';
  }

  getFurnishTypeNameById(furnishType: IFurnishType): string {
    return furnishType ? furnishType.name : '';
  }

  public get AreaErrorMessage(): string {
    return 'Please select the Locality';
  }

  public get HomeTypeErrorMessage(): string {
    return 'Please select total rooms';
  }

  public get FurnishTypeErrorMessage(): string {
    return 'Please specify Furnish type';
  }

  public get SqFtErrorMessage(): string {
    return 'Please specify Square Feet';
  }

  public get SqFtRangeErrorMessage(): string {
    return 'square feet Should be between 25 to 10000';
  }

  public get RentErrorMessage(): string {
    return 'Please specify Rent amount';
  }

  public get RentRangeErrorMessage(): string {
    return 'Should be between 0 to 10000000';
  }

  public get DepositErrorMessage(): string {
    return 'Please specify Deposit amount';
  }

  public get DepositRangeErrorMessage(): string {
    return 'Should be between 0 to 100000000';
  }

  public get AddressPremiseNameErrorMessage(): string {
    return 'Please specify Premise name';
  }

  public get ContactNameErrorMessage(): string {
    return 'Please specify Contact person\`s name';
  }

  public get ContactNumberErrorMessage(): string {
    return 'Please specify Contact numner';
  }

  saveHomePost(formValues): void {
    this.isSaveButtonClicked = true;

    if (this.savePostFormGroup.valid) {
      this.showLoader = true;

      this.addPostService.savePost(formValues).subscribe(
        resp => this.onSuccessfulPost(resp),
        error => {
          this.onPostError(error);
        });
    }
  }

  onSuccessfulPost(resp: any) {
    this.showLoader = false;
    alert('Post Saved Succesfully.');
    this.router.navigate([this.constHelper.HomePageUrl]);
  }

  onPostError(error: any): void {
    this.showLoader = false;
    let errorMsg = 'Failed to Save Post. ';

    if (error.status === 0) {
      errorMsg += 'KA32 Servers are temporarily down.';
    } else if (error.status === 400 || error.status === 401) {

    }

    alert(errorMsg);
  }

  cancelPost(): void {
    this.router.navigate([this.constHelper.HomePageUrl]);
  }

  showRentInWords(rent: number): void {
    this.rentInWords = this.addPostService.convertNumberToWords(rent);
  }

  showRentLabel(state: boolean) {
    if (!state) {
      this.rentInWords = '';
    }
  }

  showDepositInWords(deposit: number): void {
    this.depositInWords = this.addPostService.convertNumberToWords(deposit);
  }

  showDepositLabel(state: boolean) {
    if (!state) {
      this.depositInWords = '';
    }
  }

  isInvalidArea(): boolean {
    return this.savePostFormGroup.controls.areaId.invalid && this.isSaveButtonClicked;
  }

  isInvalidHomeType(): boolean {
    return this.savePostFormGroup.controls.homeTypeId.invalid && this.isSaveButtonClicked;
  }

  isInvalidFurnishType(): boolean {
    return this.savePostFormGroup.controls.furnishTypeId.invalid && this.isSaveButtonClicked;
  }

  isInvalidSqFt(): boolean {
    return this.savePostFormGroup.controls.sqFt.invalid && this.isSaveButtonClicked;
  }

  isInvalidRent(): boolean {
    return this.savePostFormGroup.controls.rent.invalid && this.isSaveButtonClicked;
  }

  isInvalidDeposit(): boolean {
    return this.savePostFormGroup.controls.deposit.invalid && this.isSaveButtonClicked;
  }

  isInvalidPremiseName(): boolean {
    return this.savePostFormGroup.controls.addressPremiseName.invalid && this.isSaveButtonClicked;
  }

  isInvalidStreetName(): boolean {
    return this.savePostFormGroup.controls.addressStreet.invalid && this.isSaveButtonClicked;
  }

  isInvalidContactName(): boolean {
    return this.savePostFormGroup.controls.contactPerson.invalid && this.isSaveButtonClicked;
  }

  isInvalidContactPhone(): boolean {
    return this.savePostFormGroup.controls.contactPhone.invalid && this.isSaveButtonClicked;
  }

  isInvalidForm(): boolean {
    return (this.savePostFormGroup.invalid && this.isSaveButtonClicked);
  }

}
