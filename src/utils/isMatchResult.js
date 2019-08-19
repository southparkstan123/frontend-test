// @flow
import * as _ from "lodash";
import type { AppItemObj } from '../types';

export function isMatchResult(item: AppItemObj, keys: Array<string>, keyword: string): boolean{
    const hasKeys: boolean = _.every(keys, _.partial(_.has, item));

    if(hasKeys){
        let _result: Array<boolean> = [];

        _.forEach(keys, (key: string) => {
            const _value: string = item[key].toLowerCase();
            _result.push(_value.includes(keyword.toLowerCase()))
        });

        return _.some(_result, (ele: boolean) => ele === true);
    } else {
        return false;
    }
}