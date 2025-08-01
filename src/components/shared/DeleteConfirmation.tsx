"use client"

import { useTransition } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteImage } from "@/lib/actions/image.actions"
import { Button } from "@/components/ui/button"

export const DeleteConfirmation = ({ imageId }: { imageId: string }) => {
  const [isPending, startTransition] = useTransition()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" className="button h-[44px] w-full md:h-[54px]" variant="destructive">
          Delete Image
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col gap-10">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this image?
          </AlertDialogTitle>
          <AlertDialogDescription className="p-16-regular">
            This will permanently delete this image
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex w-full gap-4">
          <AlertDialogCancel 
            type="button" 
            className="button w-full bg-dark-400"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            type="button"
            className="button w-full bg-gradient-to-r from-orange-400 to-orange-600"
            onClick={() =>
              startTransition(async () => {
                await deleteImage(imageId)
              })
            }
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}