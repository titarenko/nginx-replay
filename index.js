const fs = require('fs')
const { parse } = require('./parser')
const Promise = require('bluebird')
const request = Promise.promisify(require('request'))

const host = process.argv[2]
const log = process.argv[3]

if (!host || !log) {
	console.error('args missing!\ncall me following way: node . http://mysite.com mylog.log')
	process.exit(-1)
}

parse(fs.readFileSync(log, 'utf-8')).map(row => {
	const path = row[2]
	const qs = row[3]
	const body = row[5]
	const method = row[6]
	return {
		url: `${host}${path || ''}?${qs || ''}`,
		method,
		body: body,
		headers: method == 'POST'
			? { 'Content-Type': isJSON(body) ? 'application/json' : 'application/x-www-form-urlencoded' }
			: undefined
	}
}).filter(it => it.method == 'POST').mapSeries(row => {
	console.log(row)
	return request(row).tap(r => console.log(r.statusCode, r.body, '\n'))
}).then(() => {
	console.log('done!')
})

function isJSON (text) {
	return Boolean(tryParseJSON(text))
}

function tryParseJSON (json) {
	try {
		return JSON.parse(json)
	} catch (e) {
		return undefined
	}
}