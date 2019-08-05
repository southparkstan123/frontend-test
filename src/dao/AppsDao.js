// @flow
import type { FreeAppsResponse, FreeAppEntry, AppItemObj } from '../types';
import * as axios from 'axios';
import _ from 'lodash';
import config from '../config';
import axiosJsonpAdapter from "axios-jsonp";

export async function fetchApps(apiEndPoint: string) {
    try {
        
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

        const output: Array<AppItemObj> = _.chain(appsLookupResponse)
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

        return output;
        
    } catch (error) {
        return error;
    }
}

export async function fetchAllData() {
    try {
        const hunderAppsId: Array<Array<string>> = await fetch100AppsId();
        const firstTenAppsIds: Array<string> = _.first(hunderAppsId);

        const recommendedAppsIds: Array<string> = await fetchRecommendedAppsIds()

        const allData: Array<Array<AppItemObj>> = await Promise.all([
            fetchAppsData(firstTenAppsIds), 
            fetchAppsData(recommendedAppsIds)
        ]);

        return {
            freeAppsResult: allData[0],
            recomendedAppsResult: allData[1]
        }
    } catch (error) {
        return error;
    }
}

export async function fetch100AppsId() {
    const result: FreeAppsResponse = await axios({
        url: config.HUNDRED_FREE_APPS_API,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const ids: Array<Array<string>> = _.chain(result)
        .get('data.feed.entry', [])
        .map(item => _.get(item, 'id.attributes.im:id', ''))
        .chunk(10)
        .value();
    
    return ids;
}

export async function fetchAppsData(ids: Array<string>){
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

    const output: Array<AppItemObj> = _.chain(appsLookupResponse)
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

    return output;
}

export async function fetchRecommendedAppsIds() {
    try {
        
        const result: FreeAppsResponse = await axios({
            url: config.RECOMMENDED_APPS_API,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const ids: Array<string> = _.chain(result)
            .get('data.feed.entry', [])
            .map(item => _.get(item, 'id.attributes.im:id', ''))
            .value();
        return ids;
        
    } catch (error) {
        return error;
    }
}
