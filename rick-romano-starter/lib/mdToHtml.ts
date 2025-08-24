// lib/mdToHtml.ts
import { marked } from 'marked';

export default function mdToHtml(md: string) {
  return marked.parse(md) as string;
}
