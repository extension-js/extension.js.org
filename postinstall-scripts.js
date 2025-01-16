const fs = require("fs");
const path = require("path");

function addOrUpdateMetaTags(filePath) {
  const metaDescriptionContent =
    "Extension.js makes it very easy to create, develop, and distribute cross-browser extensions with no build configuration.";
  const canonicalURL = "https://extension.js.org/blog/";

  // Read the HTML file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    // Find the <title> tag in the HTML
    const titleTagRegex = /<title\b[^>]*>(.*?)<\/title>/;
    const match = data.match(titleTagRegex);

    if (!match) {
      console.error("No <title> tag found in the file.");
      return;
    }

    const titleTag = match[0];
    const afterTitleIndex = data.indexOf(titleTag) + titleTag.length;

    // Check if we are working with the main index file (not blog/index.html)
    if (!filePath.includes("blog/index")) {
      // Check if a <meta name="description"> tag already exists
      const metaDescriptionRegex = /<meta\s+name=["']description["'].*?>/;
      if (metaDescriptionRegex.test(data)) {
        // Update the existing meta description
        data = data.replace(
          metaDescriptionRegex,
          `<meta name="description" content="${metaDescriptionContent}">`
        );
      } else {
        // Insert the new meta description tag for index.html files
        const newMetaTag = `<meta name="description" content="${metaDescriptionContent}">\n`;
        data =
          data.slice(0, afterTitleIndex) +
          newMetaTag +
          data.slice(afterTitleIndex);
      }
    }

    // Handle canonical tags for blog/index.html
    if (filePath.includes("blog/index")) {
      // Check if a <link rel="canonical"> tag already exists
      const canonicalRegex = /<link\s+rel=["']canonical["'].*?>/;
      if (canonicalRegex.test(data)) {
        // Update the existing canonical link
        data = data.replace(
          canonicalRegex,
          `<link rel="canonical" href="${canonicalURL}">`
        );
      } else {
        // Insert the new canonical link for blog/index.html
        const newCanonicalTag = `<link rel="canonical" href="${canonicalURL}">\n`;
        data =
          data.slice(0, afterTitleIndex) +
          newCanonicalTag +
          data.slice(afterTitleIndex);
      }
    }

    // Write the updated HTML back to the file
    fs.writeFile(filePath, data, "utf8", (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
        return;
      }
      console.log(`Meta tags updated successfully for ${filePath}`);
    });
  });
}

// Paths to the files
const indexFilePath = path.join(__dirname, "./doc_build/index.html");
const blogIndexPath = path.join(__dirname, "./doc_build/blog/index.html");

// Apply the patches
addOrUpdateMetaTags(indexFilePath);
addOrUpdateMetaTags(blogIndexPath);
