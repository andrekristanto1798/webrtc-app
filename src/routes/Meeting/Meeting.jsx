import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
// Actions
import { useParams } from 'react-router-dom';
import * as roomActions from '../../actions/room.action';
// Selectors
import {
  selectMessages,
  selectLocalVideos,
  selectPeerVideos,
} from '../../selectors/room.selector';

const MeetingContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: row;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 400px;
`;

const PeerVideoContainer = styled.div`
  flex: 1;
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const BottomVideoContainer = styled.div`
  width: 100%;
  height: 200px;
`;

const Video = styled.video`
  width: 400px;
  height: 200px;
`;

const Meeting = ({ messages, localVideos, peerVideos, joinRoom }) => {
  const params = useParams();
  const setVideoSrcObject = useCallback(video => ref => {
    const videoRef = ref;
    if (videoRef) {
      videoRef.srcObject = video;
    }
  });
  useEffect(() => {
    joinRoom(params.meetingId);
  }, []);
  return (
    <MeetingContainer>
      <VideoContainer>
        <PeerVideoContainer>
          {peerVideos.map(video => (
            <Video key={video.id} autoPlay ref={setVideoSrcObject(video)} />
          ))}
        </PeerVideoContainer>
        <BottomVideoContainer>
          {localVideos.map(video => (
            <Video muted key={video.id} autoPlay ref={setVideoSrcObject(video)} />
          ))}
        </BottomVideoContainer>
      </VideoContainer>
      <ChatContainer>{JSON.stringify(messages)}</ChatContainer>
    </MeetingContainer>
  );
};

Meeting.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  localVideos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  peerVideos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  // Actions
  joinRoom: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const messages = selectMessages(state);
  const localVideos = selectLocalVideos(state);
  const peerVideos = selectPeerVideos(state);
  return { messages, localVideos, peerVideos };
};

const actions = {
  joinRoom: roomActions.joinRoom,
};

export default connect(
  mapStateToProps,
  actions,
)(Meeting);
