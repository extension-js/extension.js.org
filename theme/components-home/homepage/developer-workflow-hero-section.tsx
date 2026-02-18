"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

const frameworkScreenshots = [
  {
    name: "React",
    src: "https://raw.githubusercontent.com/extension-js/examples/main/public/new-react/screenshot.png",
  },
  {
    name: "Svelte",
    src: "https://raw.githubusercontent.com/extension-js/examples/main/public/new-svelte/screenshot.png",
  },
  {
    name: "Vue",
    src: "https://raw.githubusercontent.com/extension-js/examples/main/public/new-vue/screenshot.png",
  },
];

export default function DeveloperWorkflowHeroSection() {
  return (
    <section className="relative overflow-hidden" id="hero">
      <div className="w-full p-4 sm:p-6 md:p-8 lg:p-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center max-lg:items-center max-lg:text-center">
            <h1 className="text-foreground mb-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Build browser extensions with{" "}
              <span className="text-primary">Extension.js</span>
            </h1>

            <p className="text-muted-foreground mb-16 max-w-xl text-base leading-relaxed sm:text-lg">
              Use one codebase and one command surface for Chrome, Edge, and
              Firefox. Ship faster with modern frameworks, typed templates, and
              production-ready workflows.
            </p>

            <div className="mb-8 flex flex-wrap items-center gap-2 max-lg:justify-center">
              <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                First extension in under 5 minutes
              </span>
              <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                One workflow for Chrome, Edge, and Firefox
              </span>
              <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                Typed templates for React, Vue, and Svelte
              </span>
            </div>

            <ul className="mb-12 space-y-4 py-3">
              <li className="flex items-center gap-3 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                AI-friendly defaults for modern developer workflows
              </li>
              <li className="flex items-center gap-3 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Familiar DX for React, Vue, Svelte, and TypeScript
              </li>
              <li className="flex items-center gap-3 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Cross-browser builds without bespoke scripts
              </li>
              <li className="flex items-center gap-3 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Production workflows for testing and release
              </li>
            </ul>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-10 gap-2 rounded-lg" size="lg">
                <a href="/docs/getting-started">
                  Read the Docs
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                className="h-10 rounded-lg"
                size="lg"
                variant="outline"
              >
                <a href="/docs/welcome">Migrate existing extension</a>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="grid w-full max-w-xl grid-cols-3 items-end gap-4 sm:gap-5">
              <Card className="w-full overflow-hidden border-0 bg-white shadow-2xl">
                <CardContent className="bg-white p-0">
                  <img
                    alt={`${frameworkScreenshots[0].name} template screenshot`}
                    className="h-auto w-full"
                    src={frameworkScreenshots[0].src}
                  />
                </CardContent>
              </Card>
              <Card className="mb-8 w-full overflow-hidden border-0 bg-white shadow-2xl sm:mb-10">
                <CardContent className="bg-white p-0">
                  <img
                    alt={`${frameworkScreenshots[1].name} template screenshot`}
                    className="h-auto w-full"
                    src={frameworkScreenshots[1].src}
                  />
                </CardContent>
              </Card>
              <Card className="mb-16 w-full overflow-hidden border-0 bg-white shadow-2xl sm:mb-20">
                <CardContent className="bg-white p-0">
                  <img
                    alt={`${frameworkScreenshots[2].name} template screenshot`}
                    className="h-auto w-full"
                    src={frameworkScreenshots[2].src}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
