"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
  
} from "@/components/ui/dialog";
import { Tooltip } from "@heroui/react";
import React, { useState } from "react";

type Props = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  content?: string;
  Open: boolean;
  outSideClickClose?: boolean;
};

const Modal = ({ children, description, title, trigger, className,Open=false }: Props) => {
  const [open, setOpen] = useState(Open);
  
  return (
    <Dialog  >
      <Tooltip
        delay={700}
        placement="bottom"
        color="secondary"
        showArrow
        content={title}
      >
        <DialogTrigger className={className} asChild>
          {trigger}
        </DialogTrigger>
      </Tooltip>
      <DialogOverlay className="" />
      <DialogContent  className=" ">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground/50">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
