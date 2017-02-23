declare var require: any;

var Gun = require('gun');

export var gun = Gun({}) as any as Gun;
export interface Gun {
    path(path: string): Gun;
    get(path: string): Gun;
    set(path: string, value: any): Gun;
    on(callback: (value: any) => void): Gun;
}
  