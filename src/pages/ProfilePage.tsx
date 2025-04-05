
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { OrderType, AddressType } from '../types/types';
import { sampleOrders } from '../data/sampleData';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [editingAddress, setEditingAddress] = useState<'billing' | 'shipping' | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') as 'light' | 'dark' || 'light'
  );

  // User profile data with default values
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    addresses: {
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
    }
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOrders(sampleOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    // Apply theme from state
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(current => {
      const newTheme = current === 'light' ? 'dark' : 'light';
      return newTheme;
    });
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call for profile update
    setEditingProfile(false);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call for password update
    setEditingPassword(false);
    // Reset password fields
    setProfileData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleUpdateAddress = (type: 'billing' | 'shipping') => (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call for address update
    setEditingAddress(null);
  };

  if (loading) {
    return (
      <div className="container text-center py-10">
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container text-center py-10">
        <p>Please log in to view your profile.</p>
        <Button className="mt-4" onClick={() => window.location.href = '/login'}>
          Go to Login
        </Button>
      </div>
    );
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
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Manage your personal details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="profile-info">
                  <div className="profile-avatar">
                    <div className="avatar-image">
                      <img src={user.profileImage || '/placeholder.svg'} alt={user.name} />
                    </div>
                  </div>
                  
                  {!editingProfile ? (
                    <div className="profile-details">
                      <div className="profile-field">
                        <span className="field-label">Name:</span>
                        <span className="field-value">{profileData.name}</span>
                      </div>
                      <div className="profile-field">
                        <span className="field-label">Email:</span>
                        <span className="field-value">{profileData.email}</span>
                      </div>
                      <Button 
                        onClick={() => setEditingProfile(true)}
                        className="edit-profile-btn mt-4"
                      >
                        Edit Profile
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleUpdateProfile} className="profile-edit-form">
                      <div className="form-group">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-actions">
                        <Button type="submit">Save Changes</Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setEditingProfile(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Password Change Section */}
                <Collapsible className="password-section">
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      Change Password
                      <span className="collapsible-icon">+</span>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <form onSubmit={handleUpdatePassword} className="password-form">
                      <div className="form-group">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input 
                          id="current-password" 
                          type="password"
                          value={profileData.currentPassword}
                          onChange={(e) => setProfileData({...profileData, currentPassword: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input 
                          id="new-password" 
                          type="password"
                          value={profileData.newPassword}
                          onChange={(e) => setProfileData({...profileData, newPassword: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input 
                          id="confirm-password" 
                          type="password"
                          value={profileData.confirmPassword}
                          onChange={(e) => setProfileData({...profileData, confirmPassword: e.target.value})}
                          required
                        />
                      </div>
                      <Button type="submit" className="mt-4">Update Password</Button>
                    </form>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
              <CardFooter>
                <Button variant="destructive" onClick={logout}>Logout</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="profile-tab-content">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>Track and manage your orders</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <p className="no-orders">You haven't placed any orders yet.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">#{order.id}</TableCell>
                          <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                          <TableCell>${order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <span className={`status-badge status-${order.status.toLowerCase()}`}>
                              {order.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Collapsible className="order-details-collapsible">
                              <CollapsibleTrigger asChild>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <div className="order-details-expanded">
                                  <h4>Items:</h4>
                                  <ul className="order-items-list">
                                    {order.items.map((item, index) => (
                                      <li key={index} className="order-item-detail">
                                        <span>{item.product.name} x {item.quantity}</span>
                                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="profile-tab-content">
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
                        <p>{profileData.addresses.billing.street}</p>
                        <p>{profileData.addresses.billing.city}, {profileData.addresses.billing.state} {profileData.addresses.billing.zipCode}</p>
                        <p>{profileData.addresses.billing.country}</p>
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
                            value={profileData.addresses.billing.street}
                            onChange={(e) => setProfileData({
                              ...profileData, 
                              addresses: {
                                ...profileData.addresses,
                                billing: {
                                  ...profileData.addresses.billing,
                                  street: e.target.value
                                }
                              }
                            })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <Label htmlFor="billing-city">City</Label>
                          <Input 
                            id="billing-city" 
                            type="text"
                            value={profileData.addresses.billing.city}
                            onChange={(e) => setProfileData({
                              ...profileData, 
                              addresses: {
                                ...profileData.addresses,
                                billing: {
                                  ...profileData.addresses.billing,
                                  city: e.target.value
                                }
                              }
                            })}
                            required
                          />
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <Label htmlFor="billing-state">State</Label>
                            <Input 
                              id="billing-state" 
                              type="text"
                              value={profileData.addresses.billing.state}
                              onChange={(e) => setProfileData({
                                ...profileData, 
                                addresses: {
                                  ...profileData.addresses,
                                  billing: {
                                    ...profileData.addresses.billing,
                                    state: e.target.value
                                  }
                                }
                              })}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <Label htmlFor="billing-zipcode">Zip Code</Label>
                            <Input 
                              id="billing-zipcode" 
                              type="text"
                              value={profileData.addresses.billing.zipCode}
                              onChange={(e) => setProfileData({
                                ...profileData, 
                                addresses: {
                                  ...profileData.addresses,
                                  billing: {
                                    ...profileData.addresses.billing,
                                    zipCode: e.target.value
                                  }
                                }
                              })}
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <Label htmlFor="billing-country">Country</Label>
                          <Input 
                            id="billing-country" 
                            type="text"
                            value={profileData.addresses.billing.country}
                            onChange={(e) => setProfileData({
                              ...profileData, 
                              addresses: {
                                ...profileData.addresses,
                                billing: {
                                  ...profileData.addresses.billing,
                                  country: e.target.value
                                }
                              }
                            })}
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
                        <p>{profileData.addresses.shipping.street}</p>
                        <p>{profileData.addresses.shipping.city}, {profileData.addresses.shipping.state} {profileData.addresses.shipping.zipCode}</p>
                        <p>{profileData.addresses.shipping.country}</p>
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
                            value={profileData.addresses.shipping.street}
                            onChange={(e) => setProfileData({
                              ...profileData, 
                              addresses: {
                                ...profileData.addresses,
                                shipping: {
                                  ...profileData.addresses.shipping,
                                  street: e.target.value
                                }
                              }
                            })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <Label htmlFor="shipping-city">City</Label>
                          <Input 
                            id="shipping-city" 
                            type="text"
                            value={profileData.addresses.shipping.city}
                            onChange={(e) => setProfileData({
                              ...profileData, 
                              addresses: {
                                ...profileData.addresses,
                                shipping: {
                                  ...profileData.addresses.shipping,
                                  city: e.target.value
                                }
                              }
                            })}
                            required
                          />
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <Label htmlFor="shipping-state">State</Label>
                            <Input 
                              id="shipping-state" 
                              type="text"
                              value={profileData.addresses.shipping.state}
                              onChange={(e) => setProfileData({
                                ...profileData, 
                                addresses: {
                                  ...profileData.addresses,
                                  shipping: {
                                    ...profileData.addresses.shipping,
                                    state: e.target.value
                                  }
                                }
                              })}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <Label htmlFor="shipping-zipcode">Zip Code</Label>
                            <Input 
                              id="shipping-zipcode" 
                              type="text"
                              value={profileData.addresses.shipping.zipCode}
                              onChange={(e) => setProfileData({
                                ...profileData, 
                                addresses: {
                                  ...profileData.addresses,
                                  shipping: {
                                    ...profileData.addresses.shipping,
                                    zipCode: e.target.value
                                  }
                                }
                              })}
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <Label htmlFor="shipping-country">Country</Label>
                          <Input 
                            id="shipping-country" 
                            type="text"
                            value={profileData.addresses.shipping.country}
                            onChange={(e) => setProfileData({
                              ...profileData, 
                              addresses: {
                                ...profileData.addresses,
                                shipping: {
                                  ...profileData.addresses.shipping,
                                  country: e.target.value
                                }
                              }
                            })}
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
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="profile-tab-content">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="preference-item">
                  <div className="preference-text">
                    <Label htmlFor="theme-toggle" className="preference-label">
                      Dark Mode
                    </Label>
                    <p className="preference-description">
                      Switch between light and dark theme
                    </p>
                  </div>
                  <Switch 
                    id="theme-toggle" 
                    checked={theme === 'dark'}
                    onCheckedChange={toggleTheme}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
