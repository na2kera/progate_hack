"use client";
import Auth from "./components/Auth";
import List from "./components/List";

export default function Home() {
  return (
    <>
      <div className="bg-white h-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-black text-5xl font-light">里親募集</h1>
          </div>
        </div>
      </div>
      <Auth />
      <List />
    </>
  );
}
