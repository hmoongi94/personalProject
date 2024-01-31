"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {

  const handleClick = () => {
    // 새로고침 효과를 주기 위해 window.location.href를 사용합니다.
    window.location.href = "/";
  };

  return (
    <header className="flex border-b-2 border-wine p-4 justify-between">
      <Link href="/">
        <h1 className="text-xl cursor-pointer text-gray-950" onClick={handleClick}>Home</h1>
        
      </Link>
      <ul className="flex ml-auto">
        <Link href="/login" className="mr-3">
          <li>로그인</li>
        </Link>
        <Link href="/signup" className="mr-3">
          <li>회원가입</li>
        </Link>
      </ul>
    </header>
  );
}
