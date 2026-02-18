"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { TemplateCardsGrid } from "../../components/template-cards-grid";

export default function TemplatesSection() {
  return (
    <section className="relative overflow-hidden" id="features">
      <div className="w-full p-4 sm:p-6 md:p-8 lg:p-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-foreground mx-auto mb-2 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Pick your <span className="text-primary">framework</span>. Keep your
            workflow.
          </h2>

          <p className="text-muted-foreground mx-auto mb-20 max-w-xl text-lg leading-relaxed sm:text-lg mb-10">
            Start with production-ready templates for React, Vue, Svelte,
            TypeScript, or JavaScript.
          </p>

          <div className="mx-auto mb-10 max-w-5xl">
            <TemplateCardsGrid />
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild className="w-full gap-2 sm:w-auto" size="lg">
              <a href="/docs/getting-started/templates">
                Browse templates
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
