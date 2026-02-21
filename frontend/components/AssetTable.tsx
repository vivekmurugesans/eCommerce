'use client';

import { Asset } from '@/lib/types';

interface AssetTableProps {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
  onDelete: (id: number) => Promise<void>;
}

export default function AssetTable({ assets, onEdit, onDelete }: AssetTableProps) {
  return (
    <div className="card">
      <h2>Assets Inventory</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Tag</th>
            <th>Category</th>
            <th>Location</th>
            <th>Status</th>
            <th>Cost</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.name}</td>
              <td>{asset.tagNumber}</td>
              <td>{asset.category}</td>
              <td>{asset.location}</td>
              <td>{asset.status}</td>
              <td>${Number(asset.purchaseCost).toFixed(2)}</td>
              <td className="actions">
                <button type="button" onClick={() => onEdit(asset)}>
                  Edit
                </button>
                <button type="button" className="danger" onClick={() => onDelete(asset.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {assets.length === 0 && (
            <tr>
              <td colSpan={7} className="empty">
                No assets yet. Add your first one.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
