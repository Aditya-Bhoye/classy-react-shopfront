
import { useState } from 'react';
import { AddressType } from '@/types/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AddressCard from './AddressCard';
import './AddressSection.css';

interface AddressSectionProps {
  initialAddresses: {
    billing: AddressType;
    shipping: AddressType;
  };
}

const AddressSection = ({ initialAddresses }: AddressSectionProps) => {
  const [editingAddress, setEditingAddress] = useState<'billing' | 'shipping' | null>(null);
  const [addresses, setAddresses] = useState(initialAddresses);

  const handleUpdateAddress = (type: 'billing' | 'shipping') => (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call for address update
    setEditingAddress(null);
  };

  const handleAddressChange = (type: 'billing' | 'shipping', field: keyof AddressType, value: string) => {
    setAddresses({
      ...addresses,
      [type]: {
        ...addresses[type],
        [field]: value
      }
    });
  };

  const handleCancelEdit = () => {
    setEditingAddress(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Addresses</CardTitle>
        <CardDescription>Manage your shipping and billing addresses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="addresses-container">
          <AddressCard 
            type="billing"
            address={addresses.billing}
            isEditing={editingAddress === 'billing'}
            onEdit={setEditingAddress}
            onSubmit={handleUpdateAddress('billing')}
            onChange={handleAddressChange}
            onCancel={handleCancelEdit}
          />
          
          <AddressCard 
            type="shipping"
            address={addresses.shipping}
            isEditing={editingAddress === 'shipping'}
            onEdit={setEditingAddress}
            onSubmit={handleUpdateAddress('shipping')}
            onChange={handleAddressChange}
            onCancel={handleCancelEdit}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressSection;
