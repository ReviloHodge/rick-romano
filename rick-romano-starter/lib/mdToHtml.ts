// lib/mdToHtml.ts
import { marked } from 'marked';

// Named export (what page.tsx expects)
export function mdToHtml(md: string) {
  return marked.parse(md) as string;
}

// Default export (harmless, keeps both styles working)
export default mdToHtml;
