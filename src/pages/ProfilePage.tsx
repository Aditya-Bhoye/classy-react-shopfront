
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Components
import ProfileInfo from '@/components/profile/ProfileInfo';
import OrdersSection from '@/components/profile/OrdersSection';
import AddressSection from '@/components/profile/AddressSection';
import PreferencesSection from '@/components/profile/PreferencesSection';
import ProfileLoader from '@/components/profile/ProfileLoader';

// Styles
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Default address data
  const defaultAddresses = {
    billing: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    shipping: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  };

  if (loading) {
    return (
      <div className="container text-center py-10">
        <p>Loading your profile...</p>
      </div>
    );
  }

  // Show login prompt if user not logged in
  if (!user) {
    return <ProfileLoader />;
  }

  return (
    <div className="profile-page">
      <div className="container">
        <h1 className="profile-title">My Profile</h1>
        <p className="profile-welcome">Welcome back, {user.name}!</p>

        <Tabs defaultValue="profile" className="profile-tabs">
          <TabsList className="profile-tabs-list">
            <TabsTrigger value="profile">Profile Info</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          {/* Profile Info Tab */}
          <TabsContent value="profile" className="profile-tab-content">
            <ProfileInfo />
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="profile-tab-content">
            <OrdersSection />
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="profile-tab-content">
            <AddressSection initialAddresses={defaultAddresses} />
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="profile-tab-content">
            <PreferencesSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
