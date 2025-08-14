"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { useMe } from "@/features/users/presentation/hooks/useMe";
import { useUpdateMe } from "@/features/users/presentation/hooks/useUpdateMe";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdCameraAlt } from "react-icons/md";
import { toast } from "sonner";

export default function UserProfileForm() {
  const { data: user } = useMe();
  const { mutateAsync: updateMe, isPending } = useUpdateMe();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 미리보기용

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      nickname: user?.nickname ?? "",
      image: undefined,
    },
  });

  //데이터 초기화
  useEffect(() => {
    if (user) {
      reset({
        nickname: user.nickname ?? "",
        image: undefined,
      });
      setPreviewUrl(user.picture ?? null);
    }
  }, [user, reset]);

  // 파일 미리보기
  const imageFiles = watch("image");
  useEffect(() => {
    const fileObj = imageFiles?.[0];
    if (!fileObj) {
      setPreviewUrl(user?.picture ?? null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) setPreviewUrl(ev.target.result as string);
    };
    reader.readAsDataURL(fileObj);
  }, [imageFiles, user?.picture]);

  const onSubmit = async (data: { nickname: string; image?: FileList }) => {
    await updateMe({ nickname: data.nickname, image: data.image?.[0] });
    toast("회원정보가 저장되었습니다.");
  };

  if (!user) return null;

  return (
    <div className="flex justify-center py-12" data-testid="profile-page">
      <Card className="w-full max-w-md" data-testid="profile-card">
        <CardHeader data-testid="profile-header">
          <CardTitle data-testid="profile-title">회원정보 수정</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} data-testid="profile-form">
          <CardContent className="space-y-6" data-testid="profile-content">
            {/* 프로필 사진 */}
            <div
              className="flex flex-col items-center gap-2"
              data-testid="profile-avatar-section"
            >
              <div
                className="group relative"
                data-testid="profile-avatar-container"
              >
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
                  data-testid="profile-avatar-button"
                >
                  <Avatar className="h-20 w-20" data-testid="profile-avatar">
                    <AvatarImage
                      src={previewUrl || user?.picture}
                      alt={user?.nickname}
                      data-testid="profile-avatar-image"
                    />
                    <AvatarFallback data-testid="profile-avatar-fallback">
                      {user?.nickname?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-md transition-colors group-hover:bg-emerald-100"
                    data-testid="profile-camera-icon"
                  >
                    <MdCameraAlt className="h-5 w-5 text-emerald-600" />
                  </span>
                </button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("image")}
                  ref={(e) => {
                    register("image").ref(e);
                    fileInputRef.current = e;
                  }}
                  data-testid="profile-file-input"
                />
              </div>
            </div>
            {/* 닉네임 */}
            <div data-testid="profile-nickname-section">
              <Label htmlFor="nickname" data-testid="profile-nickname-label">
                닉네임
              </Label>
              <Input
                id="nickname"
                defaultValue={user?.nickname}
                {...register("nickname", { required: true, maxLength: 24 })}
                className="mt-3"
                maxLength={24}
                data-testid="profile-nickname-input"
              />
            </div>
            {/* 이메일/Provider (읽기 전용) */}
            <div data-testid="profile-email-section">
              <Label htmlFor="email" data-testid="profile-email-label">
                이메일
              </Label>
              <Input
                id="email"
                value={user.email}
                disabled
                className="mt-3"
                data-testid="profile-email-input"
              />
            </div>
            <div data-testid="profile-provider-section">
              <Label htmlFor="provider" data-testid="profile-provider-label">
                가입한 소셜 계정
              </Label>
              <Input
                id="provider"
                value={user.provider}
                disabled
                className="mt-3 capitalize"
                data-testid="profile-provider-input"
              />
            </div>
          </CardContent>
          <CardFooter data-testid="profile-footer">
            <div
              className="mt-8 flex w-full justify-end"
              data-testid="profile-footer-content"
            >
              <Button
                type="submit"
                disabled={isPending}
                className="w-full cursor-pointer hover:text-emerald-800"
                data-testid="profile-save-button"
              >
                {isPending ? "저장 중..." : "저장하기"}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
