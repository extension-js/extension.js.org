// @ts-check
const { defineConfig, createNotesQuery } = require("./.app/app-config");

module.exports = defineConfig({
  title: "🧩 extension-create",
  description:
    "A simple, lightweight, and flexible note-taking template for Eleventy.",
  editThisNote: {
    url: "https://github.com/cezaraugusto/extension-create/edit/{{branch}}/{{file}}",
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
        url: "https://github.com/cezaraugusto/extension-create/graphs/contributors",
        label: "Contributors Hall of Fame",
        icon: "users",
      },
    ],
    sections: [
      {
        label: "Introduction",
        groups: [
          {
            query: createNotesQuery({
              pattern: "^/[^/]+$",
            }),
          },
        ],
      },
      {
        label: "Guides",
        groups: [
          {
            label: "Writing Notes",
            query: createNotesQuery({
              pattern: "^/Writing/",
              tree: {
                replace: {
                  "^/\\w+": "",
                },
              },
            }),
          },
          {
            label: "Organizing Notes",
            query: createNotesQuery({
              pattern: "^/Organizing/",
            }),
          },
          {
            label: "Core Features",
            query: createNotesQuery({
              pattern: "^/Features/",
              tree: {
                replace: {
                  "^/\\w+": "",
                },
              },
            }),
          },
          {
            label: "Deployment",
            query: createNotesQuery({
              pattern: "^/Deployment/",
            }),
          },
        ],
      },
      {
        label: "Releases",
        groups: [
          {
            query: createNotesQuery({
              pattern: "^/Releases/",
            }),
          },
        ],
      },
      // {
      //   pattern: "^/Commands/",
      //   label: "Commands",
      // },
      // {
      //   pattern: "^/Develop/",
      //   label: "Develop",
      // },
      // {
      //   pattern: "^/Tutorials/",
      //   label: "Tutorials",
      // },
      // {
      //   pattern: "^/Guides/",
      //   label: "Guides",
      // },
      // {
      //   pattern: "^/Examples/",
      //   label: "Examples"
      // },
      // {
      //   pattern: "^/ExistingExtensions/",
      //   label: "Usage With Existing Extensions",
      // },
      // {
      //   pattern: "^/Extend/",
      //   label: "Extending extension-create",
      // },
      // {
      //   pattern: "^/Contribute/",
      //   label: "Contribute To This Project",
      // },
    ],
  },
  tags: {},
});
