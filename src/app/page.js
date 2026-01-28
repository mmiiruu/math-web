// app/page.js
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="home-page h-screen font-sans  flex-col flex justify-center items-center ">
      <h1 className="font-medium text-[150px]">คณิตคิดเร็</h1>
      <Link href="/level-selection">
        <button className=" w-[300px] h-[75px] text-4xl">เริ่ม</button>
      </Link>
    </div>
  );
}
