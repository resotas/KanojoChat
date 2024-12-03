import React, { useState } from 'react';
import './App.css';
import { Configuration, OpenAIApi } from 'openai';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // OpenAI APIの設定
  const openai = new OpenAIApi(new Configuration({
	apiKey: 'YOUR_API_KEY',  // ご自身のAPIキーを挿入
  }));

  const handleSend = async () => {
	const userMessage = { text: input, sender: 'user' };
	setMessages([...messages, userMessage]);

	setInput('');

	const reply = await generateAIReply(input);
	setMessages((prev) => [...prev, { text: reply, sender: 'ai' }]);
  };

  const generateAIReply = async (userInput) => {
	try {
	  const response = await openai.createCompletion({
		model: 'tgpt-3.5-turbo',  // GPT-3モデルを使用
		prompt: `ユーザーの入力に基づいて、釘宮理恵風の返答をしてください。入力: "${userInput}"`,
		max_tokens: 150,
		temperature: 0.7,
	  });
	  return response.data.choices[0].text.trim();
	} catch (error) {
	  console.error("AI返答の生成に失敗しました:", error);
	  return "ごめんなさい、エラーが発生しました。";
	}
  };

  return (
	<div className="App">
	  <header className="App-header">
		<h1>釘宮理恵チャット</h1>
		<p>ツンデレ彼女です</p>
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