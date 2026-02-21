import { Component } from '@angular/core';

interface Asset {
  id: string;
  name: string;
  category: 'IT' | 'Non-IT' | 'Digital';
  type: string;
  status: 'Available' | 'Assigned' | 'Repair' | 'Scrapped';
  location: string;
  purchaseDate: string;
  warrantyExpiry: string;
  value: number;
  depreciation: number;
}

interface Allocation {
  assetId: string;
  employee: string;
  issueDate: string;
  returnDate: string;
  condition: string;
  damageStatus: string;
}

interface MaintenanceRecord {
  assetId: string;
  serviceDate: string;
  amc: string;
  repairCost: number;
  note: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginForm = {
    username: '',
    password: ''
  };

  isLoggedIn = false;
  loginError = '';

  readonly credentialsHint = 'Use: admin / admin123';

  readonly assets: Asset[] = [
    { id: 'AST-1001', name: 'Dell Latitude 7430', category: 'IT', type: 'Laptop', status: 'Assigned', location: 'HQ - Floor 2', purchaseDate: '2024-01-15', warrantyExpiry: '2027-01-14', value: 98000, depreciation: 15 },
    { id: 'AST-1002', name: 'HP LaserJet Pro', category: 'IT', type: 'Printer', status: 'Available', location: 'HQ - Admin', purchaseDate: '2023-11-10', warrantyExpiry: '2026-11-09', value: 26500, depreciation: 12 },
    { id: 'AST-2001', name: 'Conference Chair Set', category: 'Non-IT', type: 'Chairs', status: 'Available', location: 'Branch A - Meeting Room', purchaseDate: '2022-07-02', warrantyExpiry: '2027-07-01', value: 18000, depreciation: 8 },
    { id: 'AST-3001', name: 'Adobe Creative Cloud', category: 'Digital', type: 'Subscription', status: 'Assigned', location: 'Design Team', purchaseDate: '2025-02-01', warrantyExpiry: '2026-01-31', value: 72000, depreciation: 20 },
    { id: 'AST-1003', name: 'Cisco Router RV340', category: 'IT', type: 'Router', status: 'Repair', location: 'HQ - Server Room', purchaseDate: '2021-09-19', warrantyExpiry: '2025-09-18', value: 43000, depreciation: 18 }
  ];

  readonly allocations: Allocation[] = [
    { assetId: 'AST-1001', employee: 'Akhil Sharma', issueDate: '2025-01-07', returnDate: '-', condition: 'Good', damageStatus: 'No Damage' },
    { assetId: 'AST-3001', employee: 'Nisha Rao', issueDate: '2025-02-05', returnDate: '-', condition: 'Active', damageStatus: 'N/A' }
  ];

  readonly maintenance: MaintenanceRecord[] = [
    { assetId: 'AST-1003', serviceDate: '2026-03-05', amc: 'NetSecure AMC', repairCost: 6500, note: 'Port replacement and diagnostics' },
    { assetId: 'AST-1002', serviceDate: '2026-05-20', amc: 'PrintCare Annual', repairCost: 0, note: 'Preventive service scheduled' }
  ];

  get totalAssets(): number {
    return this.assets.length;
  }

  get assignedAssets(): number {
    return this.assets.filter((asset) => asset.status === 'Assigned').length;
  }

  get repairAssets(): number {
    return this.assets.filter((asset) => asset.status === 'Repair').length;
  }

  get expiringWarranty(): number {
    return this.assets.filter((asset) => new Date(asset.warrantyExpiry) < new Date('2026-12-31')).length;
  }

  onLogin(): void {
    if (this.loginForm.username === 'admin' && this.loginForm.password === 'admin123') {
      this.isLoggedIn = true;
      this.loginError = '';
      return;
    }

    this.loginError = 'Invalid login. Please use dummy credentials shown below.';
  }

  onLogout(): void {
    this.isLoggedIn = false;
    this.loginForm = { username: '', password: '' };
  }
}
