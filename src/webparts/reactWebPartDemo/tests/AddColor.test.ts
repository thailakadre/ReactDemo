// /// <reference types='jest' />

// import * as React from 'react';
// import { configure, mount, ReactWrapper } from 'enzyme';
// import * as Adapter from 'enzyme-adapter-react-16';

// import { IAddColorProps } from '../components/AddColor/IAddColorProps';
// import { IAddColorState } from '../components/AddColor/IAddColorState';
// import { AddColor } from '../components/AddColor/AddColor';

// configure({ adapter: new Adapter() });


// describe("<ReactWebPartDemo /> Test Suite", () => {
//     let componentWrapper: ReactWrapper<IAddColorProps, IAddColorState>;

//     beforeEach(() => {
//         componentWrapper = mount(React.createElement(AddColor, {
//             currentSiteUrl: 'test',
//             onAddColor: null,
//             spHttpClient: null
//         }));
//     });

//     afterEach(() => {
//         componentWrapper.unmount();
//     });

//     it('<ReactWebPartDemo /> should render something', () => {
//         expect(componentWrapper.find('div')).not.toBeNull();
//     });

//     it('<ReactWebPartDemo /> should render component', () => {
//         const component: AddColor = componentWrapper.instance() as AddColor;
//         expect(component).not.toBeNull();
//     });
// });