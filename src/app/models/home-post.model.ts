import { IArea } from './area.model';
import { IHomeType } from './home-type.model';

export interface IHomePost {
  homePostId: number;
  homeTypeId: number;
  homeType: IHomeType;
  rent: number;
  deposit: number;
  sqFt: number;
  areaId: number;
  area: IArea;
  addressPremiseName: string;
  addressStreet: string;
  contactPhone: string;
  contactPerson: string;
  postStatusTypeId: number;
  postOwnerUserId: number;
  postDateTime: string;
  postOwnerUser: any;
  postStatusType: string;
}
