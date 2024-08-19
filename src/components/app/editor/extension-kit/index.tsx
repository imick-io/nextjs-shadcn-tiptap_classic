import { Text } from "@tiptap/extension-text";
import { Document } from "@tiptap/extension-document";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Heading } from "@tiptap/extension-heading";
import { FontFamily } from "@tiptap/extension-font-family";
import { TextStyle } from "@tiptap/extension-text-style";
import { Bold } from "@tiptap/extension-bold";
import { Italic } from "@tiptap/extension-italic";
import { Underline } from "@tiptap/extension-underline";
import { FontSize } from "./FontSize";
import { BulletList } from "@tiptap/extension-bullet-list";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { ListItem } from "@tiptap/extension-list-item";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Strike } from "@tiptap/extension-strike";
import { TextAlign } from "@tiptap/extension-text-align";
import { Superscript } from "@tiptap/extension-superscript";
import { Subscript } from "@tiptap/extension-subscript";
import { Code } from "@tiptap/extension-code";
import { Link } from "@tiptap/extension-link";

import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
const lowlight = createLowlight(all);

export const ExtensionKit = () => [
  Document,
  Paragraph,
  Placeholder.configure({
    placeholder: "Write something...",
  }),
  Text,
  Heading,
  TextStyle,
  FontFamily,
  Bold,
  Italic,
  Underline,
  FontSize,
  BulletList,
  OrderedList,
  ListItem,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  Strike,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Superscript,
  Subscript,
  Code,
  CodeBlockLowlight.configure({
    lowlight,
  }),
  Link.configure({
    protocols: ["http", "https", "mailto", "tel"],
    defaultProtocol: "https",
    openOnClick: false,
  }),
];
