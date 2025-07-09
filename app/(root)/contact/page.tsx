"use client";
import * as Sentry from "@sentry/nextjs";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  subject: string;
  message: string;
};

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>();
  const [result, setResult] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    setResult(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (res.ok) {
        setResult(
          "문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.",
        );
        reset();
      } else {
        setResult(resData.error || "전송에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      Sentry.captureException(error);
      setResult("전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-2">
      <div className="bg-accent w-full max-w-md rounded-lg p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">문의하기</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="subject" className="mb-1 block font-semibold">
              제목
            </label>
            <input
              id="subject"
              aria-label="문의 제목"
              {...register("subject", { required: "제목을 입력해주세요." })}
              placeholder="문의 제목을 입력하세요"
              className={`w-full rounded border px-3 py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none ${
                errors.subject ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.subject && (
              <span className="text-sm text-red-500">
                {errors.subject.message}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block font-semibold">
              내용
            </label>
            <textarea
              id="message"
              aria-label="문의 내용"
              {...register("message", {
                required: "문의 내용을 입력해주세요.",
              })}
              placeholder="문의하고 싶은 내용을 입력하세요"
              className={`h-40 w-full resize-none rounded border px-3 py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none ${
                errors.message ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.message && (
              <span className="text-sm text-red-500">
                {errors.message.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-emerald-500 py-2 font-bold text-white hover:bg-emerald-600 disabled:opacity-60"
          >
            {isSubmitting ? "전송 중..." : "문의 보내기"}
          </button>
          {result && (
            <div className="mt-4 text-center text-sm text-emerald-600">
              {result}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
