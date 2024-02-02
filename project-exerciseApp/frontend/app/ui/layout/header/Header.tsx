"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isToken, setIsToken] = useState(false);

  // * 토큰 검사
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsToken(!!token); // token이 있으면 true, 없으면 false로 설정
  }, []);

  // * 로그아웃(토큰 삭제)
  const logout = () => {
    // 토큰 삭제
    localStorage.removeItem("token");
    // 상태 업데이트로 화면 다시 로딩
    setIsToken(false);
    // 다시 로딩
    location.href = "/";
  };

  // * 새로고침
  const handleClick = () => {
    // 새로고침 효과를 주기 위해 window.location.href를 사용합니다.
    window.location.href = "/";
  };

  return (
    <header className="flex border-b-2 border-wine p-4 justify-between">
      <Link href="/">
        <h1
          className="text-xl cursor-pointer text-gray-950"
          onClick={handleClick}
        >
          Home
        </h1>
      </Link>
      <ul className="flex ml-auto">
        {isToken ? (
          // 토큰이 있을 때는 로그아웃 버튼을 보여줍니다.
          <>
            <li className="mr-3 cursor-pointer" onClick={logout}>
              로그아웃
            </li>
            <Link href="/signup" className="mr-3">
              <li>회원가입</li>
            </Link>
          </>
        ) : (
          // 토큰이 없을 때는 로그인과 회원가입 링크를 보여줍니다.
          <>
            <Link href="/login" className="mr-3">
              <li>로그인</li>
            </Link>
            <Link href="/signup" className="mr-3">
              <li>회원가입</li>
            </Link>
          </>
        )}
      </ul>
    </header>
  );
}
