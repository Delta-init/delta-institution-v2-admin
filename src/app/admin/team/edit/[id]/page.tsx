"use client";

import { useRouter } from "nextjs-toploader/app";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PageContainer from "@/components/layout/page-container";
import { Card, CardContent } from "@/components/ui/card";
import TeamForm from "@/components/forms/teamForm";
import { useParams } from "next/navigation";

export default function EditorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  return (
    <PageContainer scrollable={true}>
      <div className="max-w-[99vw] w-full ">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >

          <h1 className="text-3xl font-bold">Edit Team</h1>
        </motion.div>
        <TeamForm id={id} />
      </div>
    </PageContainer>
  );
}
