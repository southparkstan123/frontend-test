// @flow
import type { FreeAppsResponse, FreeAppEntry } from '../types';
import * as axios from 'axios';
import _ from 'lodash';
import config from '../config';
import axiosJsonpAdapter from "axios-jsonp";

export async function fetchApps(apiEndPoint: string, keyOfLocalStorage: string) {
    try {
        const listFromStorage: any = localStorage.getItem(keyOfLocalStorage);

        if(!_.isEmpty(JSON.parse(listFromStorage))){
            return JSON.parse(listFromStorage)
        } else {
            const result: FreeAppsResponse = await axios({
                url: apiEndPoint,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            
            const ids: Array<string> = _.chain(result)
                .get('data.feed.entry', [])
                .map(item => _.get(item, 'id.attributes.im:id', ''))
                .value();
      
            const appsLookupResponse: FreeAppEntry = await axios({
                url: config.LOOKUP_API,
                adapter: axiosJsonpAdapter,
                callbackParamName: 'fn',
                params: {
                    id: ids.join(',')
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const output = _.chain(appsLookupResponse)
                .get('data.results', [])
                .map((item) => {
                    return {
                        appId: _.get(item, 'trackId', ''),
                        name: _.get(item, 'trackName', ''),
                        category: _.chain(item).get('genres', []).first().value(),
                        avatar: _.get(item, 'artworkUrl100', ''),
                        summary: _.get(item, 'description', ''),
                        artistName: _.get(item, 'artistName', ''),
                        averageUserRating: _.get(item, 'averageUserRating', 0),
                        userRatingCount: _.get(item, 'userRatingCount', 0)
                    }
                })
                .value();

            localStorage.setItem(keyOfLocalStorage, JSON.stringify(output));

            return output;
        }
    } catch (error) {
        return error;
    }
}

export async function fetchAllData() {
    try {
        const allData = await Promise.all([
            fetchApps(config.HUNDRED_FREE_APPS_API, "appList"), 
            fetchApps(config.RECOMMENDED_APPS_API, "recommendedAppList")
        ]);

        return {
            freeAppsResult: allData[0],
            recomendedAppsResult: allData[1]
        }
    } catch (error) {
        return error;
    }
}