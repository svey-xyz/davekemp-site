const sanityFetch = require("../../lib/utils/sanity/sanityFetch");
const groq = require('groq')

module.exports = async () => {
	const query = groq`{
		"work":*[_type == "project"]{
			...,
			"slug":slug.current,
			"tags":tags[]->,
			links[]{
              	(_type == "externalLink") => {
                	"url":url,
                	"linkText":select(
                  		defined(linkText) => linkText,
                  		url
                	)
              	},
              	(_type == "internalLink") => {
                	"url":reference->slug.fullUrl,
                	"linkText":select(
                  		defined(linkText) => linkText,
                  		reference->title
                	)
              	},
            }
		} | order(date desc),
		"tags":*[_type == "projectTag"] | order(priority desc)
	}`

	// const order = `| order(publishedAt asc)`
	// const query = [filter, projection, order].join(' ').toString()
	const data = await sanityFetch('projects', query)

	// const preparePosts = data.map(generateContent);
	
	return data;
}