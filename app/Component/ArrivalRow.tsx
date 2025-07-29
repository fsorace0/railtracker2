import { Badge } from "./ui/badge";
import { TableCell, TableRow } from "./ui/table";

interface ArrivalData {
  station: string;
  scheduledTime: string;
  sourceEstimated: string;
  trueEstimated: string;
  delay: number; // in minutes
  status: 'on-time' | 'delayed' | 'early' | 'cancelled';
}

interface ArrivalRowProps {
  arrival: ArrivalData;
}

export function ArrivalRow({ arrival }: ArrivalRowProps) {
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
            Delayed {delay}m
          </Badge>
        );
      case 'early':
        return (
          <Badge className="bg-blue-100 text-blue-800 px-3 py-1 font-medium text-xs">
            Early {Math.abs(delay)}m
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

  return (
    <TableRow className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
      <TableCell className="font-medium py-3 px-4 text-gray-900">
        {arrival.station}
      </TableCell>
      <TableCell className="py-3 px-3">
        <div className="bg-gray-100 px-3 py-2 text-center font-mono text-sm text-gray-900">
          {arrival.scheduledTime}
        </div>
      </TableCell>
      <TableCell className="py-3 px-3">
        <div className="bg-blue-50 border border-blue-200 px-3 py-2 text-center font-mono text-sm text-gray-900">
          {arrival.sourceEstimated}
        </div>
      </TableCell>
      <TableCell className="py-3 px-3">
        <div className="bg-green-50 border border-green-200 px-3 py-2 text-center font-mono text-sm text-gray-900">
          {arrival.trueEstimated}
        </div>
      </TableCell>
      <TableCell className="py-3 px-4">
        {getStatusBadge(arrival.status, arrival.delay)}
      </TableCell>
    </TableRow>
  );
}
