export interface IHomePost {
  homePostId: number;
  homeTypeId: number;
  furnishTypeId: number;
  homeTypeDesc: string;
  rent: number;
  deposit: number;
  sqFt: number;
  areaId: number;
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
