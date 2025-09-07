"use client";
import React from "react";
import { useState } from "react";
import { useAuthStore } from "../../../store/auth";

import { useRouter } from "next/navigation";

export default function LoginForm() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
  const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || "로그인 실패");
        setSuccess("");
        return;
      }
      const data = await res.json();
      login(data.access_token, username);
      setSuccess("로그인 성공!");
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("username", username);
      setTimeout(() => {
        router.replace("/");
      }, 1000);
    } catch (err) {
      setError("네트워크 오류");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, width: 320 }}>
        <h2>로그인</h2>
        <input
          type="text"
          placeholder="이름"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
    <button type="submit">로그인</button>
    {error && <div style={{ color: "red" }}>{error}</div>}
    {success && <div style={{ color: "green" }}>{success}</div>}
      </form>
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <a href="/register" style={{ color: '#0070f3', textDecoration: 'underline', cursor: 'pointer' }}>
          회원가입이 필요하신가요?
        </a>
      </div>
    </>
  );
}
