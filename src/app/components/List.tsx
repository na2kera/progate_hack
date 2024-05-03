"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

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
}

const List = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [error, setError] = useState("");

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

  return (
    <div>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <ul className="flex flex-wrap justify-center">
          {forms.map((form, index) => (
            <li
              key={index}
              className="m-4 bg-white rounded-lg shadow-md max-w-sm"
            >
              <p className="text-lg font-bold">{form.name}</p>
              <img
                src={form.photo_url}
                alt={form.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4"></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;
