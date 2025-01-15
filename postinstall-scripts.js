const fs = require("fs");
const path = require("path");

function addOrUpdateMetaDescription(filePath) {
  const metaDescriptionContent =
    "Extension.js makes it very easy to create, develop, and distribute cross-browser extensions with no build configuration.";

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

    // Check if a <meta name="description"> tag already exists
    const metaDescriptionRegex = /<meta\s+name=["']description["'].*?>/;
    if (metaDescriptionRegex.test(data)) {
      // Update the existing meta description
      data = data.replace(
        metaDescriptionRegex,
        `<meta name="description" content="${metaDescriptionContent}">`
      );
    } else {
      // Insert the new meta description tag after the <title> tag
      const newMetaTag = `<meta name="description" content="${metaDescriptionContent}">\n`;
      data =
        data.slice(0, afterTitleIndex) +
        newMetaTag +
        data.slice(afterTitleIndex);
    }

    // Write the updated HTML back to the file
    fs.writeFile(filePath, data, "utf8", (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
        return;
      }
      console.log("Meta description updated successfully!");
    });
  });
}

// Path to the file
const filePath = path.join(__dirname, "./doc_build/index.html");

// Apply the patch
addOrUpdateMetaDescription(filePath);
