const composition = require('../build/composition');
const Option = require('../build/effects/OptionType');
const Validated = require('../build/effects/ValidatedType');

const userDB = new Map([
	[1, { username: "User 1", password: "123456" }],
	[2, { username: "", password: "123456" }],
	[3, { username: "User 4", password: "12345" }]
]);

[1,2,3,4].forEach(id => {
	composition.pipe(
		Option.unit,
		Option.toValidated(`Cannot find id: ${id}`),
		Validated.filter(user => (user.username.length > 0 && user.password.length > 5))(`User with id: ${id} failed security checks`),
		Validated.map(user => user.username),
		Validated.toString,
		console.log
	)(userDB.get(id));
});
