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
import { useMe } from "@/features/users/presentation/hooks/useMe";
import { useUpdateMe } from "@/features/users/presentation/hooks/useUpdateMe";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { MdCameraAlt } from "react-icons/md";
import { toast } from "sonner";

export default function UserProfileForm() {
  const { data: user } = useMe();
  const { mutateAsync: updateMe, isPending } = useUpdateMe();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      nickname: user?.nickname ?? "",
      picture: user?.picture ?? "",
    },
  });

  // 초기값을 await 이후 받아야하므로, 사용한다.
  useEffect(() => {
    if (user) {
      reset({
        nickname: user.nickname ?? "",
        picture: user.picture ?? "",
      });
    }
  }, [user, reset]);

  const nickname = watch("nickname");
  const picture = watch("picture");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result)
        setValue("picture", ev.target.result as string, { shouldDirty: true });
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: { nickname: string; picture: string }) => {
    await updateMe(data);
    toast("회원정보가 저장되었습니다.");
  };

  if (!user) return null;

  return (
    <div className="flex justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>회원정보 수정</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    <AvatarImage src={user?.picture} alt={user?.nickname} />
                    <AvatarFallback>{user?.nickname?.[0]}</AvatarFallback>
                  </Avatar>
                  <span className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-md transition-colors group-hover:bg-emerald-100">
                    <MdCameraAlt className="h-5 w-5 text-emerald-600" />
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
                defaultValue={user?.nickname}
                {...register("nickname", { required: true, maxLength: 24 })}
                className="mt-3"
                maxLength={24}
              />
            </div>
            {/* 이메일/Provider (읽기 전용) */}
            <div>
              <Label htmlFor="email">이메일</Label>
              <Input id="email" value={user.email} disabled className="mt-3" />
            </div>
            <div>
              <Label htmlFor="provider">가입한 소셜 계정</Label>
              <Input
                id="provider"
                value={user.provider}
                disabled
                className="mt-3 capitalize"
              />
            </div>
          </CardContent>
          <CardFooter>
            <div className="mt-8 flex w-full justify-end">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full cursor-pointer hover:text-emerald-800"
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
