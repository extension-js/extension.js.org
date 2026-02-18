import { Button } from "@components/ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import type { Template } from "./types";

const TEMPLATE_ICON_MAP: Record<string, string> = {
  "new-react":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "new-preact": "https://cdn.simpleicons.org/preact/673AB8",
  "new-vue":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  "new-svelte":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
  "new-typescript":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  new: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
};

function getTemplateLabel(slug: string): string {
  switch (slug) {
    case "new-react":
      return "React";
    case "new-preact":
      return "Preact";
    case "new-vue":
      return "Vue";
    case "new-svelte":
      return "Svelte";
    case "new-typescript":
      return "TypeScript";
    case "new":
      return "JavaScript";
    default:
      return slug;
  }
}

export function TemplateCard({ template }: { template: Template }) {
  const label = getTemplateLabel(template.name);
  const iconSrc = TEMPLATE_ICON_MAP[template.name];

  return (
    <Card className="overflow-hidden border border-[--rp-c-border] shadow-sm">
      <CardContent className="p-6">
        <section className="grid gap-5 overflow-hidden">
          <header className="flex items-start gap-4">
            {iconSrc && (
              <img
                src={iconSrc}
                alt={`${label} icon`}
                className="h-14 w-14 rounded-2xl bg-white p-2 object-contain ring-1 ring-[--rp-c-border]"
              />
            )}
            <div className="space-y-2">
              <CardTitle>{label}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                {template.description}
              </CardDescription>
            </div>
          </header>
          <div className="flex items-center justify-between gap-3">
            <Badge variant="outline">{template.name}</Badge>
            <Button asChild size="sm" variant="secondary">
              <a
                href={`https://templates.extension.dev/${template.name}`}
                rel="noreferrer"
                target="_blank"
              >
                Open template
              </a>
            </Button>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
