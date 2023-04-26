const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const markdownify = require("./lib/filters/markdownfilter")
const blocksToMD = require("./lib/shortcodes/portableTextToHTML")
const betterSlugs = require("./lib/filters/betterSlugs")
const videoEmbed = require("./lib/shortcodes/videoEmbed")
const videoID = require("./lib/shortcodes/videoID")
const themeCalculations = require("./lib/utils/themeCalculations")

const responsiveImage = require("./lib/shortcodes/images/responsiveImage")
const dateConverter = require("./lib/shortcodes/dateConverter")



const bundlePointer = require("./lib/shortcodes/bundlePointer")
const emailSplitter = require("./lib/shortcodes/emailSplitter")


module.exports = (eleventyConfig) => {

	eleventyConfig.setQuietMode(true);
	eleventyConfig.setWatchThrottleWaitTime(1000);
	
	eleventyConfig.setDataDeepMerge(true);

	eleventyConfig.addTransform("htmlmin", require("./lib/transforms/htmlmin"))

	// debugger
	eleventyConfig.addFilter("debugger", (...args) => {
		console.log(...args)
		debugger;
	});

	eleventyConfig.setLibrary("md", markdownify.markdownLib);
	eleventyConfig.addFilter("markdownify", markdownify);

	eleventyConfig.addFilter("slug", betterSlugs);
	eleventyConfig.addNunjucksAsyncShortcode("portableTextToHTML", blocksToMD);


	eleventyConfig.addFilter("emailSplitter", emailSplitter);

	eleventyConfig.addShortcode("themeCalculations", themeCalculations);


	eleventyConfig.addNunjucksAsyncShortcode("image", responsiveImage);
	eleventyConfig.addNunjucksShortcode("dateConverter", dateConverter);


	eleventyConfig.addNunjucksAsyncShortcode("videoEmbed", videoEmbed);
	eleventyConfig.addShortcode("videoID", videoID);

	eleventyConfig.addShortcode("bundlePointer", bundlePointer);

	eleventyConfig.addPassthroughCopy({ "./src/_includes/assets/robots.txt": "robots.txt" });

	eleventyConfig.addWatchTarget("./src/style/**/*"); // doesn't work with eleventy config not at root

	return {
		dir: {
			input: "src",
			output: "www"
		},
		// pathPrefix: "/subfolder/",
		templateFormats: ['md', 'njk', 'html'],
		dataTemplateEngine: 'njk',
		markdownTemplateEngine: 'njk'
	};
};