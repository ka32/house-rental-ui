import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postStatusTypeDescription'
})
export class PostStatusTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 'Approved_Unverified_Hidden': return 'Hidden | Unverified';
      case 'Approved_Unverified_Visible': return 'Visible | Unverified';
      case 'Approved_Verified_Hidden': return 'Hidden | Verified';
      case 'Approved_Verified_Visible': return 'Visible | Verified';
      case 'Created_Awaiting_Approval': return 'Awaiting Moderation';
      default: return value.toString();
    }
  }

}
