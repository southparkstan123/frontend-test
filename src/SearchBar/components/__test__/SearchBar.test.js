import SearchBar from '../SearchBar';
import data from '../../../../mock/FreeAppList.json';
import _ from 'lodash';
import { StoreContext } from 'redux-react-hook';
import configureMockStore from 'redux-mock-store';

describe('<SearchBar />', () => {

    const mockStore = configureMockStore();
    let wrapper, store;

    beforeEach(() => {
        let list = _.chain(data).chunk(10).value();
        const firstTenItems = _.first(list);
        list.shift();

        const initialState = {
            AppListReducer: {
                filteredAppList: firstTenItems,
                appList: list,
                hasMoreItems: true
            }
        };

        const onChangeKeyword = jest.fn();

        store = mockStore(initialState);

        wrapper = mount(
            <StoreContext.Provider value={store}>
                <SearchBar />
            </StoreContext.Provider>
        );
    });

    it('should be rendered', () => {
        expect(wrapper.find("nav#search-bar")).toHaveLength(1);
    });

    it('the function "handleChangeInput" should be triggered when the keyword is on changed', () => {
        const onChangeKeyword = jest.fn();
        
        wrapper = mount(
            <StoreContext.Provider value={store}>
                <SearchBar onChangeKeyword={onChangeKeyword}/>
            </StoreContext.Provider>
        );
        
        wrapper.find('input#search-input').simulate('change', {target: {value: "T"}});
        
        expect(onChangeKeyword).toHaveBeenCalledWith("T");
    });

    it('the function "handleChangeInput" should be triggered when the keyword is on changed', () => {
        const onChangeKeyword = jest.fn();
        
        wrapper = mount(
            <StoreContext.Provider value={store}>
                <SearchBar onChangeKeyword={onChangeKeyword}/>
            </StoreContext.Provider>
        );
        
        wrapper.find('input#search-input').simulate('change', {target: {value: " Test "}});

        expect(onChangeKeyword).toHaveBeenCalledWith("Test");
    });
});