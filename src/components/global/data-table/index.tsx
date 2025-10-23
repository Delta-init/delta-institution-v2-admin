"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { SearchIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function DataTable({
  columns,
  data,
  search: searchProps,
}: {
  columns: any;
  data: any;
  search?: any;
}) {
  const [search, setSearch] = React.useState<string>(searchProps ?? "");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const isMobile = useIsMobile();

  // Custom global filter function that searches across multiple fields
  const globalFilterFn = React.useCallback(
    (row: any, columnId: string, value: string) => {
      const searchValue = value.toLowerCase();

      // Search in user_name, user_email, amount, and status fields
      const searchFields = Object.values(row.original);

      return searchFields.some(
        (field) => field && field.toString().toLowerCase().includes(searchValue)
      );
    },
    []
  );
  const [perPage, setPerPage] = React.useState(10);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: perPage,
  });

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(data.length / pagination.pageSize),
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination,
    },
    getFilteredRowModel: getFilteredRowModel(), // column filtering
    globalFilterFn, // your custom search logic
    onGlobalFilterChange: setGlobalFilter,
  });
  const { state: sidebarState } = useSidebar();

  return (
    <ScrollArea
      className={cn(
        " w-[82vw] ",
        sidebarState === "expanded" ? "md:w-[80vw]  " : "md:w-[92vw]  "
      )}
    >
      <div className="md:w-full w-[82vw]">
        <div className="flex items-center py-4">
          {search && (
            <div className="flex gap-2 relative items-center">
              <SearchIcon className="w-4 md:block hidden text-foreground/80 h-4 absolute left-2" />
              <Input
                placeholder={`Search Globaly...`}
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="md:max-w-sm md:px-8   w-auto h-8 rounded-xl bg-foreground/5"
              />
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="ml-auto bg-foreground/5"
              >
                {isMobile ? "Cols" : "Columns"} <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md overflow-hidden">
          <Table>
            <TableHeader className="bg-primary text-primary-foreground">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="text-primary-foreground"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="border-b border-border/70 bg-muted/50">
              {table &&
              table.getRowModel() &&
              table.getRowModel().rows &&
              table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-start">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center px-2 justify-between space-x-2 py-4">
          <Select
            value={perPage.toString()}
            onValueChange={(value) => {
              console.log(value, Number(value));
              setPerPage(Number(value));
              setPagination((prev) => ({
                ...prev,
                pageSize: Number(value),
              }));
            }}
          >
            <SelectTrigger className=" text-xs cursor-pointer w-min">
              {isMobile ? ` ${perPage}` : `Rows per page: ${perPage}`}
            </SelectTrigger>
            <SelectContent className="w-min">
              {[10, 20, 30, 40, 50].map((item) => (
                <SelectItem
                  key={item}
                  value={item.toString()}
                  className="  cursor-pointer "
                >
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className=" text-sm text-muted-foreground">
            Showing {table.getRowModel().rows.length} of{" "}
            {table.getPrePaginationRowModel().rows.length} rows.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
