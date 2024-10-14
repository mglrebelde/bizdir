import React from 'react';
import { Business } from '../types';
import { Star, MapPin, Phone, Clock } from 'lucide-react';

interface BusinessCardProps {
  business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  return (
    <div className="zoon-card p-6 mb-4">
      <h2 className="text-xl font-bold mb-2 text-gray-800">{business.name}</h2>
      <p className="text-orange-500 font-medium mb-2">{business.category}</p>
      <p className="text-sm mb-4 text-gray-600">{business.description}</p>
      <div className="flex items-center mb-4">
        <Star className="w-5 h-5 text-yellow-400 mr-1" />
        <span className="font-medium">{business.rating.toFixed(1)}</span>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <p className="flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
          {business.address}
        </p>
        <p className="flex items-center">
          <Phone className="w-4 h-4 mr-2 text-gray-400" />
          {business.contactInfo.phone}
        </p>
        <p className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-gray-400" />
          {business.workingHours}
        </p>
      </div>
      <a
        href={business.website}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-orange-500 hover:underline"
      >
        Visit Website
      </a>
    </div>
  );
};

export default BusinessCard;