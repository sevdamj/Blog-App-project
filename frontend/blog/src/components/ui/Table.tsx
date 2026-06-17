import { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

interface TableHeaderProps {
  children: ReactNode;
}

interface TableBodyProps {
  children: ReactNode;
}

interface TableRowProps {
  children: ReactNode;
}

function Table({ children }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-xl">
      <table className="min-w-full divide-y divide-secondary-100">
        {children}
</table>
    </div>
  );
}

function TableHeader({ children }: TableHeaderProps) {
  return (
    <thead className="bg-secondary-100/30">
      <tr className="text-center text-sm font-semibold text-secondary-300">
        {children}
      </tr>
    </thead>
  );
}

function TableBody({ children }: TableBodyProps) {
  return <tbody className="divide-y divide-secondary-100/20">{children}</tbody>;
}

function TableRow({ children }: TableRowProps) {
  return (
    <tr className="hover:bg-secondary-50 transition-colors duration-200 text-center">
      {children}
    </tr>
  );
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;

export default Table;