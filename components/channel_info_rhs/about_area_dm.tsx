// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import styled from 'styled-components';
import {FormattedMessage, useIntl} from 'react-intl';

import {Channel} from 'mattermost-redux/types/channels';
import Markdown from 'components/markdown';
import ProfilePicture from 'components/profile_picture';
import {Client4} from 'mattermost-redux/client';
import BotBadge from 'components/widgets/badges/bot_badge';
import GuestBadge from 'components/widgets/badges/guest_badge';

import {DMUser} from './rhs';
import LineLimiter from './components/linelimiter';
import EditableArea from './components/EditableArea';

const Username = styled.p`
    font-family: Metropolis, sans-serif;
    font-size: 18px;
    line-height: 24px;
    color: rgb(var(--center-channel-text-rgb));
    font-weight: 600;
    margin: 0;
`;

const ChannelHeader = styled.div`
    margin-bottom: 12px;
`;

const UserInfoContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 12px;
`;

const UserInfo = styled.div`
    margin-left: 12px;
    display: flex;
    flex-direction: column;
`;

const UsernameContainer = styled.div`
    display: flex;
`;

const UserPosition = styled.div`
    line-height: 20px;
`;

const EmptyPlace = styled.div`
    padding: 0px;
    background: transparent;
    border: 0px;
    color: rgba(var(--center-channel-text-rgb), 0.64);
`;

interface Props {
    channel: Channel;
    dmUser: DMUser;
    actions: {
        editChannelHeader: () => void;
    };
}

const AboutAreaDM = ({channel, dmUser, actions}: Props) => {
    const {formatMessage} = useIntl();

    return (
        <>
            <UserInfoContainer>
                <div>
                    <ProfilePicture
                        src={Client4.getProfilePictureUrl(dmUser.user.id, dmUser.user.last_picture_update)}
                        status={(!dmUser.user.is_bot && Boolean(dmUser.status)) ? dmUser.status : undefined}
                        size='xl'
                    />
                </div>
                <UserInfo>
                    <UsernameContainer>
                        <Username>{dmUser.user.username}</Username>
                        {dmUser.user.is_bot && <BotBadge/>}
                        {dmUser.is_guest && <GuestBadge/>}
                    </UsernameContainer>
                    <UserPosition>
                        <Markdown message={dmUser.user.is_bot ? dmUser.user.bot_description : dmUser.user.position}/>
                    </UserPosition>
                </UserInfo>
            </UserInfoContainer>

            {!dmUser.user.is_bot && (
                <ChannelHeader>
                    <EditableArea
                        content={channel.header ? (
                            <LineLimiter
                                maxLines={3}
                                lineHeight={20}
                                moreText={formatMessage({id: 'channel_info_rhs.about_area.channel_header.line_limiter.more', defaultMessage: '... more'})}
                                lessText={formatMessage({id: 'channel_info_rhs.about_area.channel_header.line_limiter.less', defaultMessage: 'less'})}
                            >
                                <Markdown message={channel.header}/>
                            </LineLimiter>
                        ) : (
                            <EmptyPlace>
                                <FormattedMessage
                                    id='channel_info_rhs.about_area.add_channel_header'
                                    defaultMessage='Add a channel header'
                                />
                            </EmptyPlace>
                        )}
                        editable={true}
                        onEdit={actions.editChannelHeader}
                    />
                </ChannelHeader>
            )}
        </>
    );
};

export default AboutAreaDM;
