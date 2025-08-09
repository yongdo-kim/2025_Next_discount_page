"use client";

import parse from "html-react-parser";

interface DynamicHtmlParserProps {
  html: string;
}

export default function DynamicHtmlParser({ html }: DynamicHtmlParserProps) {
  return <>{parse(html)}</>;
}