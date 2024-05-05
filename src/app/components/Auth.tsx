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

    <div className="relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-16 bg-orange-300"></div>
        <div className="mx-auto max-w-screen-md py-8 px-2 sm:px-4 md:max-w-screen-xl md:py-16 lg:py-24 md:px-4">
          <div className="md:pe-4 md:w-1/2 xl:pe-0 xl:w-5/12 mx-auto">

     <div className="mt-12">
     <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">

      <div className="p-4 pt-4 pb-4 sm:p-8">
      <div className="text-center mb-4 mt-4">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white mb-12">ご利用にはアカウントの作成が必要です</h1>
              <input
                type="email"
                placeholder="メール"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full py-3 px-4 mb-4 border-gray-200 rounded-lg text-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              />
              <input
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full py-3 px-4 mb-4 border-gray-200 rounded-lg text-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              />
              
              <div className="my-3 md:my-5 lg:my-10 xl:my-12 text-center">
                <p>「無料会員登録」をクリックすると、利用規約と<br className="hidden lg:inline"/>プライバシーポリシーに同意したものとみなします。</p>
              </div>
              
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="block w-full py-3 mt-4 bg-gray-300 text-gray-800 font-semibold rounded-lg text-lg hover:bg-gray-400 disabled:opacity-50 disabled:pointer-events-none"
              >
                ログイン
              </button>
              <button
                onClick={handleSignUp}
                disabled={isLoading}
                className="block w-full py-3 mt-4 bg-orange-400 text-gray-800 font-semibold rounded-lg text-lg hover:bg-orange-500 disabled:opacity-50 disabled:pointer-events-none"
              >
                無料会員登録
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

   /* <div>
      <div className="relative overflow-hidden">

  
      <div className="absolute top-0 left-0 w-full h-16 bg-orange-300"></div>

      <div className="mx-auto max-w-screen-md py-8 px-2 sm:px-4 md:max-w-screen-xl md:py-16 lg:py-24 md:px-4">
      <div className="md:pe-4 md:w-1/2 xl:pe-0 xl:w-5/12 mx-auto">
  
       <div className="mt-12">
       <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
  
  <div className="p-4 pt-4 pb-4 sm:p-7">
    <div className="text-center mb-4 mt-4">
      <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">ご利用にはアカウントの作成が必要です</h1>
    </div>

    <div className="mt-5">
  
      <form>
        <div className="grid gap-y-4">
       
      
          <div>
            <label htmlFor="email" className="block text-sm mb-2 dark:text-white">メール</label>
            <div className="relative">
              <input type="email" id="email" name="email" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="email-error"/>
              <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                </svg>
              </div>
            </div>
            <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
          </div>
      
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm mb-2 dark:text-white">パスワード</label>
            </div>

            <div className="relative">
              <input type="password" id="password" name="password" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="password-error"/>
              <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                </svg>
              </div>
            </div>
            <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
          </div>

        
          <a className="text-sm text-blue-600 decoration-2 hover:underline font-medium" href="../examples/html/recover-account.html">アカウントを持っていますか？</a>
          
          <div className="my-6 md:my-10 lg:my-14 xl:my-18 text-center">
           <p>「無料会員登録」をクリックすると、<br className="hidden lg:inline"/>利用規約とプライバシーポリシーに同意したものとみなします。</p>
          </div>

          
          <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50 disabled:pointer-events-none">無料会員登録</button>
        </div>
      </form>
      

    </div>
  </div>
</div>
      </div>
      </div>
      </div>
      </div>
    </div>
    */
    


  );
};

export default Auth;
