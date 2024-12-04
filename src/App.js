import React, { useState } from 'react';
import './App.css'; // スタイルシートをインポート
import { Configuration, OpenAIApi } from 'openai'; // ライブラリから正しい形式でインポート

// OpenAI APIの設定
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, // 環境変数からAPIキーを取得
});
const openai = new OpenAIApi(configuration);

const App = () => {
  const [messages, setMessages] = useState([]); // チャット履歴を管理
  const [input, setInput] = useState(''); // ユーザー入力を管理

  // ユーザーの入力を送信する関数
  const handleSend = async () => {
	if (!input.trim()) return; // 空白入力を無視

	// ユーザーのメッセージを追加
	const userMessage = { text: input, sender: 'user' };
	setMessages([...messages, userMessage]);

	setInput(''); // 入力フィールドをクリア

	// OpenAI APIを使用してAIの返答を生成
	const reply = await generateAIReply(input);
	const aiMessage = { text: reply, sender: 'ai' };

	// チャット履歴にAIの返答を追加
	setMessages((prevMessages) => [...prevMessages, aiMessage]);
  };

  // OpenAI APIを使って返答を生成する関数
  const generateAIReply = async (userInput) => {
	try {
	  const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: `
		  あなたは釘宮理恵風のツンデレキャラクターです。
		  以下のユーザーの入力に基づいてツンデレ風の返答を生成してください:
		  
		  ユーザー: "${userInput}"
		  ツンデレ返答:
		`,
		max_tokens: 150, // 返答の最大トークン数
		temperature: 0.8, // ランダム性を設定（高めに設定して多様性を増加）
	  });

	  return response.data.choices[0].text.trim(); // 生成された返答を取得
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
		  onChange={(e) => setInput(e.target.value)} // 入力内容を更新
		  placeholder="メッセージを入力..."
		/>
		<button onClick={handleSend}>送信</button>
	  </div>
	</div>
  );
};

export default App;