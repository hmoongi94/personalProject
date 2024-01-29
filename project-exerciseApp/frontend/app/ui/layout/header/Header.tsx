"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import HeaderItem from './HeaderItem';
// import Logout from './logoutitem';

export default function Header() {
  // const [isToken, setIsToken] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   setIsToken(!!token); // token이 있으면 true, 없으면 false로 설정
  // }, []);

  // const logout = () => {
  //   // 토큰 삭제
  //   localStorage.removeItem('token');
  //   // 상태 업데이트로 화면 다시 로딩
  //   setIsToken(false);
  //   // 다시 로딩
  //   location.href = '/';
  // };

  return (
    <header className="flex border-b-2 border-wine p-4 justify-between">
      <Link href="/">
        <h1 className="text-xl cursor-pointer">Home</h1>
      </Link>
      
    </header>
  );
}
