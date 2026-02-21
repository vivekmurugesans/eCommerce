'use client';

import { useEffect, useState } from 'react';
import AssetForm from '@/components/AssetForm';
import AssetTable from '@/components/AssetTable';
import { assetApi } from '@/lib/api';
import { Asset, AssetInput } from '@/lib/types';

export default function HomePage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selected, setSelected] = useState<Asset | null>(null);
  const [error, setError] = useState<string>('');

  async function loadAssets() {
    try {
      const data = await assetApi.list();
      setAssets(data);
      setError('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  useEffect(() => {
    void loadAssets();
  }, []);

  async function handleSubmit(input: AssetInput) {
    try {
      if (selected) {
        await assetApi.update(selected.id, input);
      } else {
        await assetApi.create(input);
      }
      setSelected(null);
      await loadAssets();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function handleDelete(id: number) {
    try {
      await assetApi.remove(id);
      if (selected?.id === id) {
        setSelected(null);
      }
      await loadAssets();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <main className="container">
      <header>
        <h1>Assets Management System</h1>
        <p>Next.js Frontend + Spring Boot Backend + PostgreSQL Database</p>
      </header>

      {error && <p className="error">{error}</p>}

      <AssetForm selectedAsset={selected} onSubmit={handleSubmit} onCancelEdit={() => setSelected(null)} />
      <AssetTable assets={assets} onEdit={setSelected} onDelete={handleDelete} />
    </main>
  );
}
