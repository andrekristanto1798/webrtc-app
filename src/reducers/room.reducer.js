import { fromJS } from 'immutable';
import {
  JOIN_ROOM,
  ADD_MESSAGE,
  ADD_VIDEO,
  ADD_LOCAL_VIDEO,
  REMOVE_VIDEO,
} from '../actions/room.action';

const initialState = fromJS({
  roomId: '',
  messages: [],
  localVideos: [],
  peerVideos: [],
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case JOIN_ROOM:
    return state.set('roomId', action.roomId);
  case ADD_MESSAGE:
    return state.update('messages', messages =>
      messages.push(action.message),
    );
  case ADD_VIDEO:
    return state.update('peerVideos', videos => videos.push(action.video));
  case REMOVE_VIDEO: {
    const index = state
      .get('peerVideos')
      .findIndex(video => video.id === action.video.id);
    return state.update('peerVideos', videos => videos.remove(index));
  }
  case ADD_LOCAL_VIDEO:
    return state.update('localVideos', videos => videos.push(action.video));
  default:
    return state;
  }
}
