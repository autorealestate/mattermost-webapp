// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import styled from 'styled-components';
import {FormattedMessage, useIntl} from 'react-intl';

import {Channel} from 'mattermost-redux/types/channels';
import Markdown from 'components/markdown';
import {UserProfile} from 'mattermost-redux/types/users';
import ProfilePicture from 'components/profile_picture';
import {Client4} from 'mattermost-redux/client';

import EditableArea from './components/EditableArea';
import LineLimiter from './components/linelimiter';

const Usernames = styled.p`
    font-family: Metropolis, sans-serif;
    font-size: 18px;
    line-height: 24px;
    color: rgb(var(--center-channel-text-rgb));
    font-weight: 600;
    margin: 0;
`;

const ProfilePictures = styled.div`
    margin-bottom: 10px;
`;

interface ProfilePictureContainerProps {
    position: number;
}

const ProfilePictureContainer = styled.div<ProfilePictureContainerProps>`
    display: inline-block;
    position: relative;
    left: ${(props) => props.position * -15}px;

    & img {
        border: 2px solid white;
    }
`;

const UsersArea = styled.div`
    margin-bottom: 12px;
    &.ChannelPurpose--is-dm {
        margin-bottom: 16px;
    }
`;

const ChannelHeader = styled.div`
    margin-bottom: 12px;
`;

const EmptyPlace = styled.div`
    padding: 0px;
    background: transparent;
    border: 0px;
    color: rgba(var(--center-channel-text-rgb), 0.64);
`;

interface Props {
    channel: Channel;
    gmUsers: UserProfile[];
    actions: {
        editChannelHeader: () => void;
    };
}

const AboutAreaGM = ({channel, gmUsers, actions}: Props) => {
    const {formatMessage} = useIntl();

    return (
        <>
            <UsersArea>
                <ProfilePictures>
                    {gmUsers.map((user, idx) => (
                        <ProfilePictureContainer
                            key={user.id}
                            position={idx}
                        >
                            <ProfilePicture
                                src={Client4.getProfilePictureUrl(user.id, user.last_picture_update)}
                                size='xl'
                            />
                        </ProfilePictureContainer>
                    ))}
                </ProfilePictures>
                <Usernames>{channel.display_name}</Usernames>
            </UsersArea>

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
        </>
    );
};

export default AboutAreaGM;
