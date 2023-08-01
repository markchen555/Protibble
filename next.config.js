/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['lh3.googleusercontent.com', 'res.cloudinary.com', 'task.com']
	},
	// might need to uncommon this if create project failed
	// experimental: {
	// 	serverComponentsExternalPackages: ['cloudinary', 'graphql-request']
	//   },
	env: {
	  },
}

module.exports = nextConfig
