
import React from 'react';
import { AddressType } from '@/types/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddressEditFormProps {
  address: AddressType;
  type: 'billing' | 'shipping';
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (type: 'billing' | 'shipping', field: keyof AddressType, value: string) => void;
}

const AddressEditForm = ({ address, type, onCancel, onSubmit, onChange }: AddressEditFormProps) => {
  return (
    <form onSubmit={onSubmit} className="address-edit-form">
      <div className="form-group">
        <Label htmlFor={`${type}-street`}>Street</Label>
        <Input 
          id={`${type}-street`} 
          type="text"
          value={address.street}
          onChange={(e) => onChange(type, 'street', e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <Label htmlFor={`${type}-city`}>City</Label>
        <Input 
          id={`${type}-city`} 
          type="text"
          value={address.city}
          onChange={(e) => onChange(type, 'city', e.target.value)}
          required
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <Label htmlFor={`${type}-state`}>State</Label>
          <Input 
            id={`${type}-state`} 
            type="text"
            value={address.state}
            onChange={(e) => onChange(type, 'state', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <Label htmlFor={`${type}-zipcode`}>Zip Code</Label>
          <Input 
            id={`${type}-zipcode`} 
            type="text"
            value={address.zipCode}
            onChange={(e) => onChange(type, 'zipCode', e.target.value)}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <Label htmlFor={`${type}-country`}>Country</Label>
        <Input 
          id={`${type}-country`} 
          type="text"
          value={address.country}
          onChange={(e) => onChange(type, 'country', e.target.value)}
          required
        />
      </div>
      <div className="form-actions">
        <Button type="submit">Save Address</Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddressEditForm;
