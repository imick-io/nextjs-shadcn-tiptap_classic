import { Text } from "@tiptap/extension-text";
import { Document } from "@tiptap/extension-document";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Heading } from "@tiptap/extension-heading";
import { FontFamily } from "@tiptap/extension-font-family";
import { TextStyle } from "@tiptap/extension-text-style";
import { Bold } from "@tiptap/extension-bold";
import { Italic } from "@tiptap/extension-italic";
import { Underline } from "@tiptap/extension-underline";
import { FontSize } from "./FontSize";

export const ExtensionKit = () => [
  Document,
  Paragraph,
  Text,
  Heading,
  TextStyle,
  FontFamily,
  Bold,
  Italic,
  Underline,
  FontSize,
];
