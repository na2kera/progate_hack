"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // next/routerの代替

const Contact = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/contact-handler", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
        }),
      });
      const jsonData = await response.json();
      alert("メッセージを送信しました");
    } catch (err) {
      alert("メッセージの送信が失敗しました");
    }
  };

  return (
    <div>
      <h1>コンタクト</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="氏名"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="メールアドレス"
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="メッセージ"
          rows={10}
          required
        ></textarea>
        <button type="submit" style={{ backgroundColor: "blue", color: "white" }}>
          送信
        </button>
      </form>
      <button onClick={handleGoBack} style={{ backgroundColor: "blue", color: "white" }}>
        戻る
      </button>
    </div>
  );
};

export default Contact;