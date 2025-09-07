import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RegisterForm from '../../app/register/_components/RegisterForm';

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Signup successful' }),
  })
) as any;

describe('회원가입 통합 테스트', () => {
  it('사용자가 입력한 데이터를 API에 정상적으로 전달하는가?', async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByPlaceholderText('이름'), { target: { value: 'tester' } });
    fireEvent.change(screen.getByPlaceholderText('이메일'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), { target: { value: '12345678' } });
    fireEvent.click(screen.getByRole('button', { name: /회원가입/i }));
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/signup'),
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('tester'),
        })
      );
    });
  });

  it('API 성공 응답(201 Created)을 받으면 "회원가입 성공" 메시지가 표시되는가?', async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByPlaceholderText('이름'), { target: { value: 'tester' } });
    fireEvent.change(screen.getByPlaceholderText('이메일'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), { target: { value: '12345678' } });
    fireEvent.click(screen.getByRole('button', { name: /회원가입/i }));
    expect(await screen.findByText(/회원가입 성공/i)).toBeInTheDocument();
  });
});
