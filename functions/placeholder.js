const cloudinary = require('cloudinary').v2
const CONFIG = require('../config')

cloudinary.config({
	cloud_name: CONFIG.CLOUDINARY_CLOUD_NAME,
	api_key: CONFIG.CLOUDINARY_API_KEY,
	api_secret: CONFIG.CLOUDINARY_API_SECRET
})

exports.handler = async function (event, _) {
	const { path } = event
	const pathParameters = path.replace('/.netlify/functions/placeholder', '')
	const [width, height, background] = pathParameters.split('/').filter(Boolean)

	const url = cloudinary.url('1x1_vqut0b', {
		height,
		width,
		effect: 'colorize',
		color: `#${background}`
	})

	return {
		statusCode: 302,
		headers: {
			Location: url
		}
	}
}
