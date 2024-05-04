"use client"
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // Next.jsのnavigationからuseRouterとuseSearchParamsをインポートする

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams, setSearchParams] = useSearchParams(); // useSearchParamsを使用してURLクエリパラメータを取得する

  const router = useRouter(); // useRouterを使用してルーターを取得する

  const handleGoBack = () => {
    router.back();
  };

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
    <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ width: "30%", backgroundColor: "#f5f5f5" }}>氏名:</td> {/* 背景色を薄いグレーに設定 */}
            <td style={{ width: "70%" }}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="氏名を記入"
                required
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <td style={{ width: "30%", backgroundColor: "#f5f5f5" }}>メールアドレス:</td> {/* 背景色を薄いグレーに設定 */}
            <td style={{ width: "70%" }}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="メールアドレスを記入"
                required
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <td style={{ width: "30%", backgroundColor: "#f5f5f5" }}>メッセージ:</td> {/* 背景色を薄いグレーに設定 */}
            <td style={{ width: "70%" }}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="メッセージを記入"
                rows={10}
                required
                style={{ width: "100%" }}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit" className="bg-gray-700 text-white px-6 py-3 rounded-lg text-lg mt-4" style={{ width: "50%", margin: "auto" }}>
        送信
      </button>
    </form>
  );
};

const Contact = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ fontSize: "2rem" }}>コンタクト</h1>
      <ContactForm />
      <button onClick={() => window.history.back()} className="bg-gray-700 text-white px-6 py-3 rounded-lg text-lg mt-4" style={{ width: "50%" }}>
        戻る
      </button>
    </div>
  );
};

export default Contact;