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
@Component({
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  showLoader = false;

  savePostFormGroup: FormGroup;
  areas: IArea[];
  homeTypes: IHomeType[];
  furnishTypes: IFurnishType[];
  errorMessage: any;
  rentInWords: string;
  depositInWords: string;

  isSaveButtonClicked = false;

  private areaCtrl: FormControl;
  private homeTypeCtrl: FormControl;
  private furnishTypeCtrl: FormControl;
  private sqFtCtrl: FormControl;
  private rentCtrl: FormControl;
  private depositCtrl: FormControl;
  private addressPremiseNameCtrl: FormControl;
  private addressStreetCtrl: FormControl;
  private contactPersonCtrl: FormControl;
  private contactPhoneCtrl: FormControl;

  constructor(private addPostService: AddPostService, private areaService: AreaService,
    private homeTypeService: HomeTypeService, private furnishTypesService: FurnishTypeService,
    private router: Router, private constHelper: ConstHelperService, private titleService: Title) { }

  ngOnInit() {

    this.titleService.setTitle('Add New Post | ' + this.constHelper.PageTitle);

    this.areaCtrl = new FormControl(this.addPostService.area, Validators.required);
    this.homeTypeCtrl = new FormControl(this.addPostService.homeType, Validators.required);
    this.furnishTypeCtrl = new FormControl(this.addPostService.furnishType, Validators.required);
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
      areaId: this.areaCtrl,
      homeTypeId: this.homeTypeCtrl,
      furnishTypeId: this.furnishTypeCtrl,
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

  getAreas(): void {
    this.areaService.getAreas().subscribe(
      areas => this.areas = areas,
      error => this.errorMessage = <any>error
    );
  }

  getHomeTypes(): void {
    this.homeTypeService.getHomeTypes().subscribe(
      homeTypes => this.homeTypes = homeTypes,
      error => this.errorMessage = <any>error
    );
  }

  getFurnishTypes(): void {
    this.furnishTypesService.getFurnishTypes().subscribe(
      furnishTypes => this.furnishTypes = furnishTypes,
      error => this.errorMessage = <any>error
    );
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

  isInvalidLocality(): boolean {
    return this.savePostFormGroup.controls.areaId.invalid && this.isSaveButtonClicked;
  }

  isInvalidHomeType(): boolean {
    return this.savePostFormGroup.controls.homeTypeId.invalid && this.isSaveButtonClicked;
  }

  isInvalidFurnishType(): boolean {
    return this.savePostFormGroup.controls.furnishTypeId.invalid && this.isSaveButtonClicked;
  }

  isInvalidArea(): boolean {
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
