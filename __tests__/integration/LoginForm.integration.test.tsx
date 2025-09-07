import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginForm from '../../app/login/_components/LoginForm';

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ access_token: 'dummy-token' }),
  })
) as any;

describe('로그인 통합 테스트', () => {
  it('올바른 계정 정보 입력 시 API 호출 및 토큰 저장', async () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText('이름'), { target: { value: 'tester' } });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), { target: { value: '12345678' } });
    fireEvent.click(screen.getByRole('button', { name: /로그인/i }));
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/login'),
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('tester'),
        })
      );
    });
  });

  it('로그인 실패 응답(401/404 등)에 따라 오류 메시지 표시', async () => {
    (global.fetch as any).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ detail: 'Wrong password' }),
      })
    );
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText('이름'), { target: { value: 'tester' } });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /로그인/i }));
    expect(await screen.findByText(/wrong password/i)).toBeInTheDocument();
  });
});
