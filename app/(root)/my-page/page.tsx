"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";

// 샘플 유저 데이터 (실제 구현 시 API로 대체)
const mockUser = {
  id: 2,
  email: "nbmg1128@gmail.com",
  name: "삐약쓰",
  nickname: "SmallButBigHeartRecorder",
  picture:
    "https://lh3.googleusercontent.com/a/ACg8ocL8uaRkcLbI0kU17Y6dPOBMHHfxH4q7zY_7ZU1pyuD107gN0A=s96-c",
  provider: "google",
};

export default function MyPage() {
  const [nickname, setNickname] = useState(mockUser.nickname);
  const [picture, setPicture] = useState(mockUser.picture);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 파일 선택/갤러리에서 이미지 변경
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) setPicture(ev.target.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("회원정보가 저장되었습니다.");
    }, 1000);
  };

  return (
    <div className="flex justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>회원정보 수정</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 프로필 사진 */}
          <div className="flex flex-col items-center gap-2">
            <div className="group relative">
              <button
                type="button"
                className="focus:outline-none"
                onClick={() => {
                  const isMobile = /iPhone|iPad|iPod|Android/i.test(
                    navigator.userAgent,
                  );
                  if (fileInputRef.current) {
                    if (isMobile) {
                      fileInputRef.current.setAttribute(
                        "capture",
                        "environment",
                      );
                    } else {
                      fileInputRef.current.removeAttribute("capture");
                    }
                    fileInputRef.current.click();
                  }
                }}
                aria-label="프로필 사진 변경"
              >
                <Avatar className="h-20 w-20">
                  <AvatarImage src={picture} alt={nickname} />
                  <AvatarFallback>{nickname[0]}</AvatarFallback>
                </Avatar>
                <span className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-md transition-colors group-hover:bg-amber-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5 text-amber-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18.75V7.5A2.25 2.25 0 014.5 5.25h2.379c.414 0 .789-.252.937-.639l.447-1.118A1.125 1.125 0 019.263 3h5.474c.482 0 .916.296 1.106.743l.447 1.118c.148.387.523.639.937.639H19.5a2.25 2.25 0 012.25 2.25v11.25a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 18.75z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    />
                  </svg>
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
          {/* 닉네임 */}
          <div>
            <Label htmlFor="nickname">닉네임</Label>
            <Input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="mt-1"
              maxLength={24}
            />
          </div>
          {/* 이메일/Provider (읽기 전용) */}
          <div>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              value={mockUser.email}
              disabled
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="provider">소셜 계정</Label>
            <Input
              id="provider"
              value={mockUser.provider}
              disabled
              className="mt-1 capitalize"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isSaving} className="w-full">
            {isSaving ? "저장 중..." : "저장하기"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
