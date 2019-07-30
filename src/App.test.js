import App from "./App";

describe('App' ,()=> {
    it('should be rendered without crashing', () => {
        const wrapper = shallow(<App/>);
    });
});
