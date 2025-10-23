"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "@/components/global/cell-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ITeam } from "@/types/ITeam";
import { useRouter } from "nextjs-toploader/app";
import { useDeleteTeam } from "@/hooks/useTeam";

// import { useDeleteUser } from "@/hooks/useUser"; // optional hook for deletion

export const teamColumns: ColumnDef<ITeam>[] = [
  {
    accessorKey: "rowNumber",
    header: "#",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => <div>{row.original.position}</div>,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => <div className="cursor-pointer" onClick={() => window.open(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${row.original.image}`, "_blank")}>
      <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${row.original.image}`} alt={row.original.name} className="w-8 object-cover rounded-md" />
    </div >,
  },
  {
    accessorKey: "showingPosition",
    header: "Showing Position",
    cell: ({ row }) => <div>{row.original.showingPosition}</div>,
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => (
      <div>
        <Badge variant={row.original.isActive ? "default" : "destructive"}>
          {row.original.isActive ? "Active" : "Inactive"}
        </Badge>
      </div>
    ),
  },
  
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const router = useRouter();
      const { mutate, isPending, isSuccess } = useDeleteTeam(
        row.original._id
      );
      return (
        <CellAction
          id={row.original._id}
          updateFn={() => {
            router.push(`/admin/team/edit/${row.original._id}`);
          }}
          deletFn={() => {
            mutate(row.original._id);
          }}
          dltLoading={isPending}
          isSuccess={isSuccess}
        />
      );
    },
  },
];
