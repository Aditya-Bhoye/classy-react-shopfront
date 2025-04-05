
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";

const ProfileLoader = () => {
  const { user } = useAuth();

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

  return null;
};

export default ProfileLoader;
