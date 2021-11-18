import React from "react";

export default function AppBox({ children }: { children: React.ReactNode }) {
  return <div className='p-4 rounded-2xl bg-white'>{children}</div>;
}
