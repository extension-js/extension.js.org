import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const HERE = dirname(fileURLToPath(import.meta.url));

describe("the add-your-project steps", () => {
  it.each(["showcase.mdx", "zh-Hans/showcase.mdx", "zh-Hant/showcase.mdx"])(
    "keep every step within 36 characters in %s, so each fits one line",
    (file) => {
      const source = readFileSync(resolve(HERE, "..", file), "utf8");
      const list =
        /<ol className="ext-usedby-steps">([\s\S]*?)<\/ol>/.exec(source)?.[1] ??
        "";
      const steps = [...list.matchAll(/<span>([\s\S]*?)<\/span>/g)].map((m) =>
        m[1]
          .replace(/<[^>]+>/g, "")
          .replace(/\s+/g, " ")
          .trim(),
      );
      expect(steps).toHaveLength(4);

      for (const step of steps) {
        expect(step.length, step).toBeLessThanOrEqual(36);
      }
    },
  );
});
