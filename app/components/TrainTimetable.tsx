import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import { ArrivalRow } from "./ArrivalRow";
import { Badge } from "./ui/badge";

interface TrainTimetableProps {
  selectedRoute: string;
}

interface ArrivalData {
  station: string;
  scheduledTime: string;
  sourceEstimated: string;
  trueEstimated: string;
  delay: number;
  status: 'on-time' | 'delayed' | 'early' | 'cancelled';
}

export function TrainTimetable({ selectedRoute }: TrainTimetableProps) {
  // Route information including active status
  const routeInfo = {
    "express-101": { name: "Express 101 - Downtown to Airport", active: true },
    "local-205": { name: "Local 205 - Suburban Circle", active: true },
    "express-303": { name: "Express 303 - North-South Corridor", active: true },
    "local-412": { name: "Local 412 - East-West Cross", active: false },
    "express-501": { name: "Express 501 - Metro Central", active: false },
    "local-608": { name: "Local 608 - Coastal Route", active: false },
    "express-710": { name: "Express 710 - Mountain Line", active: false },
  };

  // Mock data for different train routes (only active routes have data)
  const mockArrivalData = {
    "express-101": [
      { station: "Central Station", scheduledTime: "14:15", sourceEstimated: "14:17", trueEstimated: "14:19", delay: 4, status: 'delayed' as const },
      { station: "Metro Plaza", scheduledTime: "14:22", sourceEstimated: "14:24", trueEstimated: "14:26", delay: 4, status: 'delayed' as const },
      { station: "Business District", scheduledTime: "14:28", sourceEstimated: "14:28", trueEstimated: "14:28", delay: 0, status: 'on-time' as const },
      { station: "University Hub", scheduledTime: "14:35", sourceEstimated: "14:33", trueEstimated: "14:33", delay: -2, status: 'early' as const },
      { station: "Shopping Center", scheduledTime: "14:42", sourceEstimated: "14:40", trueEstimated: "14:40", delay: -2, status: 'early' as const },
      { station: "Hospital Stop", scheduledTime: "14:48", sourceEstimated: "14:46", trueEstimated: "14:46", delay: -2, status: 'early' as const },
      { station: "Residential Zone", scheduledTime: "14:55", sourceEstimated: "14:53", trueEstimated: "14:53", delay: -2, status: 'early' as const },
      { station: "Airport Terminal", scheduledTime: "15:02", sourceEstimated: "15:00", trueEstimated: "15:00", delay: -2, status: 'early' as const },
    ],
    "local-205": [
      { station: "Suburban Center", scheduledTime: "14:10", sourceEstimated: "14:10", trueEstimated: "14:10", delay: 0, status: 'on-time' as const },
      { station: "Oak Valley", scheduledTime: "14:18", sourceEstimated: "14:18", trueEstimated: "14:18", delay: 0, status: 'on-time' as const },
      { station: "Pine Ridge", scheduledTime: "14:25", sourceEstimated: "14:27", trueEstimated: "14:28", delay: 3, status: 'delayed' as const },
      { station: "Maple Heights", scheduledTime: "14:33", sourceEstimated: "14:35", trueEstimated: "14:36", delay: 3, status: 'delayed' as const },
      { station: "Cedar Park", scheduledTime: "14:40", sourceEstimated: "14:42", trueEstimated: "14:43", delay: 3, status: 'delayed' as const },
      { station: "Birch Lane", scheduledTime: "14:47", sourceEstimated: "14:49", trueEstimated: "14:50", delay: 3, status: 'delayed' as const },
      { station: "Willow Creek", scheduledTime: "14:54", sourceEstimated: "14:56", trueEstimated: "14:57", delay: 3, status: 'delayed' as const },
      { station: "Elm Street", scheduledTime: "15:01", sourceEstimated: "15:03", trueEstimated: "15:04", delay: 3, status: 'delayed' as const },
    ],
    "express-303": [
      { station: "North Terminal", scheduledTime: "14:05", sourceEstimated: "14:05", trueEstimated: "14:05", delay: 0, status: 'on-time' as const },
      { station: "Midtown Station", scheduledTime: "14:20", sourceEstimated: "14:20", trueEstimated: "14:20", delay: 0, status: 'on-time' as const },
      { station: "City Center", scheduledTime: "14:35", sourceEstimated: "14:32", trueEstimated: "14:32", delay: -3, status: 'early' as const },
      { station: "Financial District", scheduledTime: "14:42", sourceEstimated: "14:39", trueEstimated: "14:39", delay: -3, status: 'early' as const },
      { station: "Arts Quarter", scheduledTime: "14:50", sourceEstimated: "14:47", trueEstimated: "14:47", delay: -3, status: 'early' as const },
      { station: "Sports Complex", scheduledTime: "14:58", sourceEstimated: "14:55", trueEstimated: "14:55", delay: -3, status: 'early' as const },
      { station: "Convention Center", scheduledTime: "15:05", sourceEstimated: "15:02", trueEstimated: "15:02", delay: -3, status: 'early' as const },
      { station: "South Terminal", scheduledTime: "15:15", sourceEstimated: "15:12", trueEstimated: "15:12", delay: -3, status: 'early' as const },
    ],
  };

  const getStatusBadge = (status: string, delay: number) => {
    switch (status) {
      case 'on-time':
        return (
          <Badge className="bg-green-100 text-green-800 px-3 py-1 font-medium text-xs">
            On time
          </Badge>
        );
      case 'delayed':
        return (
          <Badge className="bg-red-100 text-red-800 px-3 py-1 font-medium text-xs">
            +{delay}m
          </Badge>
        );
      case 'early':
        return (
          <Badge className="bg-blue-100 text-blue-800 px-3 py-1 font-medium text-xs">
            -{Math.abs(delay)}m
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge className="bg-gray-100 text-gray-800 px-3 py-1 font-medium text-xs">
            Cancelled
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 px-3 py-1 font-medium text-xs">
            Unknown
          </Badge>
        );
    }
  };

  const currentRoute = routeInfo[selectedRoute as keyof typeof routeInfo];
  const arrivals = mockArrivalData[selectedRoute as keyof typeof mockArrivalData] || [];

  if (!selectedRoute) {
    return (
      <Card className="w-full border border-gray-200 shadow-sm bg-white">
        <CardContent className="flex items-center justify-center py-20">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <div className="w-6 h-3 bg-gray-400"></div>
            </div>
            <p className="text-gray-600 text-lg px-4">
              Please select a train route to view arrival times
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Handle inactive routes
  if (currentRoute && !currentRoute.active) {
    return (
      <Card className="w-full border border-gray-200 shadow-sm bg-white">
        <CardContent className="flex items-center justify-center py-20">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <div className="w-6 h-3 bg-gray-400"></div>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">{currentRoute.name}</h3>
              <p className="text-gray-600 text-lg px-4">
                This route is currently inactive
              </p>
              <Badge className="bg-gray-100 text-gray-600 px-3 py-1 font-medium">
                Service suspended
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Handle unknown routes
  if (!currentRoute) {
    return (
      <Card className="w-full border border-gray-200 shadow-sm bg-white">
        <CardContent className="flex items-center justify-center py-20">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <div className="w-6 h-3 bg-gray-400"></div>
            </div>
            <p className="text-gray-600 text-lg px-4">Route not found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border border-gray-200 shadow-sm bg-white overflow-hidden">
      <CardHeader className="pb-4 px-6 pt-6 bg-white border-b border-gray-100">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-8 h-8 bg-blue-600 flex items-center justify-center">
            <div className="w-4 h-2 bg-white"></div>
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-xl font-medium text-gray-900 leading-tight">
              {currentRoute.name}
            </CardTitle>
            <p className="text-gray-600 text-sm mt-1">
              Live arrival times updated every 30 seconds
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Mobile Card Layout (< md) */}
        <div className="block md:hidden">
          <div className="space-y-3 p-4">
            {arrivals.map((arrival, index) => (
              <Card key={index} className="bg-gray-50 border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium text-sm text-gray-900">{arrival.station}</h3>
                    {getStatusBadge(arrival.status, arrival.delay)}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="text-center">
                      <p className="text-gray-600 mb-2 font-medium">Scheduled</p>
                      <div className="bg-gray-200 px-2 py-2 text-center font-mono text-gray-900">
                        {arrival.scheduledTime}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600 mb-2 font-medium">Via estimate</p>
                      <div className="bg-blue-50 border border-blue-200 px-2 py-2 text-center font-mono text-gray-900">
                        {arrival.sourceEstimated}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600 mb-2 font-medium">Our estimate</p>
                      <div className="bg-green-50 border border-green-200 px-2 py-2 text-center font-mono text-gray-900">
                        {arrival.trueEstimated}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Desktop Table Layout (≥ md) */}
        <div className="hidden md:block overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b border-gray-200">
                <TableHead className="py-3 px-4 font-medium text-gray-900">Station</TableHead>
                <TableHead className="py-3 px-3 font-medium text-gray-900">Scheduled</TableHead>
                <TableHead className="py-3 px-3 font-medium text-gray-900">Via estimate</TableHead>
                <TableHead className="py-3 px-3 font-medium text-gray-900">Our estimate</TableHead>
                <TableHead className="py-3 px-4 font-medium text-gray-900">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {arrivals.map((arrival, index) => (
                <ArrivalRow key={index} arrival={arrival} />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
