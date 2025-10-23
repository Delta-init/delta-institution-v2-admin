"use client";
import React from "react";
import { DataTable } from "../../global/data-table";
import { applicationsColumns as columns } from "./columns";
import { DataTableSkeleton } from "../../global/table/data-table-skeleton";
import { IApplication } from "@/types/IApplication";

interface Props {
  applications: IApplication[];
  isPending: boolean;
}

const ApplicationList = ({
  applications,
  isPending,
}: Props) => {
  // Showcasing the use of search params cache in nested RSCs


  if (isPending) return <DataTableSkeleton />;

  if (applications) {
    return <DataTable  search={"title"} data={applications} columns={columns}  />;
  }
  return null;
};

export default ApplicationList;
