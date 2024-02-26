"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import IconButton from "@mui/joy/IconButton";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import CommentTextInput from "./CommentTextInput";

import { useState } from "react";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";

export function RecipeDetailDialog({ isDesktop, thumbnail, recipeTitle }) {
  const [open, setOpen] = useState(false);

  if (isDesktop) {
    return (
      <Dialog
        className="max-h-96 overflow-auto"
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>
          <CardOverflow>
            <AspectRatio>
              <img src={thumbnail[0]?.url} alt="food" loading="lazy" />
            </AspectRatio>
          </CardOverflow>
        </DialogTrigger>
        <DialogContent className="md:max-h-[500px] overflow-auto no-scrollbar">
          <DialogHeader>
            <DialogTitle>{recipeTitle} </DialogTitle>
            <DialogDescription>View all comments</DialogDescription>
          </DialogHeader>
          {/* component to display the data*/}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <CardOverflow>
          <AspectRatio>
            <img src={thumbnail[0]?.url} alt="food" loading="lazy" />
          </AspectRatio>
        </CardOverflow>
      </DrawerTrigger>
      <DrawerContent className="md:max-h-[500px] overflow-auto no-scrollbar">
        <DrawerHeader className="text-left">
          <DrawerTitle>{recipeTitle} </DrawerTitle>
          <DrawerDescription>View all comments</DrawerDescription>
        </DrawerHeader>
        {/* component to display the data */}

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}