import React, { useState, useCallback } from 'react';
// Actions
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();
  const [_roomId, _setRoomId] = useState('');
  const handleJoinRoom = useCallback(() => {
    history.push('/meeting/' + _roomId);
  });
  return (
    <div id="Home">
      <div id="room-input-container">
        <input
          type="text"
          value={_roomId}
          onChange={e => _setRoomId(e.target.value)}
        />
        <button type="button" onClick={handleJoinRoom}>
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
