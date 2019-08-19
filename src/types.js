// @flow
export type AppItemObj = {
    appId: string,
    name: string,
    category: string,
    avatar: string,
    summary: string,
    artistName: string,
    averageUserRating: number,
    userRatingCount: number
};

export type AppItemProps = AppItemObj & {
    index: number
}

export type RecommendedAppItemProps = AppItemObj & {}

export type RecommendedAppListProps = {
    title: string
}

export type SearchBarProps = {
    onChangeKeyword: ( keyword: string ) => void
}

export type AppLink = {
    attributes: {
        rel?: string,
        type?: string,
        href?: string
    }
}

export type AxiosResponseType<T> = {
    data: T,
    status: number
};

export type FreeAppEntry = {
    "im:name": {
        label: string
    },
    summary: {
        label: string
    },
    "im:price": {
        label: string,
        attributes: {
            amount: string,
            currency: string
        }
    },
    "im:contentType": {
        label: string,
        attributes: {
            term: string,
            label: string
        }
    },
    rights: {
        label: string
    },
    title: {
        label: string
    },
    link: AppLink,
    id: {
        label: string,
        attributes: {
            "im:id": string,
            "im:bundledId": string
        }
    },
    "im:artist": {
        label: string,
        attributes: {
            href: string
        }
    },
    category: {
        attributes: {
            "im:id": string,
            term: string,
            schedule: string,
            label: string
        }
    },
    "im:releaseDate": {
        label: string,
        attributes: {
            label: string
        }
    }
}

export type APIConfig = {
    DOMAIN: string,
    HUNDRED_FREE_APPS_API: string,
    RECOMMENDED_APPS_API: string,
    LOOKUP_API: string
}

export type FreeAppsResponse = {
    feed: {
        id: {
            label: string
        },
        icon: {
            label: string
        },
        author: {
            name: {
                label: string
            },
            url: {
                label: string
            }
        },
        entry: Array<FreeAppEntry>,
        updated: {
            label: string
        },
        title: {
            label: string
        },
        rights: {
            label: string
        },
        link: {
            attributes: AppLink
        }
    }
}

export type AppListState ={
    appListIds: Array<Array<string>>,
    filteredAppList: Array<AppItemObj>,
    hasMoreItems: boolean,
    isAppLoading: boolean,
    isAppSearching: boolean,
    appListToBeSearch: Array<AppItemObj>
}

export type RecommendedAppState ={
    data: Array<AppItemObj>
}

export type SiteConfigState ={
    isLoading: boolean,
}

export type RootState ={
    AppListReducer: AppListState,
    RecommendedAppReducer: RecommendedAppState,
    SiteConfigReducer: SiteConfigState
}

export type ShowNextTenItemsAction = { 
    type: "APP_LIST_GET_FIRST_TEN_APPS", 
    data: Array<AppItemObj>
}

export type GetFirstTenAppsAction = { 
    type: "APP_LIST_GET_FIRST_TEN_APPS", 
    data: Array<AppItemObj> 
}

export type SearchResultAction = { 
    type: "SEARCH_RESULT_BY_KEYWORD", 
    data: Array<AppItemObj> 
}

export type SearchResultLoadingAction = { 
    type: "APP_RESULT_LOADING"
}

export type SearchResultLoadedAction = { 
    type: "APP_RESULT_LOADED"
}
