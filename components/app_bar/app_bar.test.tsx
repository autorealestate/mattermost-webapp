// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {mount} from 'enzyme';

import {PluginComponent} from 'types/store/plugins';
import {GlobalState} from 'types/store';

import {AppBinding} from 'mattermost-redux/types/apps';

import AppBar from './app_bar';

const mockDispatch = jest.fn();
let mockState: GlobalState;

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux') as typeof import('react-redux'),
    useSelector: (selector: (state: typeof mockState) => unknown) => selector(mockState),
    useDispatch: () => mockDispatch,
}));

describe('components/app_bar/app_bar', () => {
    beforeEach(() => {
        mockState = {
            views: {
                rhs: {
                    isSidebarOpen: true,
                    rhsState: 'plugin',
                    pluggableId: 'the_rhs_plugin_component',
                },
            },
            plugins: {
                components: {
                    ChannelHeaderButton: channelHeaderComponents,
                    RightHandSidebarComponent: rhsComponents,
                } as {[componentName: string]: PluginComponent[]},
            },
            entities: {
                apps: {
                    main: {
                        bindings: channelHeaderAppBindings,
                    } as {bindings: AppBinding[]},
                },
                general: {
                    config: {
                        FeatureFlagAppBarEnabled: 'true',
                    } as any,
                },
                channels: {
                    currentChannelId: 'currentchannel',
                    channels: {
                        currentchannel: {
                            id: 'currentchannel',
                        },
                    } as any,
                },
                preferences: {
                    myPreferences: {
                    },
                } as any,
            },
        } as GlobalState;
    });

    const channelHeaderComponents: PluginComponent[] = [
        {
            id: 'the_component_id',
            pluginId: 'playbooks',
            icon: 'fallback_component' as any,
            action: jest.fn(),
        },
    ];

    const rhsComponents: PluginComponent[] = [
        {
            id: 'the_rhs_plugin_component_id',
            pluginId: 'playbooks',
            icon: <div/>,
            action: jest.fn(),
        },
    ];

    const channelHeaderAppBindings: AppBinding[] = [
        {
            app_id: 'com.mattermost.zendesk',
            label: 'Create Subscription',
        },
    ];

    test('should match snapshot on mount', async () => {
        const wrapper = mount(
            <AppBar/>,
        );

        expect(wrapper).toMatchSnapshot();
    });
});
