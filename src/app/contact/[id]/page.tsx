"use client"
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // Next.jsのnavigationからuseRouterとuseSearchParamsをインポートする
import { supabase } from "../../utils/supabase";
import { equal } from "assert";
import './style.css';

interface Form {
  mail: string;
}

type ContactFormProps = {
  id: number;
};

const ContactForm = ({ id }: ContactFormProps) => {

  const [name, setName] = useState("");
  const [fromemail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [searchParams, setSearchParams] = useSearchParams(); // useSearchParamsを使用してURLクエリパラメータを取得する
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let { data: form, error } = await supabase.from("form").select("mail").eq("id", id).single();
      
      if (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } else if (!form) {
        console.error("Error: form is null or undefined");
        setError("An unexpected error occurred.");
      } else {
        setEmail(form.mail);
      }
    };

    fetchData();
  }, []);

  const router = useRouter(); // useRouterを使用してルーターを取得する

  const handleGoBack = () => {
    router.back();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/contact-handler/${id}/route`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          fromemail: fromemail,
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
    <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", paddingLeft: "50px", paddingRight: "50px" }}>
      <div style={{paddingBottom: "30px"}}></div>
      <table className="rounded-[20px_20px_20px_20px]" style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td className="rounded-[20px_0_0_0]" style={{ width: "30%", backgroundColor: "#f5f5f5", paddingTop: "10px",}}>送信先:</td> {/* 背景色を薄いグレーに設定 */}
            <td style={{ width: "70%" , paddingLeft: "15px"}}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="送信先"
                required
                style={{ width: "100%" ,backgroundColor: "#FED7CB"}}
              />
            </td>
          </tr>
          <tr>
            <td style={{ width: "30%", backgroundColor: "#f5f5f5" }}>氏名:</td> {/* 背景色を薄いグレーに設定 */}
            <td style={{ width: "70%" }}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder=" 氏名を記入"
                required
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <td style={{ width: "30%", backgroundColor: "#f5f5f5" }}>メールアドレス:</td> {/* 背景色を薄いグレーに設定 */}
            <td style={{ width: "70%" }}>
              <input
                value={fromemail}
                onChange={(e) => setFromEmail(e.target.value)}
                type="text"
                placeholder=" メールアドレスを記入"
                required
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <td className="rounded-[0_0_0_20px]" style={{ width: "30%", backgroundColor: "#f5f5f5" }}>メッセージ:</td> {/* 背景色を薄いグレーに設定 */}
            <td style={{ width: "70%" }}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder=" メッセージを記入"
                rows={10}
                required
                style={{ width: "100%"}}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{paddingBottom: "30px"}}></div>
      <button type="submit" className="bg-[#DB856E] hover:bg-[#C76A55] text-white font-bold px-6 py-3 text-lg mt-4 rounded-lg text-sm " style={{ width: "30%", margin: "auto" }}>
        送信
      </button>
    </form>
  );
};

const Contact = ({ params }: { params: { id: string } }) => {
  const id: number = parseInt(params.id, 10);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ fontSize: "2rem" }}>コンタクト</h1>
      <ContactForm id={id} />
      <button onClick={() => window.history.back()} className="bg-[#EABCAE] hover:bg-[#FED7CB] text-white font-bold px-6 py-3 text-lg mt-4 rounded-lg text-sm" style={{ width: "26%" }}>
        戻る
      </button>
    </div>
  );
};

export default Contact;
