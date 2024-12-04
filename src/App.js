import React, { useState } from 'react';
import './App.css';
import openai from 'openai'; // デフォルトエクスポートを使用

openai.apiKey = process.env.REACT_APP_OPENAI_API_KEY; // APIキーを設定

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // ユーザーの入力を送信する関数
  const handleSend = async () => {
	if (!input.trim()) return;

	const userMessage = { text: input, sender: 'user' };
	setMessages([...messages, userMessage]);

	setInput('');

	const reply = await generateAIReply(input);
	const aiMessage = { text: reply, sender: 'ai' };
	setMessages((prevMessages) => [...prevMessages, aiMessage]);
  };

  // OpenAI APIを使って返答を生成する関数
  const generateAIReply = async (userInput) => {
	try {
	  const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [
		  { role: 'system', content: 'あなたは釘宮理恵風のツンデレキャラクターです。' },
		  { role: 'user', content: userInput },
		],
		max_tokens: 150,
		temperature: 0.8,
	  });

	  return response.choices[0].message.content;
	} catch (error) {
	  console.error('APIリクエストに失敗しました:', error);
	  return 'ごめんなさい、エラーが発生しました。';
	}
  };

  return (
	<div className="App">
	  <header className="App-header">
		<h1>釘宮理恵チャット</h1>
		<p className="App-subtitle">ツンデレ彼女です</p>
	  </header>
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