"use client";
import React from "react";
import { DataTable } from "../../global/data-table";
import { teamColumns as columns } from "./columns";
import { DataTableSkeleton } from "../../global/table/data-table-skeleton";
import { useTeam } from "@/hooks/useTeam";

interface Props {}

const TeamList = (props: Props) => {
  // Showcasing the use of search params cache in nested RSCs

  const { data, isPending } = useTeam();

  if (isPending) return <DataTableSkeleton />;

  if (data) {
    const team = data.team || [];
    return <DataTable  search={"name"} data={team} columns={columns}  />;
  }
  return null;
};

export default TeamList;
