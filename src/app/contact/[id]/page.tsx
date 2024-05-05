"use client"
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Contact = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/contact-handler/${id}`, {
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div>
      <h1>コンタクト</h1>
      <form onSubmit={handleSubmit}>
        <label>
          名前:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          メールアドレス:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          メッセージ:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default Contact;