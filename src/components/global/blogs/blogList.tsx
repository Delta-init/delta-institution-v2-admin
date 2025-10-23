"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AnimatedButton from "../globalButton";
import { useBlogs } from "@/hooks/useBlog";
import { useRouter } from "nextjs-toploader/app";
import { Badge } from "../../ui/badge";

export default function BlogList() {
  const { blogs: posts = [], isPending: isLoading } = useBlogs();
  const router=useRouter()
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="h-[360px] animate-pulse">
            <div className="h-40 bg-muted rounded-t-lg" />
            <CardHeader>
              <div className="h-6 bg-muted rounded w-3/4" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-5/6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">No blog posts yet</h2>
        <p className="text-muted-foreground mb-6">
          Create your first blog post to get started!
        </p>
        <Link href="/admin/blogs/create">
          <AnimatedButton
            isLoading={false}
            text="Create New Blog"
            link="/admin/blogs/create"
            className="w-min px-3"
          />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {posts.map((post, index) => (
        <motion.div
          key={post._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-40 w-full">
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${post.image}` || "/placeholder.webp"}
                alt={post.title}
              
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {post.description}
              </CardDescription>
              {
                post.tags.map((tag) => (
                  <Badge className="w-min bg-muted" key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))
              }
            </CardHeader>
            <CardContent className="flex-grow"></CardContent>
            <CardFooter className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </span>
              {/* <Link href={`/admin/blogs/${post._id}`}> */}
                <Button onClick={() => router.push(`/admin/blogs/${post._id}`)} variant="outline" size="sm">
                  Read More
                </Button>
              {/* </Link> */}
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
