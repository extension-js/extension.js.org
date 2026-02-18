import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";

type TemplateCardItem = {
  title: string;
  slug: string;
  description: string;
  iconSrc: string;
};

const TEMPLATE_CARDS: TemplateCardItem[] = [
  {
    title: "React",
    slug: "new-react",
    description:
      "Mature React ecosystem with reusable components, strong tooling, and scalable patterns for production extension interfaces.",
    iconSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    title: "Preact",
    slug: "new-preact",
    description:
      "React-like developer experience with lighter runtime, faster startup, and smaller bundles for performance-sensitive extensions teams.",
    iconSrc: "https://cdn.simpleicons.org/preact/673AB8",
  },
  {
    title: "Vue",
    slug: "new-vue",
    description:
      "Single-file component workflow with clear conventions, rich ecosystem plugins, and maintainable architecture for browser extensions.",
    iconSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  },
  {
    title: "Svelte",
    slug: "new-svelte",
    description:
      "Compiler-first approach delivering concise components, minimal runtime overhead, and excellent performance for interactive extension UIs.",
    iconSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
  },
  {
    title: "TypeScript",
    slug: "new-typescript",
    description:
      "Type-safe foundation that improves refactoring confidence, collaboration clarity, and long-term maintainability across extension codebases.",
    iconSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    title: "JavaScript",
    slug: "new",
    description:
      "Fastest setup for rapid prototyping, quick iteration, and shipping functional extensions without upfront type-system complexity.",
    iconSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
];

export function TemplateCardsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
      {TEMPLATE_CARDS.map((template) => (
        <Card
          key={template.slug}
          className="border border-[--rp-c-border] text-left shadow-sm"
        >
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <img
                src={template.iconSrc}
                alt={`${template.title} icon`}
                className="h-12 w-12 rounded-xl bg-white p-2 object-contain ring-1 ring-[--rp-c-border]"
              />
              <div className="min-w-0">
                <CardTitle className="text-lg">{template.title}</CardTitle>
                <CardDescription className="mt-2 text-base">
                  {template.description}
                </CardDescription>
                <a
                  className="mt-3 inline-flex text-base font-medium text-primary underline-offset-4 hover:underline"
                  href={`https://templates.extension.dev/${template.slug}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  Open template
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
