import React, { useState } from 'react';
import './App.css';
import { Configuration, OpenAIApi } from 'openai';  // OpenAI SDKをインポート

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // OpenAIの設定
  const openai = new OpenAIApi(new Configuration({
	apiKey: process.env.REACT_APP_OPENAI_API_KEY,  // 環境変数からAPIキーを取得
  }));

  // 送信ボタンが押されたときの処理
  const handleSend = async () => {
	const userMessage = { text: input, sender: 'user' };
	setMessages([...messages, userMessage]);  // ユーザーのメッセージを追加

	setInput('');  // 入力フィールドをリセット

	// OpenAI APIを呼び出して返答を生成
	const reply = await generateAIReply(input);
	setMessages((prev) => [...prev, { text: reply, sender: 'ai' }]);  // AIの返答を追加
  };

  // OpenAI APIを呼び出して返答を生成する関数
  const generateAIReply = async (userInput) => {
	try {
	  const response = await openai.createCompletion({
		model: 'text-davinci-003',  // 使用するGPT-3モデル
		prompt: `釘宮理恵風に、ツンデレで次の入力に対して返答をしてください: "${userInput}"`,
		max_tokens: 150,  // 返答の最大トークン数
		temperature: 0.7,  // 返答のランダム性を設定（0.0～1.0）
	  });

	  return response.data.choices[0].text.trim();  // 返答を返す
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
		  onChange={(e) => setInput(e.target.value)}  // ユーザー入力を取得
		  placeholder="メッセージを入力..."
		/>
		<button onClick={handleSend}>送信</button>
	  </div>
	</div>
  );
};

export default App;