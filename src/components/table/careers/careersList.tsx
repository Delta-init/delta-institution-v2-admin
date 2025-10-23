"use client";
import React from "react";
import { DataTable } from "../../global/data-table";
import { careersColumns as columns } from "./columns";
import { DataTableSkeleton } from "../../global/table/data-table-skeleton";
import { useCareers } from "@/hooks/useCareers";

interface Props {}

const CareersList = (props: Props) => {
  // Showcasing the use of search params cache in nested RSCs

  const { data, isPending } = useCareers();

  if (isPending) return <DataTableSkeleton />;

  if (data) {
    const careers = data.careers || [];
    return <DataTable  search={"title"} data={careers} columns={columns}  />;
  }
  return null;
};

export default CareersList;
