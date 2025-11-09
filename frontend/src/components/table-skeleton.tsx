import { TableCell, TableRow } from "~/components/ui/table";

const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  //   return (
  //     <div className="w-full overflow-auto">
  //       <table className="w-full border-collapse">
  //         <tbody>
  //           {[...Array(rows)].map((_, rowIndex) => (
  //             <tr key={rowIndex} className="border-b">
  //               {[...Array(columns)].map((_, colIndex) => (
  //                 <td key={colIndex} className="px-4 py-3">
  //                   <Skeleton className="h-4 w-full" />
  //                 </td>
  //               ))}
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   );

  return (
    <>
      {[...Array(rows)].map((_, rowIndex) => {
        return (
          <TableRow key={rowIndex}>
            {[...Array(columns)].map((_, columnIndex) => {
              return (
                <TableCell key={columnIndex}>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </>
  );
};

export default TableSkeleton;
