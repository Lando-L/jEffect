# jEffect
A library implementing usefull monadic effects in javascript.

## Build the package

```
npm install
npm run build
```

## Option

The Option type handles missing values.

```
var userDB = new Map([
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

// output:
// User 1
```

## Validated

The Validated type handles validation.

```
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

// output:
// Valid(User 1)
// Invalid(User with id: 2 failed security checks)
// Invalid(User with id: 3 failed security checks)
// Invalid(Cannot find id: 4)
```
