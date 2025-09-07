import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';

// vitest 환경에서 전역 expect, vi 제공
Object.assign(globalThis, { expect, vi });

// next/navigation useRouter mock
vi.mock('next/navigation', () => ({
	useRouter: () => ({
		replace: vi.fn(),
		push: vi.fn(),
		prefetch: vi.fn(),
	}),
}));
