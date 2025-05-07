import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../socket.js';
import { fetchMessages, addMessage } from '../redux/messageSlice';

const Chat = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messages);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchMessages());

    socket.on('newMessage', (msg) => {
      dispatch(addMessage(msg));
    });
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = { text: message, sender: user.username };
      socket.emit('sendMessage', newMessage);
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
