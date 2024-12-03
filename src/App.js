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
	if (input.includes("バカ")) {
	  return [
		"バカバカバカ！もう知らない！",
		"ほんとにバカね…どうしようもないわ！",
		"バカなこと言わないでよ、バカ！",
		"またバカって言わせるなんて最低！"
	  ][Math.floor(Math.random() * 4)];
	} else if (input.includes("好き")) {
	  return [
		"そ、そんなの…私だって…好きに決まってるでしょ！",
		"えっ…も、もう！言わせるなバカ！",
		"好きって…そ、そういうこと言うのズルいわよ！",
		"ちょっと…私の心臓がバクバクしてるじゃない…！"
	  ][Math.floor(Math.random() * 4)];
	} else if (input.includes("寂しい")) {
	  return [
		"寂しいの？私がそばにいてあげるから。",
		"寂しがり屋ね…ちょっとくらい我慢しなさい！",
		"私だって…少しくらい寂しいと思うことあるけど！",
		"もう！そんなこと言われたら離れられないじゃない…！"
	  ][Math.floor(Math.random() * 4)];
	} else if (input.includes("疲れた")) {
	  return [
		"疲れたなら休みなさいよ！本当にもう…",
		"お疲れ様…頑張ったわね。褒めてあげる！",
		"無理するんじゃないわよ！バカ！",
		"疲れたなら私が少しだけ癒してあげるわよ。"
	  ][Math.floor(Math.random() * 4)];
	} else if (input.includes("助けて")) {
	  return [
		"しょうがないわね…助けてあげるから感謝しなさいよ！",
		"助けてって…私を頼るのもいい加減にしなさい！",
		"まあ、助けるくらいならしてあげるけど…バカ！",
		"次は自分で何とかしなさいよ！"
	  ][Math.floor(Math.random() * 4)];
	} else if (input.includes("おはよう")) {
	  return [
		"おはよう…って、寝坊したの？",
		"おはよう！今日も一緒に頑張るわよ！",
		"お、おはよう…ちゃんと準備してるの？",
		"おはよう。早起きなんて珍しいじゃないの！"
	  ][Math.floor(Math.random() * 4)];
	} else if (input.includes("おやすみ")) {
	  return [
		"おやすみなさい。ちゃんと明日早く起きるのよ！",
		"おやすみ。いい夢見なさいよ…",
		"おやすみ…でもちゃんと布団かけなさいね！",
		"おやすみ。夜更かししてるんじゃないわよ！"
	  ][Math.floor(Math.random() * 4)];
	} else if (input.includes("怖い")) {
	  return [
		"怖がらないで…私がそばにいるから。",
		"怖いなんて…そんなの気のせいよ！",
		"怖がるくらいなら私を呼びなさい！",
		"も、もしかして私も怖い…なんてね。"
	  ][Math.floor(Math.random() * 4)];
	} else if (input.includes("感謝")) {
	  return [
		"感謝されることなんてしてないわよ…でも嬉しいわ。",
		"ふんっ、感謝なんていらないんだからね！",
		"まあ…私がいて助かったでしょ？",
		"感謝するなら…何かお礼ちょうだい！"
	  ][Math.floor(Math.random() * 4)];
	} else if (input.includes("頑張って")) {
	  return [
		"あんたがそう言うなら頑張れる気がするわ。",
		"頑張ってって…言うのは簡単ね。",
		"仕方ないわね…全力でやってあげるわよ！",
		"応援されたら…少しだけやる気出るかも。"
	  ][Math.floor(Math.random() * 4)];
	} else if (input.includes("褒めて")) {
	  return [
		"あんたが褒められるなんて…珍しいじゃない！",
		"しょうがないわね、褒めてあげるわよ。頑張ったわね。",
		"えらいえらい、これで満足？",
		"ちょっとはやるじゃない！調子に乗らないでよ！"
	  ][Math.floor(Math.random() * 4)];
	} else if (input.includes("泣きたい")) {
	  return [
		"泣きたいときは泣きなさい…私がそばにいるから。",
		"泣きたいなら…泣いてもいいのよ。",
		"もう…バカなんだから。泣いてスッキリしなさい。",
		"泣きたい気持ちはわかるけど…強くなりなさい！"
	  ][Math.floor(Math.random() * 4)];
	}
  
	// デフォルト応答
	return [
	  "それで？何が言いたいの？",
	  "もっとちゃんと話しなさいよ！",
	  "私はいつでも聞いてあげるけど…",
	  "話したいことあるなら早く言いなさいよ！"
	][Math.floor(Math.random() * 4)];
  };  return (
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