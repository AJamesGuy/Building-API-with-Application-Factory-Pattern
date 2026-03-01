// src/components/Display/MechanicRankingCard.jsx
import React from 'react';

const MechanicRankingCard = ({ mechanic, rank }) => {
  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return '#FFD700'; // Gold
      case 2:
        return '#C0C0C0'; // Silver
      case 3:
        return '#CD7F32'; // Bronze
      default:
        return '#6A7062'; // Default
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Rank Badge */}
      <div className="relative">
        <div
          className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg"
          style={{ backgroundColor: getRankColor(rank) }}
        >
          {getRankIcon(rank)}
        </div>
      </div>

      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#0B5351' }}>
            <span className="text-white text-xl font-bold">
              {mechanic.first_name.charAt(0)}{mechanic.last_name.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">
              {mechanic.first_name} {mechanic.last_name}
            </h3>
            <p className="text-gray-400 text-sm">{mechanic.email}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-700 rounded-lg">
            <p className="text-2xl font-bold text-[#0B5351]">{mechanic.service_tickets?.length || 0}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Tickets Completed</p>
          </div>
          <div className="text-center p-4 bg-gray-700 rounded-lg">
            <p className="text-2xl font-bold text-[#6A7062]">${mechanic.salary || 0}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Salary</p>
          </div>
        </div>

        {/* Performance Indicator */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Performance</span>
            <span className="text-sm text-white font-semibold">
              {rank <= 3 ? 'Excellent' : rank <= 5 ? 'Good' : 'Average'}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${Math.max(20, 100 - (rank - 1) * 15)}%`,
                backgroundColor: getRankColor(rank)
              }}
            ></div>
          </div>
        </div>

        {/* Special Badge for Top Performers */}
        {rank <= 3 && (
          <div className="mt-4 flex justify-center">
            <div
              className="px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1"
              style={{ backgroundColor: getRankColor(rank) }}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Top Performer
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MechanicRankingCard;