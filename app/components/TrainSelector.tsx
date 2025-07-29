import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface TrainSelectorProps {
  selectedRoute: string;
  onRouteChange: (route: string) => void;
}

export function TrainSelector({ selectedRoute, onRouteChange }: TrainSelectorProps) {
  const trainRoutes = [
    { id: "express-101", name: "Express 101 - Downtown to Airport", active: true },
    { id: "local-205", name: "Local 205 - Suburban Circle", active: true },
    { id: "express-303", name: "Express 303 - North-South Corridor", active: true },
    { id: "local-412", name: "Local 412 - East-West Cross", active: false },
    { id: "express-501", name: "Express 501 - Metro Central", active: false },
    { id: "local-608", name: "Local 608 - Coastal Route", active: false },
    { id: "express-710", name: "Express 710 - Mountain Line", active: false },
  ];

  const activeRoutes = trainRoutes.filter(route => route.active);
  const inactiveRoutes = trainRoutes.filter(route => !route.active);

  return (
    <div className="w-full">
      <label className="block mb-6 text-center font-medium text-gray-900">
        Select train route
      </label>
      <Select value={selectedRoute} onValueChange={onRouteChange}>
        <SelectTrigger className="w-full h-14 border border-gray-300 bg-white hover:border-blue-600 focus:border-blue-600 transition-colors duration-200 px-4 font-normal text-gray-900">
          <SelectValue placeholder="Choose a train route..." />
        </SelectTrigger>
        <SelectContent className="border border-gray-200 shadow-lg bg-white">
          {/* Active Routes Section */}
          <div className="p-3">
            <div className="mb-3">
              <div className="text-blue-600 px-3 py-1 font-medium text-sm">
                Active routes
              </div>
            </div>
            {activeRoutes.map((route) => (
              <SelectItem 
                key={route.id} 
                value={route.id} 
                className="my-1 py-3 px-3 hover:bg-gray-50 focus:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                <span className="font-normal text-gray-900">{route.name}</span>
              </SelectItem>
            ))}
          </div>

          {/* Separator */}
          <div className="mx-3 my-2 border-t border-gray-200"></div>

          {/* Inactive Routes Section */}
          <div className="p-3">
            <div className="mb-3">
              <div className="text-gray-500 px-3 py-1 font-medium text-sm">
                Inactive routes
              </div>
            </div>
            {inactiveRoutes.map((route) => (
              <SelectItem 
                key={route.id} 
                value={route.id} 
                disabled
                className="my-1 py-3 px-3 opacity-50 cursor-not-allowed"
              >
                <span className="font-normal text-gray-500">{route.name} • Inactive</span>
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
}
