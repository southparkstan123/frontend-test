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

      const appsData = result.data.feed.entry;

      const appsResult = await Promise.all(
        appsData.map(async (app) => {
          const appId = _.get(app, 'id.attributes.im:id', '');
          const appInfo = await getRateAndRatingCountByUserId(appId);
          return {
            appId,
            name: _.get(app, 'im:name.label', ''),
            category: _.get(app, 'category.attributes.label', ''),
            images: _.get(app, 'im:image', []),
            summary: _.get(app, 'summary.label', []),
            artistName: _.get(appInfo, 'artistName', ''),
            averageUserRating: _.get(appInfo, 'averageUserRating', 0),
            userRatingCount: _.get(appInfo, 'userRatingCount', 0)
          }
        })
      );
      localStorage.setItem(keyOfLocalStorage, JSON.stringify(appsResult));
      return appsResult;
    }
  } catch (error) {
    return error;
  }
}

export async function getRateAndRatingCountByUserId(appId){
  try {
    const result = await axios.get(config.LOOKUP_API, {
      params: {
        id: appId
      }
    });
    return _.chain(result).get('data.results',[]).first().value();
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