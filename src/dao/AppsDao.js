// @flow
import type { FreeAppsResponse, FreeAppEntry, AppItemObj } from '../types';
import axios from 'axios';
import _ from 'lodash';
import config from '../config';
import axiosJsonpAdapter from "axios-jsonp";
import { isMatchResult } from "../utils/isMatchResult";

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

export async function searchApp(keyword: string) {
    try {
        const hunderAppsIds: Array<Array<string>> = await fetch100AppsId();
        const recommendedAppsIds: Array<string> = await fetchRecommendedAppsIds();
        const hunderAppsItems: Array<AppItemObj> = await fetchAppsData(_.flatten(_.concat(recommendedAppsIds, hunderAppsIds)));
        const result: Array<AppItemObj> = hunderAppsItems.filter((item: AppItemObj) => isMatchResult(item, ['name', 'category', 'summary', 'artistName'], keyword));
        return result;
    } catch (error) {
        return error;
    }
}

export async function fetchAllData() {
    try {
        const hunderAppsIds: Array<Array<string>> = await fetch100AppsId();
        const firstTenAppsIds: Array<string> = _.first(hunderAppsIds);

        const recommendedAppsIds: Array<string> = await fetchRecommendedAppsIds()

        const data: Array<Array<AppItemObj>> = await Promise.all([
            fetchAppsData(firstTenAppsIds), 
            fetchAppsData(recommendedAppsIds)
        ]);
        return {
            hunderAppsIds,
            first10FreeAppsResult: data[0],
            recomendedAppsResult: data[1]
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
                avatar: {
                    large: _.get(item, 'artworkUrl100', ''),
                    small: _.get(item, 'artworkUrl60', ''),
                },
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
            .map((item: string) => _.get(item, 'id.attributes.im:id', ''))
            .value();
        return ids;
        
    } catch (error) {
        return error;
    }
}
