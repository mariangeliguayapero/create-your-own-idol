export type AppLayout =
  | "search"
  | "feed"
  | "dashboard"
  | "form"
  | "agentic"
  | "platform"
  | "converter"
  | "social"
  | "gather"
  | "consultancy"
  | "events"
  | "outreach"
  | "warmup"
  | "sales"
  | "venture";

export type AppVibe = "enterprise" | "vibrant" | "minimal" | "dark" | "playful";

export type AppTier = "S" | "M" | "L";

export interface FormInput {
  label: string;
  key: string;
  type: "text" | "textarea";
}

export interface AppTheme {
  primary: string;
  primarySoft: string;
  accent: string;
  bg: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
  glow: string;
  fontClass: string;
}

export interface AppConfig {
  id: number;
  slug: string;
  name: string;
  title: string;
  tagline: string;
  description: string;
  systemPrompt: string;
  tier: AppTier;
  layout: AppLayout;
  vibe: AppVibe;
  icon: string;
  primaryUtility: string;
  inputs?: FormInput[];
  typeuiStyleSlug: string;
  theme: AppTheme;
}

export const APPS: Record<number, AppConfig> = {
  "3": {
    "id": 3,
    "slug": "create-your-own-idol",
    "name": "Create Your Own Idol",
    "title": "Create Your Own Idol",
    "tagline": "Design your AI-powered virtual idol",
    "description": "Design, customize, and interact with your own AI-powered virtual idol.",
    "systemPrompt": "You are a K-pop idol designer. Generate a detailed idol persona: stage name, concept, visual style, debut concept, and fan engagement strategy. Be specific, not generic. Output in Markdown.",
    "tier": "S",
    "layout": "social",
    "vibe": "vibrant",
    "icon": "sparkles",
    "primaryUtility": "AI virtual idol designer",
    "typeuiStyleSlug": "cafe",
    "theme": {
      "primary": "#ec4899",
      "primarySoft": "rgba(236, 72, 153, 0.15)",
      "accent": "#f472b6",
      "bg": "#0c0a09",
      "surface": "#171412",
      "text": "#fafaf9",
      "muted": "#a8a29e",
      "border": "rgba(236, 72, 153, 0.15)",
      "glow": "rgba(236, 72, 153, 0.15)",
      "fontClass": "font-app-display"
    }
  }
};

export const APP_LIST: AppConfig[] = Object.values(APPS).sort((a, b) => a.id - b.id);

export function getApp(id: string | number): AppConfig | null {
  const key = typeof id === "number" ? id : Number.parseInt(id, 10);
  return Number.isNaN(key) ? null : APPS[key] ?? null;
}

export function toCssVars(theme: AppTheme): Record<string, string> {
  return {
    "--primary": theme.primary,
    "--primary-soft": theme.primarySoft,
    "--accent": theme.accent,
    "--bg": theme.bg,
    "--surface": theme.surface,
    "--text": theme.text,
    "--muted": theme.muted,
    "--border": theme.border,
    "--glow": theme.glow,
  };
}
