"use client";

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export default function TestAuth() {
  const { user, token, login, logout, isLoading } = useAuth();

  const handleTestLogin = async () => {
    const success = await login('admin@metadots.com', 'admin123');
    console.log('Test login result:', success);
  };

  const handleTestLogout = () => {
    console.log('Test logout called');
    logout();
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Auth Context Test</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Current State:</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify({ user, token, isLoading }, null, 2)}
          </pre>
        </div>

        <div className="space-x-4">
          <Button onClick={handleTestLogin}>
            Test Login
          </Button>
          <Button onClick={handleTestLogout} variant="outline">
            Test Logout
          </Button>
        </div>

        <div>
          <h2 className="text-lg font-semibold">LocalStorage:</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify({
              admin_token: typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null,
              admin_user: typeof window !== 'undefined' ? localStorage.getItem('admin_user') : null
            }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
} 