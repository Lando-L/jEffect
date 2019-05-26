const composition = require('../build/composition');
const Option = require('../build/effects/OptionType');

const userDB = new Map([
	[1, { username: "User 1", password: "123456" }],
	[2, { username: "", password: "123456" }],
	[3, { username: "User 4", password: "12345" }]
]);

[1,2,3,4].forEach(id => {
	composition.pipe(
		Option.unit,
		Option.filter(user => (user.username.length > 0 && user.password.length > 5)),
		Option.map(user => user.username),
		Option.forEach(console.log)
	)(userDB.get(id));
});
