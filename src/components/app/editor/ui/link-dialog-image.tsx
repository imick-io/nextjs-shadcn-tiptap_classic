"use client";

import { Editor } from "@tiptap/react";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { ButtonToggle } from "../../button-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "../../icon";

interface Props {
  editor: Editor;
}

const FormSchema = z.object({
  src: z.string().url(),
  width: z.number().int().optional(),
  height: z.number().int().optional(),
});

export const LinkDialogImage: FC<Props> = ({ editor }) => {
  const { src = "" } = editor.getAttributes("image");

  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { src },
  });

  const setFormValues = useCallback(() => {
    form.setValue("src", src || "");
  }, [form, src]);

  const uploadFromComputerHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      editor.chain().focus().extendMarkRange("link").setImage({ src }).run();
    };

    reader.readAsDataURL(file);
  };

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setImage({ src: values.src })
      .run();

    // Reset the form
    form.reset();
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      setFormValues();
    }
  }, [open, setFormValues]);

  return (
    <>
      <Input
        ref={inputRef}
        className="hidden"
        aria-hidden
        type="file"
        accept="image/*"
        multiple={false}
        onChange={uploadFromComputerHandler}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ButtonToggle
            icon="Image"
            tooltip="Image"
            label="Image"
            active={!!src}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Icon name="Link" className="mr-2" />
            <span>By URL</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => inputRef.current?.click()}>
            <Icon name="Upload" className="mr-2" />
            <span>Upload from computer</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert image</DialogTitle>
            <DialogDescription className="sr-only">
              Insert an image by providing the URL of the image
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              <FormField
                control={form.control}
                name="src"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-4">
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/image.jpg"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit">Apply</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
