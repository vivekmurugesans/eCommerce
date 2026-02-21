'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Asset, AssetInput, AssetStatus } from '@/lib/types';

const statuses: AssetStatus[] = ['AVAILABLE', 'IN_USE', 'IN_REPAIR', 'RETIRED'];

const emptyState: AssetInput = {
  name: '',
  tagNumber: '',
  category: '',
  location: '',
  status: 'AVAILABLE',
  purchaseDate: '',
  purchaseCost: 0,
  notes: '',
};

interface AssetFormProps {
  selectedAsset?: Asset | null;
  onSubmit: (input: AssetInput) => Promise<void>;
  onCancelEdit: () => void;
}

export default function AssetForm({ selectedAsset, onSubmit, onCancelEdit }: AssetFormProps) {
  const [form, setForm] = useState<AssetInput>(emptyState);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!selectedAsset) {
      setForm(emptyState);
      return;
    }

    setForm({
      name: selectedAsset.name,
      tagNumber: selectedAsset.tagNumber,
      category: selectedAsset.category,
      location: selectedAsset.location,
      status: selectedAsset.status,
      purchaseDate: selectedAsset.purchaseDate,
      purchaseCost: Number(selectedAsset.purchaseCost),
      notes: selectedAsset.notes ?? '',
    });
  }, [selectedAsset]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    try {
      await onSubmit(form);
      setForm(emptyState);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>{selectedAsset ? 'Edit Asset' : 'Add Asset'}</h2>
      <div className="grid">
        <input required placeholder="Asset Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input required placeholder="Tag Number" value={form.tagNumber} onChange={(e) => setForm({ ...form, tagNumber: e.target.value })} />
        <input required placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input required placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <input required type="date" value={form.purchaseDate} onChange={(e) => setForm({ ...form, purchaseDate: e.target.value })} />
        <input
          required
          type="number"
          min="0"
          step="0.01"
          placeholder="Purchase Cost"
          value={form.purchaseCost}
          onChange={(e) => setForm({ ...form, purchaseCost: Number(e.target.value) })}
        />
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as AssetStatus })}>
          {statuses.map((status) => (
            <option value={status} key={status}>
              {status}
            </option>
          ))}
        </select>
        <input placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      </div>
      <div className="actions">
        <button disabled={isSaving}>{isSaving ? 'Saving...' : selectedAsset ? 'Update Asset' : 'Create Asset'}</button>
        {selectedAsset && (
          <button type="button" onClick={onCancelEdit} className="secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
