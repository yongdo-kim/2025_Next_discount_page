"use client";
import { useState } from "react";

export default function ContactPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(
          "문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.",
        );
        setSubject("");
        setMessage("");
      } else {
        setResult(data.error || "전송에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("문의 전송 중 오류:", error);
      setResult("전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg p-6">
      <h1 className="mb-6 text-2xl font-bold">문의하기</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block font-semibold">제목</label>
          <input
            type="text"
            className="w-full rounded border px-3 py-2 focus:ring focus:outline-none"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            placeholder="문의 제목을 입력하세요"
          />
        </div>
        <div>
          <label className="mb-1 block font-semibold">내용</label>
          <textarea
            className="h-40 w-full resize-none rounded border px-3 py-2 focus:ring focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="문의하고 싶은 내용을 입력하세요"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-emerald-500 py-2 font-bold text-white hover:bg-emerald-600 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "전송 중..." : "문의 보내기"}
        </button>
        {result && (
          <div className="mt-4 text-center text-sm text-emerald-600">
            {result}
          </div>
        )}
      </form>
    </div>
  );
}
