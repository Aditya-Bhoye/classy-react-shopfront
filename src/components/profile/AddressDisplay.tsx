
import { AddressType } from "@/types/types";
import { Button } from "@/components/ui/button";

interface AddressDisplayProps {
  address: AddressType;
  type: 'billing' | 'shipping';
  onEdit: (type: 'billing' | 'shipping') => void;
}

const AddressDisplay = ({ address, type, onEdit }: AddressDisplayProps) => {
  return (
    <div className="address-details">
      <p>{address.street}</p>
      <p>{address.city}, {address.state} {address.zipCode}</p>
      <p>{address.country}</p>
      <Button 
        onClick={() => onEdit(type)}
        className="edit-address-btn mt-4" 
        variant="outline"
      >
        Edit {type.charAt(0).toUpperCase() + type.slice(1)} Address
      </Button>
    </div>
  );
};

export default AddressDisplay;
