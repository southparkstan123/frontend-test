import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import React from 'react';
import { shallow, mount } from "enzyme";
import { createSerializer } from "enzyme-to-json";

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};

global.React = React;
global.shallow = shallow;
global.mount = mount;
global.localStorage = localStorageMock;

configure({ adapter: new Adapter() });