import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { MapPin, School, Home } from 'lucide-react';

interface InfrastructureData {
  schools: {
    name: string;
    existing: number;
    required: number;
  }[];
  healthcare: {
    name: string;
    existing: number;
    required: number;
  }[];
  developmentTrend: {
    month: string;
    schools: number;
    healthcare: number;
    housing: number;
  }[];
}

const InfrastructureDashboard: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('Region A');
  
  // Sample data - in real application, this would come from API/database
  const infrastructureData: InfrastructureData = {
    schools: [
      { name: 'Region A', existing: 45, required: 60 },
      { name: 'Region B', existing: 30, required: 50 },
      { name: 'Region C', existing: 25, required: 40 }
    ],
    healthcare: [
      { name: 'Region A', existing: 20, required: 30 },
      { name: 'Region B', existing: 15, required: 25 },
      { name: 'Region C', existing: 10, required: 20 }
    ],
    developmentTrend: [
      { month: 'Jan', schools: 45, healthcare: 20, housing: 150 },
      { month: 'Feb', schools: 47, healthcare: 22, housing: 155 },
      { month: 'Mar', schools: 48, healthcare: 23, housing: 158 }
    ]
  };

  return (
    <div className="p-6">
      {/* Region Selection */}
      <div className="mb-6">
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="Region A">Region A</option>
          <option value="Region B">Region B</option>
          <option value="Region C">Region C</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>
              <School className="w-4 h-4 mr-2 inline-block" /> Schools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span>Existing: {infrastructureData.schools.find(s => s.name === selectedRegion)?.existing || 0}</span>
              <span>Required: {infrastructureData.schools.find(s => s.name === selectedRegion)?.required || 0}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <MapPin className="w-4 h-4 mr-2 inline-block" /> Healthcare Facilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span>Existing: {infrastructureData.healthcare.find(h => h.name === selectedRegion)?.existing || 0}</span>
              <span>Required: {infrastructureData.healthcare.find(h => h.name === selectedRegion)?.required || 0}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Home className="w-4 h-4 mr-2 inline-block" /> Housing Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span>Existing: {150}</span>
              <span>Required: {200}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Infrastructure Gap Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Infrastructure Gap Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart width={600} height={300} data={infrastructureData.schools}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="existing" fill="#8884d8" name="Existing" />
              <Bar dataKey="required" fill="#82ca9d" name="Required" />
            </BarChart>
          </CardContent>
        </Card>

        {/* Development Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Development Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart width={600} height={300} data={infrastructureData.developmentTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="schools" stroke="#8884d8" name="Schools" />
              <Line type="monotone" dataKey="healthcare" stroke="#82ca9d" name="Healthcare" />
              <Line type="monotone" dataKey="housing" stroke="#ffc658" name="Housing" />
            </LineChart>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InfrastructureDashboard;
