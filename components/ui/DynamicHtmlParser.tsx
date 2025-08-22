"use client";

import parse from "html-react-parser";

type DynamicHtmlParserProps = {
  html: string;
};

export default function DynamicHtmlParser({ html }: DynamicHtmlParserProps) {
  return <>{parse(html)}</>;
}
