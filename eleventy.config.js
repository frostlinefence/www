import { createHash } from 'crypto';
import { readFileSync } from 'fs';
import { join } from 'path';

export default function(eleventyConfig) {

  const assetHashCache = new Map();
  eleventyConfig.addFilter('assetHash', function(relativePath) {
    if (assetHashCache.has(relativePath)) return assetHashCache.get(relativePath);
    try {
      const fullPath = join(process.cwd(), relativePath);
      const content = readFileSync(fullPath);
      const hash = createHash('sha256').update(content).digest('hex').slice(0, 8);
      assetHashCache.set(relativePath, hash);
      return hash;
    } catch {
      return 'dev';
    }
  });

  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/manifest.webmanifest": "manifest.webmanifest" });

  eleventyConfig.addWatchTarget("src/assets/");

  eleventyConfig.addFilter("safe", function(content) {
    return content;
  });

  eleventyConfig.addCollection("pages", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/pages/*.njk");
  });

  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: false,
    autoescape: false
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}
