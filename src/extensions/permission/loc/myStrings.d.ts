declare interface IPermissionCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'PermissionCommandSetStrings' {
  const strings: IPermissionCommandSetStrings;
  export = strings;
}
