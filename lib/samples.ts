export const SAMPLES: Record<number, string> = {
  2: `**New feed post drafted**

**Visual:** A single frame built around {input}, graded warm and editorial to sit inside the cream and ink feed.
**Caption:** {input}. Not a moment, a series. Consider this frame one.
**Engagement plan:** Pin the caption question, reply as the creator within the hour, then schedule two echo stories.

**Tags:** #AIGenerated #CreatorFeed #Instagran`,
};

export function getSample(appId: number, input: string): string | null {
  if (appId === 2 && input.startsWith("PERSONA:")) {
    const parts = input.replace("PERSONA:", "").split("|");
    const name = (parts[0] ?? "Nova").trim() || "Nova";
    const niche = (parts[1] ?? "digital creator").trim() || "digital creator";
    const handle =
      "@" + name.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");
    return `**New AI influencer created**

**Handle:** ${handle}
**Niche:** ${niche}
**Bio:** ${name} makes ${niche} content that feels human, posts on a schedule, and replies like a real person.

**First post**
**Caption:** Week one of ${niche}. The honest version, not the highlight reel. Same face, same voice, every post.

**Tags:** #${niche.replace(/\s+/g, "")} #AICreator #NewProfile`;
  }
  if (appId === 2 && input.startsWith("POST:")) {
    const brief = input.replace("POST:", "").trim();
    const caption =
      brief || "A photo from the feed. The caption is the content, the image is the mood.";
    return `**Published to feed**

**Creator:** AI Studio
**Visual:** ${caption.slice(0, 48)}
**Caption:** ${caption}

**Tags:** #AIGenerated #CreatorFeed #Posted`;
  }
  const sample = SAMPLES[appId];
  if (!sample) return null;
  return sample.replaceAll("{input}", input);
}