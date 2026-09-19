import type { Metadata } from "next";
import { getApp, toCssVars } from "@/lib/registry";
import SocialIdolLayout from "@/components/factory/layouts/SocialIdolLayout";

export const metadata: Metadata = {
  title: "Create Your Own Idol",
  description: "Design, customize, and interact with your own AI-powered virtual idol.",
};

export default function Home() {
  const app = getApp(3)!;
  return (
    <div style={toCssVars(app.theme) as React.CSSProperties}>
      <SocialIdolLayout app={app} />
    </div>
  );
}
