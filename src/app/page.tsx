"use client";
import Link from "next/link";
import Auth from "./components/Auth";
import List from "./components/List";
import "./style.css";

export default function Home() {
  return (
    <>
      <div className="bg-white h-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-black text-5xl font-light">里親募集</h1>
          </div>
          <div className="absolute top-3 right-30 p-4">
            <Link
              href="/admin"
              className="bg-[#DB856E] hover:bg-[#C76A55] text-white font-bold py-2 px-4 rounded-lg text-sm" // text-sm を追加
            >
              投稿する
            </Link>
          </div>
        </div>
      </div>
      <Auth />
      <List />
      <footer id="footer">
        <div className="footer_inner">
          <ul>
            <li>
              <div id="copyright">
                Copyright &copy; <span></span>2024 progate_hack Hebi
              </div>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
