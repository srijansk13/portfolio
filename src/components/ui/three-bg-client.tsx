"use client";

import dynamic from "next/dynamic";

const ThreeBg = dynamic(() => import("./three-bg"), {
  ssr: false,
});

export default function ThreeBgClient() {
  return <ThreeBg />;
}
