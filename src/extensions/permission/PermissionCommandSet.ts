import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {sp, SiteGroups } from "@pnp/sp/presets/all";

import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'PermissionCommandSetStrings';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */

export interface IPermissionCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;


}

const LOG_SOURCE: string = 'PermissionCommandSet';

export default class PermissionCommandSet extends BaseListViewCommandSet<IPermissionCommandSetProperties> {
  private isInOwnersGroup: boolean = false;
  @override
  public async onInit(): Promise<void> {
  
    await super.onInit();
  
    await sp.setup({ spfxContext: this.context });
  
    const email: string = this.context.pageContext.user.email;
    const ownerGroup: any = sp.web.associatedOwnerGroup;
    const users: any = await ownerGroup.users.get();
  
    this.isInOwnersGroup = users.some((user: any) => user.Email === email);
  console.log( "hello",email,this.isInOwnersGroup)
    return Promise.resolve<void>();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const compareSecureCommand: Command = this.tryGetCommand('CMD_SECURE');

    if (compareSecureCommand) {
    
      compareSecureCommand.visible = this.isInOwnersGroup;
    }
    
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'CMD_SECURE':
        Dialog.alert("Shhhhhh! It's a secret...");
        break;
      default:
        throw new Error('Unknown command');
    }
  }
}
