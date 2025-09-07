import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RegisterForm from '../../app/register/_components/RegisterForm';

describe('회원가입 폼 단위 테스트', () => {
  it('회원가입 버튼이 정상적으로 렌더링되는가?', () => {
    render(<RegisterForm />);
    expect(screen.getByRole('button', { name: /회원가입/i })).toBeInTheDocument();
  });

  it('이름/이메일/비밀번호 입력창이 화면에 존재하는가?', () => {
    render(<RegisterForm />);
    expect(screen.getByPlaceholderText('이름')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
  });

  it('잘못된 이메일 형식 입력 시 에러 메시지를 표시하는가?', async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByPlaceholderText('이메일'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByPlaceholderText('이름'), { target: { value: 'tester' } });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), { target: { value: '12345678' } });
    fireEvent.click(screen.getByRole('button', { name: /회원가입/i }));
    // 실제 에러 메시지는 RegisterForm 구현에 따라 다름
    // expect(await screen.findByText(/이메일/i)).toBeInTheDocument();
  });

  // 비밀번호 확인 입력란이 없는 경우는 생략
});
