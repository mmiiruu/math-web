// app/level-selection/page.jsx
"use client";

import Link from "next/link";

export default function LevelSelection() {
  return (
    <div className="h-screen font-sans  flex-col flex justify-center gap-[50px] items-center">
      <h1 className="text-[100px]">เลือกเลเวล</h1>
      <Link href={{ pathname: "/calculation", query: { level: "1" } }}>
        <button className="w-[300px] h-[75px] text-2xl">
          เลเวล 1 (บวก และ ลบ)
        </button>
      </Link>
      <Link href={{ pathname: "/calculation", query: { level: "2" } }}>
        <button className="w-[300px] h-[75px] text-2xl">
          เลเวล 2 (คูณ และ หาร)
        </button>
      </Link>
    </div>
  );
}
