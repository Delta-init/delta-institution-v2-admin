"use client";

import { useState } from "react";
import { Save, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/global/imageUploader";
import { Editor } from "@/components/global/text-editor/editor";
import { useCreateBlog, useUpdateBlog } from "@/hooks/useBlog";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "../ui/select";

const BlogForm = ({ id }: { id?: string }) => {
  const [tagInput, setTagInput] = useState("");
  const [category, setCategory] = useState("general");

  const hook = id ? useUpdateBlog(id) : useCreateBlog();
  const {
    form,
    errors,
    onFormSubmit,
    isPending,
    setContent,
    tags,
    setTags,
    initiaImage,
  } = hook;

  // Add Tag
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();

      const newTag = tagInput.trim();

      if (!tags.includes(newTag)) {
        const updatedTags = [...tags, newTag];
        setTags(updatedTags);
        form.setValue("tags", updatedTags);
      }

      setTagInput("");
    }
  };

  // Remove Tag
  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    form.setValue("tags", updatedTags);
  };

  return (
    <form onSubmit={onFormSubmit} className="space-y-8 w-full overflow-hidden">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...form.register("title")}
          placeholder="Enter blog title"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...form.register("description")}
          placeholder="Enter blog description"
          rows={5}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={form.watch("category") || "general"}
          onValueChange={(value) => form.setValue("category", value)}
        >
          <SelectTrigger className="w-full bg-muted-foreground/5 border border-input rounded-md p-2">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="hiring">Hiring</SelectItem>
            <SelectItem value="award">Award</SelectItem>
            <SelectItem value="others">Others</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cover Image */}
      <div className="space-y-2">
        <Label>Cover Image</Label>
        <ImageUploader
          initialImage={
            initiaImage && `${process.env.NEXT_PUBLIC_BACKEND_URL}/${initiaImage}`
          }
          onImageSelected={(url) => {
            form.setValue("image", url as any);
          }}
        />
      </div>

      {/* Content */}
      <div className="space-y-2 w-full overflow-hidden">
        <Label>Content</Label>
        <Editor onChange={(editorState: any) => setContent(editorState)} />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap  gap-2 px-3 py-2 border border-input rounded-lg  bg-muted-foreground/5 focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent transition-all">
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium"
            >
              <span>{tag}</span>
              <button
                onClick={() => removeTag(tag)}
                type="button"
                className="hover:opacity-70 transition-opacity"
              >
                <X size={16} />
              </button>
            </div>
          ))}

          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter blog tags and press Enter"
            className="flex-1 min-w-[150px] bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>
        {errors.tags && (
          <p className="text-sm text-red-500">{errors.tags.message}</p>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          type="submit"
          className="flex items-center gap-2"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" size={16} /> Saving...
            </>
          ) : (
            <>
              <Save size={16} /> Publish Blog Post
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default BlogForm;
