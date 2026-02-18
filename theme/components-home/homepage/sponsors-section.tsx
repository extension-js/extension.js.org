"use client";

export default function SponsorsSection() {
  return (
    <section className="w-full p-4 sm:p-6 md:p-8 lg:p-8" id="sponsors">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-foreground mx-auto mb-2 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          Backing the open source core
        </h2>
        <p className="text-muted-foreground mx-auto mb-16 max-w-xl text-base leading-relaxed sm:text-lg">
          Sponsors help us ship faster releases, better DX, and long-term
          reliability for extension teams.
        </p>
        <a
          className="inline-flex items-center gap-3"
          href="https://www.testmuai.com/?utm_medium=sponsor&utm_source=extensionjs"
          rel="noreferrer"
          target="_blank"
        >
          <img
            alt="TestMu AI logo"
            className="w-auto transition dark:invert"
            src="https://assets.testmu.ai/resources/images/logos/logo.png"
            style={{ height: "64px" }}
          />
        </a>
      </div>
    </section>
  );
}
