import React from 'react';
import { mount } from "enzyme";

import Icon from '../Icon';

describe('<RecommendedAppList />', () => {
    it('should be rendered as circle if isAppListIcon is true and even index', () => {

        const iconProps = {
            isAppListIcon: true,
            urlLinks: {
                small: "https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/c4/09/93/c409934b-94bf-8761-6892-731c9938bd0e/source/60x60bb.jpg",
                large: "https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/c4/09/93/c409934b-94bf-8761-6892-731c9938bd0e/source/100x100bb.jpg"
            },
            alt: "Test1",
            index: 0
        }

        const wrapper = mount(
            <Icon {...iconProps}/>
        );

        expect(wrapper.find('img.sm.icon-rounded-circle').find({alt: "Test1"})).toHaveLength(1);
        expect(wrapper.find('img.lg.icon-rounded-circle').find({alt: "Test1"})).toHaveLength(1);
    });

    it('should be rendered as rounded if isAppListIcon is true and odd index', () => {

        const iconProps = {
            isAppListIcon: true,
            urlLinks: {
                small: "https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/c4/09/93/c409934b-94bf-8761-6892-731c9938bd0e/source/60x60bb.jpg",
                large: "https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/c4/09/93/c409934b-94bf-8761-6892-731c9938bd0e/source/100x100bb.jpg"
            },
            alt: "Test2",
            index: 1
        }

        const wrapper = mount(
            <Icon {...iconProps}/>
        );

        expect(wrapper.find('img.sm.icon-rounded').find({alt: "Test2"})).toHaveLength(1);
        expect(wrapper.find('img.lg.icon-rounded').find({alt: "Test2"})).toHaveLength(1);
    });

    it('should be rendered as rounded if isAppListIcon is false and even index', () => {

        const iconProps = {
            isAppListIcon: false,
            urlLinks: {
                small: "https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/c4/09/93/c409934b-94bf-8761-6892-731c9938bd0e/source/60x60bb.jpg",
                large: "https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/c4/09/93/c409934b-94bf-8761-6892-731c9938bd0e/source/100x100bb.jpg"
            },
            alt: "Test3",
            index: 0
        }

        const wrapper = mount(
            <Icon {...iconProps}/>
        );

        expect(wrapper.find('img.sm.icon-rounded').find({alt: "Test3"})).toHaveLength(1);
        expect(wrapper.find('img.lg.icon-rounded').find({alt: "Test3"})).toHaveLength(1);
    });

    it('should be rendered as rounded if isAppListIcon is false and odd index', () => {

        const iconProps = {
            isAppListIcon: false,
            urlLinks: {
                small: "https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/c4/09/93/c409934b-94bf-8761-6892-731c9938bd0e/source/60x60bb.jpg",
                large: "https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/c4/09/93/c409934b-94bf-8761-6892-731c9938bd0e/source/100x100bb.jpg"
            },
            alt: "Test4",
            index: 1
        }

        const wrapper = mount(
            <Icon {...iconProps}/>
        );

        expect(wrapper.find('img.sm.icon-rounded').find({alt: "Test4"})).toHaveLength(1);
        expect(wrapper.find('img.lg.icon-rounded').find({alt: "Test4"})).toHaveLength(1);
    });
});