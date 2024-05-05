"use client";

import { useState } from "react";
import { supabase } from "../utils/supabase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      alert("Login successful!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      alert("Sign up successful!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <div className="md:px-2 md:w-4/5 xl:px-0 xl:w-3/5 mx-auto">

  <div className="mt-6">
    <div className="mt-5 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-neutral-900 dark:border-neutral-700">

      <div className="p-3 pt-3 pb-3 sm:p-2">
        <div className="text-center mb-3 mt-3">
          <h1 className="block text-lg font-bold text-gray-800 dark:text-white mb-8">ログインすると投稿ができます</h1>
          <input
            type="email"
            placeholder="メール"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full py-2 px-3 mb-3 border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full py-2 px-3 mb-3 border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          />
        
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="block w-full py-2 mt-3 bg-gray-300 text-gray-800 font-semibold rounded-lg text-base hover:bg-gray-400 disabled:opacity-50 disabled:pointer-events-none"
          >
            ログイン
          </button>
          <button
            onClick={handleSignUp}
            disabled={isLoading}
            className="block w-full py-2 mt-3 bg-orange-400 text-gray-800 font-semibold rounded-lg text-base hover:bg-orange-500 disabled:opacity-50 disabled:pointer-events-none"
            style={{ lineHeight: "1.5", border: "2px solid orange", boxShadow: "0 2px 0 0 orange" }}
          >
            無料会員登録
          </button>
        </div>
      </div>
    </div>
  </div>
</div>


  );
};

export default Auth;
