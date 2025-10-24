"use client";

import { useState } from "react";
import { Save, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "../ui/select";
import { useCreateCareer, useUpdateCareer } from "@/hooks/useCareers";
import { FileUploader } from "../global/fileUploader";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";

const CareersForm = ({ id }: { id?: string }) => {
  const [requirementInput, setRequirementInput] = useState("");
  const [category, setCategory] = useState("general");
  const [document, setDocument] = useState<File[]>([]);

  const hook = id ? useUpdateCareer(id) : useCreateCareer();
  const {
    form,
    errors,
    onFormSubmit,
    isPending,
    setRequirements,
    requirements,
    initiaFile,
    isLoading,
  } = hook;

  // Add Tag
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && requirementInput.trim() !== "") {
      e.preventDefault();

      const newTag = requirementInput.trim();

      if (!requirements.includes(newTag)) {
        const updatedTags = [...requirements, newTag];
        setRequirements(updatedTags);
        form.setValue("requirements", updatedTags);
      }

      setRequirementInput("");
    }
  };

  // Remove Tag
  const removeTag = (tagToRemove: string) => {
    const updatedTags = requirements.filter((tag) => tag !== tagToRemove);
    setRequirements(updatedTags);
    form.setValue("requirements", updatedTags);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin" size={24} />
      </div>
    );
  }
  return (
    <form
      onSubmit={onFormSubmit}
      className=" grid md:grid-cols-1 gap-4  w-full overflow-hidden"
    >
      {/* Title */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          className={cn(errors.title && "border-red-500")}
          id="title"
          {...form.register("title")}
          placeholder="Enter Job title"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          className={cn(errors.description && "border-red-500")}
          id="description"
          {...form.register("description")}
          placeholder="Enter Job description"
          rows={5}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Cover Image */}
      <div className="flex flex-col gap-2">
        <Label>Document</Label>
        <FileUploader
          className={cn(errors.document && "border-red-500")}
          value={document}
          initialFileLink={initiaFile}
          onValueChange={(file) => {
            setDocument(file);
            form.setValue("document", file[0]);
          }}
          onUpload={(files) => {
            return Promise.resolve();
          }}
          accept={{ "application/pdf": [".pdf"] }}
          maxFiles={1}
          maxSize={1024 * 1024 * 10} // 10MB
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="position">Position</Label>
        <Input
          className={cn(errors.position && "border-red-500")}
          id="position"
          {...form.register("position")}
          placeholder="Enter position"
        />
        {errors.position && (
          <p className="text-sm text-red-500">{errors.position.message}</p>
        )}
      </div>

      {/* Location */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="location">Location</Label>
        <Input
          className={cn(errors.location && "border-red-500")}
          id="location"
          {...form.register("location")}
          placeholder="Enter location"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Requirements</Label>
        <div className="flex flex-wrap  gap-2 px-3 py-2 border border-input rounded-lg  bg-muted-foreground/5 focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent transition-all">
          {requirements.map((tag) => (
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
            value={requirementInput}
            onChange={(e) => setRequirementInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter requirements and press Enter"
            className={cn(
              "flex-1 min-w-[150px] bg-transparent outline-none text-foreground placeholder:text-muted-foreground",
              errors.requirements && "border-red-500"
            )}
          />
        </div>
        {errors.requirements && (
          <p className="text-sm text-red-500">{errors.requirements.message}</p>
        )}
      </div>

      {/* Salary Range */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="salaryRange">Salary Range</Label>
        <Input
          className={cn(errors.salaryRange && "border-red-500")}
          id="salaryRange"
          {...form.register("salaryRange")}
          placeholder="Enter salary range"
        />
      </div>
      {/* Is Active */}
      <div className="flex items-center gap-2">
        <Label htmlFor="isActive">Is Active</Label>
        <Switch
          id="isActive"
          checked={form.watch("isActive")}
          onCheckedChange={(checked) => form.setValue("isActive", checked)}
        />
        {errors.isActive && (
          <p className="text-sm text-red-500">{errors.isActive.message}</p>
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
              <Save size={16} /> Publish Career
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default CareersForm;
