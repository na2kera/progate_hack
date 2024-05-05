import { v4 as uuidv4 } from "uuid";
import { supabase } from "../utils/supabase";

type UploadStorage = {
  folder: FileList;
  bucketName: string;
};

type UploadPathname = {
  path: string;
};

export const uploadStorage = async ({
  folder,
  bucketName,
}: UploadStorage): Promise<UploadPathname> => {
  const file = folder[0]; // 1ファイルアップロード
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    console.log("User UID:", user.id);
  } else {
    console.log("No user is logged in.");
    throw new Error("ユーザーがログインしていません。");
  }
  const userId = user.id; // ユーザーIDの取得

  const pathName = `characters/${uuidv4()}`; // パス名の設定
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(pathName, file, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) throw error;
  return {
    path: data?.path ?? null,
  };
};
