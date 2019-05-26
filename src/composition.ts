/*const compose = () => {
	const args = Array.prototype.slice.call(arguments);
	return x => args.reduceRight((acc, func) => func(acc), x);
};*/

export function pipe(...functions: any[]) {
	return (x: any) => functions.reduce((acc, func) => func(acc), x)
}

export function compose(...functions: any[]) {
	return (x: any) => functions.reduceRight((acc, func) => func(acc), x)
}
