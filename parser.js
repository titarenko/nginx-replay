const Promise = require('bluebird')
const csvParse = Promise.promisify(require('csv-parse'))

const bodyColumnIndex = 5

module.exports = { parse }

function parse (log) {
	return csvParse(log).then(rows => rows.map(row => row.map((column, index) => {
		const clean = column == '-' ? undefined : column
		return index == bodyColumnIndex && clean ? decode(clean) : clean
	})))
}

function decode (line) {
	return line.replace(/(\\x.{2})+/g, m => decodeURIComponent(m.replace(/\\x/g, '%')))
}
