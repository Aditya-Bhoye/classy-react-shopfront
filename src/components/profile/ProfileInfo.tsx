
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import './ProfileInfo.css';

type ProfileData = {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ProfileInfo = () => {
  const { user, logout } = useAuth();
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call for profile update
    setEditingProfile(false);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call for password update
    // Reset password fields
    setProfileData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  if (!user) {
    return null;
  }

  return (
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
  );
};

export default ProfileInfo;
