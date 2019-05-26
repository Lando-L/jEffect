import * as Option from "./OptionType"

export abstract class ValidatedType<A, E> {}

export class Invalid<E> extends ValidatedType<void, E> {
	
	public errors: E[]

	constructor(errors: E[]){
		super()
		this.errors = errors
	}
}

export class Valid<A> extends ValidatedType<A, void> {
	
	public value: A

	constructor(value: A){
		super()
		this.value = value
	}
}

export function unit<A, E>(value: A): ValidatedType<A, E> {
	return new Valid(value)
}

export function valid<A, E>(value: A): ValidatedType<A, E> {
	return new Valid(value)
}

export function invalid<A, E>(error: E[]): ValidatedType<A, E[]> {
	return new Invalid(error)
}

export function map<A, B, E>(f: (a: A) => B): (validated: ValidatedType<A, E>) => ValidatedType<B,E> {
	return validated => (validated instanceof Valid) ? valid(f(validated.value)) : validated
}

export function forEach<A, E>(f: (a: A) => void): (validated: ValidatedType<A, E>) => void {
	return validated => {
		if (validated instanceof Valid) f(validated.value)
	}
}

export function apply<A, B, E>(f: ValidatedType<((a: A) => B), E>): (validated: ValidatedType<A, E>) => ValidatedType<B, E> {
	return validated => {
		if (f instanceof Valid && validated instanceof Valid)
			return valid(f.value(validated.value))
		else if (f instanceof Valid && validated instanceof Invalid)
			return validated
		else if (f instanceof Invalid && validated instanceof Valid)
			return f.errors
		else
			return invalid((f as Invalid<E>).errors.concat((validated as Invalid<E>).errors))
	}
}

export function bind<A, B, E>(f: (a: A) => ValidatedType<B, E>): (validated: ValidatedType<A, E>) => ValidatedType<B, E> {
	return validated => (validated instanceof Valid) ? f(validated.value) : validated
}

export function fold<A, B, E>(f: (a: A) => B): (state: B) => (validated: ValidatedType<A, E>) => B {
	return state => validated => (validated instanceof Valid) ? f(validated.value) : state
}

export function filter<A, E>(f: (a: A) => boolean): (onFailure: E) => (validated: ValidatedType<A, E[]>) => ValidatedType<A, E[]> {
	return onFailure => {
		return validated => {
			if (validated instanceof Valid)
				return (f(validated.value)) ? validated : invalid([onFailure])
			else
				return validated
		}
	}
}

export function isValid<A, E>(validated: ValidatedType<A, E>): boolean {
	return validated instanceof Valid
}

export function isInvalid<A, E>(validated: ValidatedType<A, E>): boolean {
	return validated instanceof Invalid
}

export function toString<A, E>(validated: ValidatedType<A, E>): string {
	return (validated instanceof Valid) ? `Valid(${validated.value})` : `Invalid(${(validated as Invalid<E>).errors})`
}

export function toOption<A, E>(validated: ValidatedType<A, E>): Option.OptionType<A> {
	return (validated instanceof Valid) ? Option.unit(validated.value) : Option.None
}
