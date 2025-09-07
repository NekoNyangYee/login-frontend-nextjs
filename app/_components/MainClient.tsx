"use client";
import LoginForm from "../login/_components/LoginForm";

export default function MainClient() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 80 }}>
      <LoginForm />
    </main>
  );
}
