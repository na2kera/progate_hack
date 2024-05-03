"use client";
import { useState } from "react";
import { uploadStorage } from "./storage";
import { supabase } from "../utils/supabase";

export default function Example() {
  const [path, setPathName] = useState<string | undefined>();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="file-upload">
        <span>アップロードする</span>
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
        <img src={path} alt="" width="800" height="500" />
      </label>
      <input
        type="text"
        placeholder="名前"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="年齢"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">性別を選択</option>
        <option value="male">男の子</option>
        <option value="female">女の子</option>
        <option value="other">その他</option>
      </select>
      <input
        type="number"
        placeholder="体重 (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <input
        type="number"
        placeholder="身長 (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <input
        type="text"
        placeholder="種類"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <input
        type="text"
        placeholder="所在地"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit">送信</button>
    </form>
  );
}
