"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import Head from "next/head";
import Link from "next/link"; // added by tina
import './detail_style.css';

interface Form {
  id: number;
  created_at: string;
  photo_url: string;
  name: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  type: string;
  location: string;
  mail: string;
  description: string;
  dogOrCat: string;
}

const Page = ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id, 10);
  const [forms, setForms] = useState<Form[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let { data: form, error } = await supabase.from("form").select("*");
      if (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } else {
        setForms(form || []);
      }
    };

    fetchData();
  }, []);

 const handleContactClick: React.MouseEventHandler<HTMLButtonElement> = (event, formId) => {
  window.location.href = `/contact/${formId}`;
};

  return (
    <>
      <Head>
        <title>里親募集</title>
        <meta
          name="description"
          content="保護されたわんちゃん・ねこちゃんの里親を探しています。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/style.css" />
      </Head>
      {forms
        .filter((form) => form.id === id)
        .map((form) => (
          <main className="flex justify-center mt-10">
            <div
              id="item"
              className="flex justify-between mb-24 max-w-4xl w-full"
            >
              <div className="item-image w-2/5">
                <img
                  src={form.photo_url}
                  alt={form.name}
                  className="w-full h-auto"
                />
              </div>
              <div className="item-info flex flex-col p-4">
                <h1 className="item-title border-t border-b border-gray-300 py-2 mb-5 text-lg font-bold flex items-center">
                  {`${form.type} ${form.gender} 推定${form.age}歳`}
                </h1>
                <p className="mb-7">{`${form.description}`}</p>

                <table className="details w-full">
                  <tbody>
                    <tr>
                      <th className="border p-5 font-bold bg-gray-200">年齢</th>
                      <td className="border p-5">{`推定${form.age}歳`}</td>
                    </tr>
                    <tr>
                      <th className="border p-5 font-bold bg-gray-200">性別</th>
                      <td className="border p-5">{`${form.gender}`}</td>
                    </tr>
                    <tr>
                      <th className="border p-5 font-bold bg-gray-200">体重</th>
                      <td className="border p-5">{`${form.weight}kg`}</td>
                    </tr>
                    <tr>
                      <th className="border p-5 font-bold bg-gray-200">体高</th>
                      <td className="border p-5">{`${form.height}cm`}</td>
                    </tr>
                    <tr>
                      <th className="border p-5 font-bold bg-gray-200">犬種</th>
                      <td className="border p-5">{`${form.type}`}</td>
                    </tr>
                    <tr>
                      <th className="border p-5 font-bold bg-gray-200">
                        所在地
                      </th>
                      <td className="border p-5">{`${form.location}`}</td>
                    </tr>
                  </tbody>
                </table>

                {/* CONTACTボタン */}
                <button
                  className="contact-btn bg-gray-700 text-white block text-center py-4 mt-7"
                  onClick={handleContactClick}
                >
                  CONTACT
                </button>
              </div>
            </div>
          </main>
        ))}
      <footer id="footer" className="py-2.5">
        <nav className="wrapper">
          <ul className="menu">
            <li>
              <Link href="/">
              <button className="contact-btn bg-gray-700 text-white block text-center py-4 mt-10" style={{ width: "150%" }}>
                  戻る
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
};

export default Page;