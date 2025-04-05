import { useState } from 'react';
import { AddressType } from '@/types/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Addresses</CardTitle>
        <CardDescription>Manage your shipping and billing addresses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="addresses-container">
          {/* Billing Address Card */}
          <div className="address-card">
            <h3 className="address-type">Billing Address</h3>
            {editingAddress !== 'billing' ? (
              <div className="address-details">
                <p>{addresses.billing.street}</p>
                <p>{addresses.billing.city}, {addresses.billing.state} {addresses.billing.zipCode}</p>
                <p>{addresses.billing.country}</p>
                <Button 
                  onClick={() => setEditingAddress('billing')}
                  className="edit-address-btn mt-4" 
                  variant="outline"
                >
                  Edit Billing Address
                </Button>
              </div>
            ) : (
              <form onSubmit={handleUpdateAddress('billing')} className="address-edit-form">
                <div className="form-group">
                  <Label htmlFor="billing-street">Street</Label>
                  <Input 
                    id="billing-street" 
                    type="text"
                    value={addresses.billing.street}
                    onChange={(e) => handleAddressChange('billing', 'street', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <Label htmlFor="billing-city">City</Label>
                  <Input 
                    id="billing-city" 
                    type="text"
                    value={addresses.billing.city}
                    onChange={(e) => handleAddressChange('billing', 'city', e.target.value)}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <Label htmlFor="billing-state">State</Label>
                    <Input 
                      id="billing-state" 
                      type="text"
                      value={addresses.billing.state}
                      onChange={(e) => handleAddressChange('billing', 'state', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <Label htmlFor="billing-zipcode">Zip Code</Label>
                    <Input 
                      id="billing-zipcode" 
                      type="text"
                      value={addresses.billing.zipCode}
                      onChange={(e) => handleAddressChange('billing', 'zipCode', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <Label htmlFor="billing-country">Country</Label>
                  <Input 
                    id="billing-country" 
                    type="text"
                    value={addresses.billing.country}
                    onChange={(e) => handleAddressChange('billing', 'country', e.target.value)}
                    required
                  />
                </div>
                <div className="form-actions">
                  <Button type="submit">Save Address</Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setEditingAddress(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Shipping Address Card */}
          <div className="address-card">
            <h3 className="address-type">Shipping Address</h3>
            {editingAddress !== 'shipping' ? (
              <div className="address-details">
                <p>{addresses.shipping.street}</p>
                <p>{addresses.shipping.city}, {addresses.shipping.state} {addresses.shipping.zipCode}</p>
                <p>{addresses.shipping.country}</p>
                <Button 
                  onClick={() => setEditingAddress('shipping')}
                  className="edit-address-btn mt-4" 
                  variant="outline"
                >
                  Edit Shipping Address
                </Button>
              </div>
            ) : (
              <form onSubmit={handleUpdateAddress('shipping')} className="address-edit-form">
                <div className="form-group">
                  <Label htmlFor="shipping-street">Street</Label>
                  <Input 
                    id="shipping-street" 
                    type="text"
                    value={addresses.shipping.street}
                    onChange={(e) => handleAddressChange('shipping', 'street', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <Label htmlFor="shipping-city">City</Label>
                  <Input 
                    id="shipping-city" 
                    type="text"
                    value={addresses.shipping.city}
                    onChange={(e) => handleAddressChange('shipping', 'city', e.target.value)}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <Label htmlFor="shipping-state">State</Label>
                    <Input 
                      id="shipping-state" 
                      type="text"
                      value={addresses.shipping.state}
                      onChange={(e) => handleAddressChange('shipping', 'state', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <Label htmlFor="shipping-zipcode">Zip Code</Label>
                    <Input 
                      id="shipping-zipcode" 
                      type="text"
                      value={addresses.shipping.zipCode}
                      onChange={(e) => handleAddressChange('shipping', 'zipCode', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <Label htmlFor="shipping-country">Country</Label>
                  <Input 
                    id="shipping-country" 
                    type="text"
                    value={addresses.shipping.country}
                    onChange={(e) => handleAddressChange('shipping', 'country', e.target.value)}
                    required
                  />
                </div>
                <div className="form-actions">
                  <Button type="submit">Save Address</Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setEditingAddress(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressSection;
