export type AssetStatus = 'AVAILABLE' | 'IN_USE' | 'IN_REPAIR' | 'RETIRED';

export interface Asset {
  id: number;
  name: string;
  tagNumber: string;
  category: string;
  location: string;
  status: AssetStatus;
  purchaseDate: string;
  purchaseCost: number;
  notes?: string;
}

export interface AssetInput {
  name: string;
  tagNumber: string;
  category: string;
  location: string;
  status: AssetStatus;
  purchaseDate: string;
  purchaseCost: number;
  notes?: string;
}
