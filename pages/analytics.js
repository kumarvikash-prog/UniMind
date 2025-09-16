// In pages/analytics.js
import AnalyticsGraph from '../components/AnalyticsGraph';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Team Contribution Analytics</h1>
      <AnalyticsGraph />
    </div>
  );
}