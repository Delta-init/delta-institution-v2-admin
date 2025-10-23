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
import { IApplication } from "@/types/IApplication";

// import { useDeleteUser } from "@/hooks/useUser"; // optional hook for deletion

export enum Roles {
  CLIENT = "client",
  ADMIN = "admin",
  DELIVERY_BOY = "delivery_boy",
}

export const applicationsColumns: ColumnDef<IApplication>[] = [
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
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div>{row.original.phone}</div>,
  },

  {
    accessorKey: "resumeLink",
    header: "Resume",
    cell: ({ row }) => (
      <div>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            window.open(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/${row.original.resumeLink}`,
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
    accessorKey: "uploadedAt",
    header: "Uploaded At",
    cell: ({ row }) => <div>{new Date(row.original.createdAt as unknown as string).toLocaleDateString()}</div>,
  },
  
];
