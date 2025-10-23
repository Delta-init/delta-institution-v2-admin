"use client";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import React from "react";
import BlogList from "@/components/global/blogs/blogList";
import AnimatedButton from "@/components/global/globalButton";
import Link from "next/link";
import CareersList from "@/components/table/careers/careersList";
import { useGetApplicationsByCareerId } from "@/hooks/useCareers";
import ApplicationList from "@/components/table/appliactions/applicationList";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { applications, isPending, career } = useGetApplicationsByCareerId(id);
  if (!career) {
    return <div>Career not found</div>;
  }
  return (
    <PageContainer scrollable={true}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={`application of ${career?.title}`} description="careers Listing And Actions " />
         
        </div>

        <Separator />
        <ApplicationList applications={applications} isPending={isPending} />
      </div>
    </PageContainer>
  );
};

export default page;
