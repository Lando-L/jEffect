import * as Validated from "./ValidatedType"

export abstract class OptionType<A> {}

export class None extends OptionType<void> {}

export class Some<A> extends OptionType<A> {
	public value: A

	constructor(value: A) {
		super()
		this.value = value
	}
}

export function unit<A>(value: A): OptionType<A> {
	return (value !== null && value !== undefined) ? new Some(value) : None
}

export function map<A, B>(f: (value: A) => B): (option: OptionType<A>) => OptionType<B> {
	return option => (option instanceof Some) ? unit(f(option.value)) : None
}

export function forEach<A>(f: (value: A) => void): (option: OptionType<A>) => void {
	return option => {
		if (option instanceof Some) f(option.value)
	}
}

export function apply<A, B>(f: OptionType<((a: A) => B)>): (option: OptionType<A>) => OptionType<B> {
	return option => (f instanceof Some && option instanceof Some) ? new Some(f.value(option.value)) : None
}

export function bind<A, B>(f: (a: A) => OptionType<B>): (option: OptionType<A>) => OptionType<B> {
	return option => (option instanceof Some) ? f(option.value) : None
}

export function filter<A>(f: (a: A) => boolean): (option: OptionType<A>) => OptionType<A> {
	return option => {
		if (option instanceof Some)
			return (f(option.value)) ? option : None
		else
			return None
	}
}

export function fold<A, B>(f: (a: A) => B): (state: B) => (option: OptionType<A>) => B {
	return state => option => (option instanceof Some) ? f(option.value) : state
}

export function isEmpty<A>(option: OptionType<A>): boolean {
	return option === None
}

export function nonEmpty<A>(option: OptionType<A>): boolean {
	return option instanceof Some
}

export function toString<A>(option: OptionType<A>): string {
	return (option instanceof Some) ? `Some(${option.value})` : "None"
}

export function toValidated<A, E>(onFailure: E): (option: OptionType<A>) => Validated.ValidatedType<A, E> {
	return option => (option instanceof Some) ? Validated.valid(option.value) : Validated.invalid([onFailure])
}
