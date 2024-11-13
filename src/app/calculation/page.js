"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function CalculationPage() {
  const searchParams = useSearchParams();
  const level = searchParams.get("level"); 
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (level) {
      setQuestion(generateQuestion(level, currentQuestion));
    }
  }, [level, currentQuestion]);

  const handleSubmitAnswer = () => {
    if (parseInt(userAnswer) === question.answer) {
      setScore(score + 1);
    }

    if (currentQuestion < 10) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer("");
    } else {
      setIsComplete(true);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmitAnswer();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-[200px]">
      <button
        className="fixed left-10 top-10 px-4 py-2 bg-red-400 rounded hover:bg-red-600"
        onClick={() => router.back()}
      >
        ย้อนกลับ
      </button>{" "}
      {/* ปุ่มย้อนกลับ */}
      <h1 className="text-3xl lg:text-5xl font-bold text-center">
        คำถามคณิตคิดเร็ว - เลเวล {level}
      </h1>
      {isComplete ? (
        <div className="pt-[100px] text-4xl flex flex-col items-center gap-4">
          <p>คุณทำครบ 10 ข้อแล้ว!</p>
          <p className="text-green-600 font-bold">
            คะแนนของคุณคือ: {score} / 10
          </p>
        </div>
      ) : (
        <div className="pt-6 text-2xl lg:text-3xl flex flex-col items-center gap-2">
          <p>ข้อที่: {currentQuestion} / 10</p>
          <p className="scoreboard">คะแนน: {score}</p>
          {question ? (
            <div className="pt-[80px] text-4xl flex flex-col items-center gap-6">
              <div className="flex text-[80px] font-semibold text-center">
                {question.num1} {question.operator} {question.num2}
              </div>

              <input
                className="mt-4 p-2 border-b-2 border-gray-400 text-center text-3xl focus:outline-none focus:border-blue-500"
                type="number"
                placeholder="กรอกคำตอบ"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          ) : (
            <p className="pt-20 text-xl text-gray-600">กำลังโหลดคำถาม...</p>
          )}
        </div>
      )}
    </div>
  );
}

function generateQuestion(level, questionNumber) {
  let num1, num2, operator, answer;

  if (level === "1") {
    num1 = Math.floor(Math.random() * 199) - 99;
    num2 = Math.floor(Math.random() * 199) - 99;
    operator = questionNumber % 2 === 0 ? "+" : "-";
    answer = operator === "+" ? num1 + num2 : num1 - num2;
  } else if (level === "2") {
    num1 = Math.floor(Math.random() * 51) - 25;
    num2 = Math.floor(Math.random() * 25) + 1;
    operator = questionNumber % 2 === 0 ? "*" : "/";

    if (operator === "*") {
      answer = num1 * num2;
    } else {
      const divisibleNum = num2 * (Math.floor(Math.random() * 25) + 1);
      num1 = divisibleNum;
      answer = num1 / num2;
    }
  }

  return { num1, num2, operator, answer };
}
