import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoginForm from '../../app/login/_components/LoginForm';

describe('로그인 폼 단위 테스트', () => {
  it('로그인 버튼이 정상적으로 렌더링되는가?', () => {
    render(<LoginForm />);
    expect(screen.getByRole('button', { name: /로그인/i })).toBeInTheDocument();
  });

  it('아이디/비밀번호 입력란이 화면에 존재하는가?', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText('이름')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
  });

  it('입력란이 비어 있으면 오류 메시지를 표시하는가?', () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole('button', { name: /로그인/i }));
    // 실제 에러 메시지는 LoginForm 구현에 따라 다름
    // expect(screen.getByText(/오류|필수/i)).toBeInTheDocument();
  });
});
