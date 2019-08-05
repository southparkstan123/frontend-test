import SiteConfigReducer from '../SiteConfigReducer';
import { 
    SITE_CONFIG_LOADING,
    SITE_CONFIG_LOADED
} from '../../actionTypes';

xdescribe('SiteConfigReducer', () => {

    let initialState = {}

    beforeEach(() => {

        initialState = {
            isLoading: true
        }

    });

    it('should return initial state' , () => {
        const result = SiteConfigReducer(undefined, {});
        expect(result).toEqual({
            isLoading: true
        })
    });

    it('should return true' , () => {
        const result = SiteConfigReducer(initialState, { type: SITE_CONFIG_LOADING });
        expect(result).toEqual({
            isLoading: true
        })
    });

    it('should return false' , () => {
        const result = SiteConfigReducer(initialState, { type: SITE_CONFIG_LOADED });
        expect(result).toEqual({
            isLoading: false
        })
    });


});