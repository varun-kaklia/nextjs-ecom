"use client"
import { RecoilRoot } from "recoil";

export const RecoilProvider = ({ children }) => {
  return (
    <RecoilRoot>
      <main className="w-screen h-screen">
        {children}
      </main>
    </RecoilRoot>
  );
};
