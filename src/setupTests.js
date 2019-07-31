import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import React from 'react';
import { shallow, mount } from "enzyme";
import { createSerializer } from "enzyme-to-json";

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

configure({ adapter: new Adapter() });