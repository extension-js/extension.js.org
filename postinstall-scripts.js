const fs = require("fs");
const path = require("path");

function extractMetaDescription(mdxContent) {
  // Split content into lines
  const lines = mdxContent.split("\n");
  let firstParagraph = "";

  // Find first valid paragraph
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines, imports, components, headers and warnings
    if (
      !line ||
      line.startsWith("import") ||
      line.startsWith("<") ||
      line.startsWith("#") ||
      line.toLowerCase().includes("warning")
    ) {
      continue;
    }

    firstParagraph = line;
    break;
  }

  return firstParagraph;
}

function addOrUpdateMetaTags(filePath) {
  // Original meta description for non-docs pages
  const metaDescriptionContent =
    "Extension.js makes it very easy to create, develop, and distribute cross-browser extensions with no build configuration.";
  const canonicalURL = "https://extension.js.org/blog/";

  // Check if this is a docs page
  const isDocsPage = filePath.includes("/docs/");

  // If it's a docs page, find corresponding MDX file
  let metaDescription = metaDescriptionContent;
  if (isDocsPage) {
    // Convert HTML path to MDX path
    const mdxPath = filePath
      .replace("doc_build", "docs/en")
      .replace(".html", ".mdx");

    try {
      const mdxContent = fs.readFileSync(mdxPath, "utf8");
      const extractedDesc = extractMetaDescription(mdxContent);
      if (extractedDesc) {
        metaDescription = extractedDesc;
      }
    } catch (err) {
      console.warn(`Could not find MDX file for ${filePath}`);
    }
  }

  // Read the HTML file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    // Find the <title> tag
    const titleTagRegex = /<title\b[^>]*>(.*?)<\/title>/;
    const match = data.match(titleTagRegex);

    if (!match) {
      console.error("No <title> tag found in the file.");
      return;
    }

    const titleTag = match[0];
    const afterTitleIndex = data.indexOf(titleTag) + titleTag.length;

    // Check if meta description already exists
    const metaDescriptionRegex = /<meta\s+name=["']description["'].*?>/;
    if (metaDescriptionRegex.test(data)) {
      // Update existing meta description
      data = data.replace(
        metaDescriptionRegex,
        `<meta name="description" content="${metaDescription}">`,
      );
    } else {
      // Insert new meta description
      const newMetaTag = `<meta name="description" content="${metaDescription}">\n`;
      data =
        data.slice(0, afterTitleIndex) +
        newMetaTag +
        data.slice(afterTitleIndex);
    }

    // Handle canonical URL for blog pages
    if (filePath.includes("blog/index")) {
      const canonicalRegex = /<link\s+rel=["']canonical["'].*?>/;
      if (canonicalRegex.test(data)) {
        data = data.replace(
          canonicalRegex,
          `<link rel="canonical" href="${canonicalURL}">`,
        );
      } else {
        const newCanonicalTag = `<link rel="canonical" href="${canonicalURL}">\n`;
        data =
          data.slice(0, afterTitleIndex) +
          newCanonicalTag +
          data.slice(afterTitleIndex);
      }
    }

    // Write updated HTML back to file
    fs.writeFile(filePath, data, "utf8", (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
        return;
      }
      console.log(`Meta tags updated successfully for ${filePath}`);
    });
  });
}

// Process all files in doc_build directory
function processDocBuild(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDocBuild(fullPath);
    } else if (file.endsWith(".html")) {
      addOrUpdateMetaTags(fullPath);
    }
  });
}

// Paths to process
const docBuildDir = path.join(__dirname, "doc_build");
const indexFilePath = path.join(docBuildDir, "index.html");
const blogIndexPath = path.join(docBuildDir, "blog/index.html");

// Process main index and blog index
addOrUpdateMetaTags(indexFilePath);
addOrUpdateMetaTags(blogIndexPath);

// Process all docs pages
processDocBuild(path.join(docBuildDir, "docs"));
