import { Asset, AssetInput } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message ?? 'Request failed');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const assetApi = {
  list: () => request<Asset[]>('/assets'),
  create: (input: AssetInput) =>
    request<Asset>('/assets', {
      method: 'POST',
      body: JSON.stringify(input),
    }),
  update: (id: number, input: AssetInput) =>
    request<Asset>(`/assets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(input),
    }),
  remove: (id: number) =>
    request<void>(`/assets/${id}`, {
      method: 'DELETE',
    }),
};
