import * as axios from 'axios';
import _ from 'lodash';
import config from '../config';

export async function fetchApps(apiEndPoint, keyOfLocalStorage){
    try {
        const listFromStorage = JSON.parse(localStorage.getItem(keyOfLocalStorage));
        if(!_.isEmpty(listFromStorage)){
            return listFromStorage
        } else {
            const result = await axios.get(apiEndPoint);
            const ids = _.chain(result)
                .get('data.feed.entry', [])
                .map(item => _.get(item, 'id.attributes.im:id', ''))
                .value();
      
            const appsLookupResponse = await axios.get(config.LOOKUP_API, {
                params: {
                    id: ids.join(',')
                }
            });

            const output = _.chain(appsLookupResponse)
                .get('data.results', [])
                .map((item) => {
                    return {
                        appId: _.get(item, 'trackId', ''),
                        name: item.trackName,
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