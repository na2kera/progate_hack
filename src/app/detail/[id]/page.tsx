"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

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
      {forms
        .filter((form) => form.id === id)
        .map((form) => (
          <div
            style={{
              margin: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              maxWidth: "300px",
              textAlign: "center",
            }}
          >
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>{form.name}</p>
            <img
              src={form.photo_url}
              alt={form.name}
              style={{ width: "100%", height: "auto", borderRadius: "4px" }}
            />
          </div>
        ))}
    </>
  );
};

export default Page;
