const initialState = {
    isLoading: true
}

export default function SiteConfigReducer (state = initialState, action) {
    switch(action.type){
        case "SITE_CONFIG_LOADING":
            return {
                isLoading: true
            }
        case "SITE_CONFIG_LOADED":
            return {
                isLoading: false
            }
        default:
            return state;
    }
};