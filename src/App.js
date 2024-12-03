import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
	const userMessage = { text: input, sender: 'user' };
	setMessages([...messages, userMessage]);

	setTimeout(() => {
	  const reply = generateReply(input);
	  setMessages((prev) => [...prev, { text: reply, sender: 'ai' }]);
	}, 500);

	setInput('');
  };

  const generateReply = (input) => {
	if (input.includes('バカ')) {
	  return 'バカバカバカ！もうあなたなんて知らない！死んじゃえー！';
	}
	return 'それで？どうしたの？';
  };

  return (
	<div className="App">
	  <div className="chat-window">
		{messages.map((msg, index) => (
		  <div key={index} className={`message ${msg.sender}`}>
			{msg.text}
		  </div>
		))}
	  </div>
	  <div className="input-area">
		<input
		  type="text"
		  value={input}
		  onChange={(e) => setInput(e.target.value)}
		  placeholder="メッセージを入力..."
		/>
		<button onClick={handleSend}>送信</button>
	  </div>
	</div>
  );
};

export default App;