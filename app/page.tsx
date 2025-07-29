import { useState } from "react";
import { TrainSelector } from "./components/TrainSelector";
import { TrainTimetable } from "./components/TrainTimetable";

export default function App() {
  const [selectedRoute, setSelectedRoute] = useState<string>("");

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-12 lg:space-y-16">
        {/* Header with minimalist logo */}
        <div className="text-center space-y-8 px-4">
          {/* Minimalist RailTrack logo */}
          <div className="inline-flex items-center justify-center mb-12">
            <div className="flex items-center gap-4">
              {/* Simple geometric train icon */}
              <div className="flex items-center gap-1">
                <div className="w-2 h-4 bg-blue-600"></div>
                <div className="w-6 h-4 bg-blue-600"></div>
                <div className="w-2 h-4 bg-blue-600"></div>
              </div>
              {/* Logo text */}
              <div className="text-gray-900 font-medium text-2xl tracking-wide">
                RailTrack
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 leading-tight">
            Train arrival times
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
            Real-time tracking with source and verified arrival estimates
          </p>
        </div>

        {/* Train Route Selector */}
        <div className="flex justify-center px-4">
          <div className="w-full max-w-xl bg-white p-8 shadow-sm border border-gray-200">
            <TrainSelector 
              selectedRoute={selectedRoute} 
              onRouteChange={setSelectedRoute} 
            />
          </div>
        </div>

        {/* Timetable */}
        <div className="px-4">
          <TrainTimetable selectedRoute={selectedRoute} />
        </div>
      </div>
    </div>
  );
}
