import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import './PreferencesSection.css';

const PreferencesSection = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') as 'light' | 'dark' || 'light'
  );

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

  return (
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
  );
};

export default PreferencesSection;
