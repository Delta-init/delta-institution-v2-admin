"use client";

import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTeam, useUpdateTeam } from "@/hooks/useTeam";
import { FileUploader } from "../global/fileUploader";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";

const TeamForm = ({ id }: { id?: string }) => {
  const [image, setImage] = useState<File | null>(null);

  const hook = id ? useUpdateTeam(id) : useCreateTeam();
  const { form, errors, onFormSubmit, isPending, initiaFile, isLoading } = hook;

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
      {/* Name */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          className={cn(errors.name && "border-red-500")}
          id="name"
          {...form.register("name")}
          placeholder="Enter name"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Position */}
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

      {/* Image */}
      <div className="flex flex-col gap-2">
        <Label>Image</Label>
        <FileUploader
          className={cn(errors.image && "border-red-500")}
          value={image ? [image] : []}
          initialFileLink={initiaFile}
          onValueChange={(file) => {
            setImage(file[0] as File);
            form.setValue("image", file[0] as File);
          }}
          onUpload={(files) => {
            return Promise.resolve();
          }}
          accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] }}
          maxFiles={1}
          maxSize={1024 * 1024 * 10} // 10MB
        />
      </div>

      {/* Showing Position */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="showingPosition">Showing Position</Label>
        <Input
          className={cn(errors.showingPosition && "border-red-500")}
          id="showingPosition"
          {...form.register("showingPosition")}
          onChange={(e) => {
            if (e.target.value === "") {
              form.setValue("showingPosition", 0);
            } else {
              console.log(e.target.value,Number(e.target.value),"🟢🟢");
              form.setValue("showingPosition", Number(e.target.value));
            }
          }}
          placeholder="Enter showing position"
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
              <Save size={16} /> Publish Team
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default TeamForm;
