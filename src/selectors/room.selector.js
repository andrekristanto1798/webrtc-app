import { createSelector } from 'reselect';

export const selectRoomId = createSelector(
  state => state.room.get('roomId'),
  roomId => roomId,
);

export const selectMessages = createSelector(
  state => state.room.get('messages'),
  messages => messages.toJS(),
);

export const selectLocalVideos = createSelector(
  state => state.room.get('localVideos'),
  videos => videos.toJS(),
);
export const selectPeerVideos = createSelector(
  state => state.room.get('peerVideos'),
  videos => videos.toJS(),
);
