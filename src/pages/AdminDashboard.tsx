import React, { useState } from 'react';
import { seedDatabase } from '../utils/seedDatabase';

const AdminDashboard: React.FC = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedingError, setSeedingError] = useState<string | null>(null);
  const [seedingSuccess, setSeedingSuccess] = useState(false);

  const handleSeedDatabase = async () => {
    try {
      setIsSeeding(true);
      setSeedingError(null);
      setSeedingSuccess(false);
      await seedDatabase();
      setSeedingSuccess(true);
    } catch (error) {
      setSeedingError(error instanceof Error ? error.message : 'An error occurred while seeding the database');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Database Management</h2>
        
        <div className="space-y-4">
          <button
            onClick={handleSeedDatabase}
            disabled={isSeeding}
            className={`px-4 py-2 rounded ${
              isSeeding
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-medium transition-colors`}
          >
            {isSeeding ? 'Seeding Database...' : 'Seed Database with Demo Data'}
          </button>

          {seedingSuccess && (
            <div className="text-green-600 font-medium">
              Database seeded successfully!
            </div>
          )}

          {seedingError && (
            <div className="text-red-600 font-medium">
              Error: {seedingError}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Demo Accounts</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-medium">Admin Account</h3>
            <p>Email: admin@skillxchange.com</p>
          </div>
          <div className="border-l-4 border-green-600 pl-4">
            <h3 className="font-medium">Demo User Accounts</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>john.doe@example.com (JavaScript Developer)</li>
              <li>jane.smith@example.com (UI/UX Designer)</li>
              <li>sarah.wilson@example.com (Digital Marketer)</li>
              <li>mike.brown@example.com (Video Editor)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 