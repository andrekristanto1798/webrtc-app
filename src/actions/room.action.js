import SimpleWebRTC from 'simplewebrtc';

export const JOIN_ROOM = 'JOIN_ROOM';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const ADD_VIDEO = 'ADD_VIDEO';
export const REMOVE_VIDEO = 'REMOVE_VIDEO';
export const ADD_LOCAL_VIDEO = 'ADD_LOCAL_VIDEO';

export const addLocalVideo = stream => ({
  type: ADD_LOCAL_VIDEO,
  video: stream,
});

export const addMessage = message => ({
  type: ADD_MESSAGE,
  message,
});

export const addVideoPeer = video => ({
  type: ADD_VIDEO,
  video,
});

export const removeVideoPeer = video => ({
  type: REMOVE_VIDEO,
  video,
});

const createWebRtcInstance = dispatch => {
  const webrtc = new SimpleWebRTC({
    autoRequestMedia: true,
  });
  webrtc.on('localStream', stream => {
    console.log('localStream', stream);
    dispatch(addLocalVideo(stream));
  });
  webrtc.connection.on('message', data => {
    console.log('message', data);
    if (data.type === 'chat') {
      dispatch(addMessage(data));
    }
  });
  webrtc.on('videoAdded', (video, peer) => {
    console.log('videoAdded', video, peer);
    dispatch(addVideoPeer(peer.stream));
  });
  webrtc.on('videoRemoved', (video, peer) => {
    console.log('videoRemoved', video, peer);
    dispatch(removeVideoPeer(peer.stream));
  });
  return webrtc;
};

export const joinRoom = roomId => dispatch => {
  const webrtc = createWebRtcInstance(dispatch);
  webrtc.joinRoom(roomId);
  dispatch({
    type: JOIN_ROOM,
    roomId,
    webrtc,
  });
};
