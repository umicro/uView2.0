var REGEXP = /{|}|/g
var PREFIX = 'u-'

function keys(obj) {
	return JSON.stringify(obj)
		.replace(REGEXP, '')
		.split(',')
		.map(function(item) {
			return item.split(':')[0]
		})
}

function join(name, mods) {
	name = PREFIX + name
	mods = mods.map(function(mod) {
		return name + '--' + mod
	})
	mods.unshift(name)
	return mods.join(' ')
}

function bem(name, conf) {
	if (!conf) {
		return
	}
	var mods = []
	conf.forEach(function(item) {
		if (typeof item === 'string' || typeof item === 'number') {
			mods.push(item)
		} else if (typeof item === 'object') {
			keys(item).forEach(function(key) {
				item[key] && mods.push(key)
			})
		}
	})
	console.log(name, mods);
	return join(name, mods)
}

export default bem
