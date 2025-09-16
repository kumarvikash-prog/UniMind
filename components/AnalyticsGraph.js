// In components/AnalyticsGraph.js

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

// The dummy data is now defined outside the component.
const DUMMY_MEMBER_DATA = [
  { name: 'Riya', value: 12 },
  { name: 'Arjun', value: 18 },
  { name: 'Vikash', value: 9 },
  { name: 'Samarth', value: 15 },
];
const DUMMY_TIME_DATA = [
  { date: 'Day 1', contributions: 5 },
  { date: 'Day 2', contributions: 8 },
  { date: 'Day 3', contributions: 15 },
  { date: 'Day 4', contributions: 12 },
  { date: 'Day 5', contributions: 20 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AnalyticsGraph() {
  // 1. Create state variables to hold the data and loading status.
  const [memberData, setMemberData] = useState([]);
  const [timeData, setTimeData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Use useEffect to simulate fetching data when the component loads.
  useEffect(() => {
    // This function simulates an API call.
    const fetchData = () => {
      setLoading(true);
      // We use a 1-second delay to mimic a real network request.
      setTimeout(() => {
        setMemberData(DUMMY_MEMBER_DATA);
        setTimeData(DUMMY_TIME_DATA);
        setLoading(false); // Set loading to false after data is "fetched".
      }, 1000);
    };

    fetchData();
  }, []); // The empty array [] means this effect runs only once.

  // 3. Show a loading message while waiting for data.
  if (loading) {
    return <p className="text-center text-lg">Loading analytics...</p>;
  }

  // Once loading is false, render the charts.
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Card for the Pie Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Contribution Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          {/* 4. IMPORTANT: The 'data' prop now uses the 'memberData' state variable. */}
          <PieChart>
            <Pie
              data={memberData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {memberData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Card for the Line Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Contributions Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          {/* 5. IMPORTANT: The 'data' prop now uses the 'timeData' state variable. */}
          <LineChart data={timeData}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="contributions" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}