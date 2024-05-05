"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import Link from "next/link";

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

const List = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [error, setError] = useState("");
  const [selectedTab, setSelectedTab] = useState("dog"); // 現在選択されているタブを追跡

  useEffect(() => {
    const fetchData = async () => {
      let { data: form, error } = await supabase.from("form").select("*");
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

  const filteredForms = forms.filter((form) => form.dogOrCat === selectedTab); // 選択されたタブに基づいてフィルタリング

  return (
    <div>
      <div className="tabs flex border-b w-3/5 mx-auto">
        <button
          className={`tab flex-1 text-center py-2 ${selectedTab === "dog" ? "text-black border-[#DB856E] border-b-4" : "text-gray-500"}`}
          onClick={() => setSelectedTab("dog")}
        >
          犬
        </button>
        <button
          className={`tab flex-1 text-center py-2 ${selectedTab === "cat" ? "text-black border-[#DB856E] border-b-4" : "text-gray-500"}`}
          onClick={() => setSelectedTab("cat")}
        >
          猫
        </button>
      </div>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <ul className="flex flex-wrap justify-center">
          {filteredForms.map((form, index) => (
            <Link href={`/detail/${form.id}`} key={index}>
              <li className="m-4 bg-white rounded-lg shadow-md max-w-sm cursor-pointer">
                <p className="text-lg font-bold">{form.name}</p>
                <img
                  src={form.photo_url}
                  alt={form.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4"></div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;
