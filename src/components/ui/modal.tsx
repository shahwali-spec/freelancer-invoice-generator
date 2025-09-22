"use client";
import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ModalProps {
    triggerText: string;
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
    triggerVariant?: "default" | "secondary" | "outline" | "ghost" | "link";
}

const Modal: React.FC<ModalProps> = ({
    triggerText,
    title,
    description,
    children,
    className,
    triggerVariant = "default",
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={triggerVariant} className={cn("font-medium", className)}>
                    {triggerText}
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-background rounded-2xl shadow-lg p-6">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold tracking-tight">
                        {title}
                    </DialogTitle>
                    {description && (
                        <DialogDescription className="text-muted-foreground">
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>
                <div className="py-4">{children}</div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary" className="rounded-xl">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export { Modal };