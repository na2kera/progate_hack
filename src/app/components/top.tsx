"use client";
import { useState } from "react";
import { uploadStorage } from "./storage";
import { supabase } from "../utils/supabase";
import Link from "next/link";

export default function Example() {
  const [path, setPathName] = useState<string | undefined>();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [mail, setMail] = useState("");
  const [description, setDescription] = useState("");
  const [dogOrCat, setDogOrCat] = useState("");

  const handleUploadStorage = async (folder: FileList | null) => {
    if (!folder || !folder.length) return;
    const { path } = await uploadStorage({
      folder,
      bucketName: "photos",
    });
    const { data } = supabase.storage.from("photos").getPublicUrl(path);
    if (path) setPathName(data.publicUrl);
    console.log(path);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data: form, error } = await supabase.from("form").insert([
        {
          photo_url: path,
          name,
          age,
          gender,
          weight,
          height,
          type,
          location,
          mail,
          description,
          dogOrCat,
        },
      ]);
      if (error) throw error;
      alert("データの送信に成功しました！");
    } catch (error) {
      if (error instanceof Error) {
        alert(`送信エラー: ${error.message}`);
      } else {
        alert("予期せぬエラーが発生しました。");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-4 shadow-lg rounded-lg bg-white"
      >
        <label htmlFor="file-upload" className="block mb-4">
          <span className="text-gray-700">アップロードする</span>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              const fileList = e.target?.files;
              console.log(fileList);
              handleUploadStorage(fileList);
            }}
          />
          <img
            src={path}
            alt=""
            width="800"
            height="500"
            className="mt-2 rounded"
          />
        </label>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="説明"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-between space-x-4">
            <input
              type="number"
              placeholder="年齢"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-1/3 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="体重 (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-1/3 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="体高 (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-1/3 p-2 border rounded"
            />
          </div>
          <div className="flex justify-between space-x-4">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-1/2 p-2 border rounded"
            >
              <option value="">性別を選択</option>
              <option value="male">男の子</option>
              <option value="female">女の子</option>
              <option value="other">その他</option>
            </select>
            <select
              value={dogOrCat}
              onChange={(e) => setDogOrCat(e.target.value)}
              className="w-1/2 p-2 border rounded"
            >
              <option value="">犬か猫を選択</option>
              <option value="dog">犬</option>
              <option value="cat">猫</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="種類"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="所在地"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            placeholder="メールアドレス"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-[#DB856E] hover:bg-[#C76A55] w-full text-white font-bold py-2 px-4 rounded"
          >
            送信
          </button>
        </div>
      </form>
      <div className="fixed bottom-0 left-0 p-4">
        <Link
          href="/"
          className="bg-[#5B5B5B] hover:bg-[#4A4A4A] text-white font-bold py-2 px-4 rounded-full text-sm"
        >
          一覧に戻る
        </Link>
      </div>
    </>
  );
}
