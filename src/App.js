import React, { useState } from 'react';
import './App.css'; // スタイルシートをインポート
import { Configuration, OpenAIApi } from 'openai';

// OpenAI APIの設定
const openai = new OpenAIApi(
  new Configuration({
	apiKey: process.env.REACT_APP_OPENAI_API_KEY, // 環境変数からAPIキーを取得
  })
);

const App = () => {
  const [messages, setMessages] = useState([]); // メッセージの状態
  const [input, setInput] = useState(''); // ユーザー入力の状態

  // メッセージを送信する関数
  const handleSend = async () => {
	if (!input.trim()) return; // 空白の入力を無視

	// ユーザーのメッセージを追加
	const userMessage = { text: input, sender: 'user' };
	setMessages([...messages, userMessage]);
	setInput(''); // 入力フィールドをリセット

	// OpenAI APIを使ってAIの返答を生成
	const reply = await generateAIReply(input);
	const aiMessage = { text: reply, sender: 'ai' };

	// AIのメッセージを追加
	setMessages((prevMessages) => [...prevMessages, aiMessage]);
  };

  // OpenAI APIを使って返答を生成する関数
  const generateAIReply = async (userInput) => {
	try {
	  const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: `あなたは釘宮理恵風のツンデレキャラクターです。以下のユーザーの入力に基づいてツンデレ風の返答をしてください:\n\nユーザー: "${userInput}"\n\n返答:`,
		max_tokens: 100,
		temperature: 0.7,
	  });

	  return response.data.choices[0].text.trim(); // AIの返答を取得
	} catch (error) {
	  console.error('AI返答の生成に失敗しました:', error);
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
		  onChange={(e) => setInput(e.target.value)} // 入力を更新
		  placeholder="メッセージを入力..."
		/>
		<button onClick={handleSend}>送信</button>
	  </div>
	</div>
  );
};

export default App;