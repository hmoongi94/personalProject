"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {

  return (
    <header className="flex border-b-2 border-wine p-4 justify-between">
      <Link href="/">
        <h1 className="text-xl cursor-pointer text-gray-950">Home</h1>
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
