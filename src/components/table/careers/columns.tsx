"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "@/components/global/cell-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ICareers } from "@/types/ICareers";
import { FileTextIcon } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useDeleteCareer } from "@/hooks/useCareers";

// import { useDeleteUser } from "@/hooks/useUser"; // optional hook for deletion

export enum Roles {
  CLIENT = "client",
  ADMIN = "admin",
  DELIVERY_BOY = "delivery_boy",
}

export const careersColumns: ColumnDef<ICareers>[] = [
  {
    accessorKey: "rowNumber",
    header: "#",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div>{row.original.title}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div>{row.original.description.substring(0, 50)}...</div>
    ),
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => <div>{row.original.position}</div>,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div>{row.original.location}</div>,
  },
  {
    accessorKey: "salaryRange",
    header: "Salary Range",
    cell: ({ row }) => <div>{row.original.salaryRange}</div>,
  },
  {
    accessorKey: "documentLink",
    header: "Document",
    cell: ({ row }) => (
      <div>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            window.open(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/${row.original.documentLink}`,
              "_blank"
            )
          }
        >
          <FileTextIcon className="size-4" aria-hidden="true" />{" "}
        </Button>
      </div>
    ),
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
    accessorKey: "applications",
    header: "Applications",
    cell: ({ row }) => {
      const router = useRouter();
      return (
        <>
          <div>
            <Button
              variant="outline"
             
              onClick={() =>
                router.push(`/admin/careers/${row.original._id}`)
              }
            >
              See All Applications
            </Button>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const router = useRouter();
      const { mutate, isPending, isSuccess } = useDeleteCareer(
        row.original._id
      );
      return (
        <CellAction
          id={row.original._id}
          updateFn={() => {
            router.push(`/admin/careers/edit/${row.original._id}`);
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
