// @ts-check
const { defineConfig, createNotesQuery } = require("./.app/app-config");

module.exports = defineConfig({
  title: "🧩 Extension",
  description:
    "A simple, lightweight, and flexible note-taking template for Eleventy.",
  editThisNote: {
    url: "https://github.com/cezaraugusto/Extension/edit/{{branch}}/{{file}}",
  },
  customProperties: {
    properties: [
      {
        path: "props",
        options: {
          date: {
            locale: "en-US",
          },
        },
      },
    ],
  },
  sidebar: {
    links: [
      {
        url: "https://github.com/sponsors/cezaraugusto",
        label: "Become a Sponsor",
        icon: "user-check",
      },
      {
        url: "https://github.com/cezaraugusto/Extension/graphs/contributors",
        label: "Contributors Hall of Fame",
        icon: "users",
      },
    ],
    sections: [
      {
        label: "Getting Started",
        groups: [
          {
            query: createNotesQuery({
              pattern: "^/Getting Started/",
            }),
          },
        ],
      },
      {
        label: "Guides",
        groups: [
          {
            label: "Development",
            query: createNotesQuery({
              pattern: "^/Development/",
              tree: {
                replace: {
                  "^/\\w+": "",
                },
              },
            }),
          },
          {
            label: "Commands",
            query: createNotesQuery({
              pattern: "^/Commands/",
            }),
          },
          // {
          //   label: "Configuration Files",
          //   query: createNotesQuery({
          //     pattern: "^/Configuration Files/",
          //     tree: {
          //       replace: {
          //         "^/\\w+": "",
          //       },
          //     },
          //   }),
          // },
          // {
          //   label: "^/Features/",
          //   query: createNotesQuery({
          //   pattern: "^/Features/",
          // }),          // },
          // {
          //   label: "^/Examples/",
          //   query: createNotesQuery({
          //     pattern: "^/Examples/",
          //   }),
          // },
          // {
          //   label: "^/Guides/",
          //   query: createNotesQuery({
          //     pattern: "^/Guides/",
          //   }),
          // },
          // {
          //   label: "^/Integrations/",
          //   query: createNotesQuery({
          //     pattern: "^/Integrations/",
          //   }),
          // },
          // {
          //   label: "^/Advanced/",
          //   query: createNotesQuery({
          //     pattern: "^/Advanced/",
          //   }),
          // },
        ],
      },
      // {
      //   label: "Contribute To This Project",
      //   groups: [
      //     {
      //       query: createNotesQuery({
      //         pattern: "^/Contribute/",
      //       }),
      //     },
      //   ],
      // },
      // {
      //   label: "Releases",
      //   groups: [
      //     {
      //       query: createNotesQuery({
      //         pattern: "^/Releases/",
      //       }),
      //     },
      //   ],
      // },
    ],
  },
  tags: {},
});
