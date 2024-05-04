"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import Head from "next/head";

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
}

const Page = ({ params }: { params: { id: string } }) => {
  // const [item, setItem] = useState<Form>(null);
  console.log(params);
  console.log(params.id);
  const id = parseInt(params.id, 10);
  console.log(id);
  const [forms, setForms] = useState<Form[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let { data: form, error } = await supabase.from("form").select("*");

      console.log(form);
      if (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } else {
        console.log("Fetched data:", form);
        setForms(form || []);
      }
    };

    fetchData();
  }, []);

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
          //   <div
          //     style={{
          //       margin: "20px",
          //       border: "1px solid #ccc",
          //       borderRadius: "8px",
          //       padding: "10px",
          //       maxWidth: "300px",
          //       textAlign: "center",
          //     }}
          //   >
          //     <p style={{ fontWeight: "bold", fontSize: "18px" }}>{form.name}</p>
          //     <img
          //       src={form.photo_url}
          //       alt={form.name}
          //       style={{ width: "100%", height: "auto", borderRadius: "4px" }}
          //     />
          //   </div>
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
                <p className="mb-7">人懐っこく、元気なわんちゃんです！</p>

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

                <a
                  className="contact-btn bg-gray-700 text-white block text-center py-4 mt-7"
                  href="#"
                >
                  CONTACT
                </a>
              </div>
            </div>
          </main>
        ))}
      <footer id="footer" className="py-2.5">
        <nav className="wrapper">
          <ul className="menu">
            <li>
              <a href="/" className="text-center text-xs">
                back to main
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
};

export default Page;
