import { BaseListViewCommandSet, IListViewCommandSetListViewUpdatedParameters, IListViewCommandSetExecuteEventParameters } from '@microsoft/sp-listview-extensibility';
/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IPermissionCommandSetProperties {
    sampleTextOne: string;
    sampleTextTwo: string;
}
export default class PermissionCommandSet extends BaseListViewCommandSet<IPermissionCommandSetProperties> {
    private isInOwnersGroup;
    onInit(): Promise<void>;
    onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void;
    onExecute(event: IListViewCommandSetExecuteEventParameters): void;
}
//# sourceMappingURL=PermissionCommandSet.d.ts.map