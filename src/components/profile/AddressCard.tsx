
import { AddressType } from '@/types/types';
import AddressDisplay from './AddressDisplay';
import AddressEditForm from './AddressEditForm';

interface AddressCardProps {
  type: 'billing' | 'shipping';
  address: AddressType;
  isEditing: boolean;
  onEdit: (type: 'billing' | 'shipping') => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (type: 'billing' | 'shipping', field: keyof AddressType, value: string) => void;
  onCancel: () => void;
}

const AddressCard = ({ 
  type, 
  address, 
  isEditing, 
  onEdit, 
  onSubmit, 
  onChange, 
  onCancel 
}: AddressCardProps) => {
  const formattedType = type.charAt(0).toUpperCase() + type.slice(1);
  
  return (
    <div className="address-card">
      <h3 className="address-type">{formattedType} Address</h3>
      {!isEditing ? (
        <AddressDisplay 
          address={address} 
          type={type} 
          onEdit={onEdit} 
        />
      ) : (
        <AddressEditForm 
          address={address} 
          type={type} 
          onCancel={onCancel} 
          onSubmit={onSubmit}
          onChange={onChange} 
        />
      )}
    </div>
  );
};

export default AddressCard;
