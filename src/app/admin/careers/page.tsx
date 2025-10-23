"use client";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import React from "react";
import BlogList from "@/components/global/blogs/blogList";
import AnimatedButton from "@/components/global/globalButton";
import Link from "next/link";
import CareersList from "@/components/table/careers/careersList";

const page = () => {
  return (
    <PageContainer scrollable={true}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading title="careers 📝" description="careers Listing And Actions " />
          <div className="flex  w-1/2 items-center justify-end gap-2">
            <AnimatedButton
              isLoading={false}
              size="sm"
              text="Create"
              link="/admin/careers/create"
              className="w-min px-3 text-xs"
            />
          </div>
        </div>

        <Separator />
        <CareersList />
      </div>
    </PageContainer>
  );
};

export default page;
