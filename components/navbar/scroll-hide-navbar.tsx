"use client";
import { Progress } from "@/components/ui/progress";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import NavBar from "./nav-bar";

export default function ScrollHideNavbar() {
  const [show, setShow] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const curr = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (curr / scrollHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      if (curr <= 0) {
        setShow(true);
        lastScroll.current = curr;
        return;
      }
      setShow(curr < lastScroll.current);
      lastScroll.current = curr;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={clsx(
          "fixed left-0 w-full z-50 transition-all duration-300 ",
          show ? "top-[50px]" : "top-0"
        )}
      >
        <Progress
          value={scrollProgress}
          className="h-1 w-full rounded-none dark:bg-neutral-800 bg-slate-50 [&>div]:bg-emerald-500"
        />
      </div>

      <div className="fixed top-0 left-0 w-full z-40">
        <NavBar
          className={clsx(
            "w-full transition-transform duration-300 shadow h-[50px]",
            show ? "translate-y-0" : "-translate-y-full"
          )}
        />
      </div>
    </>
  );
}
