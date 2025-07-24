import type React from "react";

interface AvatarImageProps {
  icon: string;
  size?: number; // Optional prop for the width
  altText?: string; // Optional prop for the alt text
}

const iconLinks: Record<string, string> = {
  babel:
    "https://github.com/user-attachments/assets/73fc8a2c-6562-483d-83f3-4b690ddb2d63",
  css: "https://github.com/user-attachments/assets/3e211ed0-cd60-4e17-9a0b-e8b497b0d80b",
  cssModules:
    "https://github.com/user-attachments/assets/96193b79-54e2-4387-8a89-52e8100d2df4",
  env: "https://github.com/user-attachments/assets/75bd0de7-2b00-41db-8407-e06a96bf5b7c",
  eslint:
    "https://github.com/user-attachments/assets/7f1691f3-b94f-4204-90bc-6914af23b276",
  extension: "https://avatars.githubusercontent.com/u/172809806",
  html5:
    "https://github.com/user-attachments/assets/4892720f-ddd3-4d89-9481-4a3db60ee2e2",
  javascript:
    "https://github.com/user-attachments/assets/508dd752-7978-4d49-a1ee-65e3a04f78f6",
  less: "https://github.com/user-attachments/assets/74465239-2a9e-4b24-bbbf-0031e1e7938a",
  node: "https://github.com/user-attachments/assets/1e8a9e62-9aee-4f21-af3c-7a3a9a5d7e5c",
  postcss:
    "https://github.com/user-attachments/assets/e15b417f-bb2b-4b86-8137-5e538e7e80c3",
  preact:
    "https://github.com/user-attachments/assets/6ee218ce-5edb-4229-a4f7-76b6b89165e5",
  prettier:
    "https://github.com/user-attachments/assets/72f43840-4709-4687-a128-a4609b791a00",
  react:
    "https://github.com/user-attachments/assets/69713bf5-c54d-4af0-a952-30526de21020",
  sass: "https://github.com/user-attachments/assets/f25e2156-b219-4cf4-bd94-938ddf2fbfe7",
  stylelint:
    "https://github.com/user-attachments/assets/f2776268-45f6-4746-a966-2d94309e7cb3",
  tailwindcss:
    "https://github.com/user-attachments/assets/f388f8b1-63e8-494f-b7a8-3775366e816c",
  typescript:
    "https://github.com/user-attachments/assets/b954925d-670c-431e-ae18-0a389d6779a8",
  vue: "https://github.com/user-attachments/assets/e0cb6661-e94a-4152-bae9-421bca06f65c",
  wasm: "https://github.com/user-attachments/assets/aabf918f-d1a3-4703-b295-dea7804d638e",
  github:
    "https://github.com/user-attachments/assets/3732ca6d-bea7-4e74-9776-a11c48e70066",
  shadcnui:
    "https://github.com/user-attachments/assets/07ca973c-ca41-487f-91ac-a567ea9f5036",
  image:
    "https://github.com/user-attachments/assets/d6a95760-1039-4864-9fd8-241da127f1bb",
  json: "https://github.com/user-attachments/assets/2ef7d509-57f8-4d5b-a093-0d0246d9b8fb",
  locale:
    "https://github.com/user-attachments/assets/132a4c05-e3af-4588-a14d-7e70c2893352",
  html: "https://github.com/user-attachments/assets/198f81c1-7150-4196-812c-443176d2e141",
  discord:
    "https://github.com/user-attachments/assets/5dddc96d-6e92-4a87-8de5-37d02a435695",
  x: "https://github.com/user-attachments/assets/8d5aac76-af7e-4a42-9d1f-1b1d2b2ab1e8",
  package:
    "https://github.com/user-attachments/assets/7b1fc9ae-9663-4992-b74c-8398ff7b0079",
  webpack:
    "https://raw.githubusercontent.com/webpack/media/master/logo/icon.png",
  chromium:
    "https://raw.githubusercontent.com/alrra/browser-logos/refs/heads/main/src/chromium/chromium.svg",
};

const AvatarImage: React.FC<AvatarImageProps> = ({
  icon,
  size = 120,
  altText,
}) => {
  const imagePath = iconLinks[icon] || ""; // Retrieve the icon path from the iconLinks object

  if (!imagePath) {
    return <p>Icon not found</p>; // Return a fallback if the icon doesn't exist
  }

  return (
    <img
      className="logo"
      src={imagePath}
      alt={altText || `The ${icon} logo`}
      width={size}
      style={{
        marginBottom: size ? `${size / 50}rem` : "2.5rem",
        filter:
          icon === "x" ||
          icon === "shadcnui" ||
          icon === "github" ||
          icon === "stylelint"
            ? "grayscale(100%) invert(100%)"
            : "none",
      }}
    />
  );
};

export { AvatarImage };
