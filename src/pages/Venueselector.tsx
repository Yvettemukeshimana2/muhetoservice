import React from "react";

interface VenueTypeSelectorProps {
  onSelect: (venueType: string) => void;
}

const VenueTypeSelector: React.FC<VenueTypeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold">Select Venue Type</h2>
      <div className="flex space-x-4">
        {["Party", "Concert", "Wedding", "Birthday"].map((venueType) => (
          <button
            key={venueType}
            onClick={() => onSelect(venueType)}
            className="bg-gray-200 p-2 rounded"
          >
            {venueType}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VenueTypeSelector;
