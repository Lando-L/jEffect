import { spy } from "sinon"
import * as Option from "../../src/effects/OptionType"
import * as Validated from "../../src/effects/ValidatedType"

describe("Option", () => {
	describe("unit", () => {
		it("should lift given value into the Option context", () => {
			expect(Option.unit(null)).toEqual(Option.None)
			expect(Option.unit(undefined)).toEqual(Option.None)
			expect(Option.unit(42)).toEqual(new Option.Some(42))
		})
	})

	describe("map", () => {
		it("should lift a function into the Option context", () => {
			const addOne = (x: number): number => x + 1

			expect(Option.map(addOne)(Option.None)).toEqual(Option.None)
			expect(Option.map(addOne)(Option.unit(41))).toEqual(Option.unit(42))
		})
	})

	describe("forEach", () => {
		it("should execute a given function in the Option context", () => {
			const stub = spy()
			
			Option.forEach(stub)(Option.None)
			expect(stub.called).toBe(false)

			Option.forEach(stub)(Option.unit(42))
			expect(stub.called).toBe(true)
		})
	})

	describe("apply", () => {
		it("should transform a lifted value into a lifted function", () => {
			const addOne = (x: number): number => x + 1

			expect(Option.apply(Option.unit(addOne))(Option.None)).toEqual(Option.None)
			expect(Option.apply(Option.unit(addOne))(Option.unit(41))).toEqual(Option.unit(42))
		})
	})

	describe("bind", () => {
		it("should enable Option composition", () => {
			const divideOneBy = (x: number): Option.OptionType<number> => {
				return (x !== 0) ? Option.unit(1 / x) : Option.None
			}

			expect(Option.bind(divideOneBy)(Option.None)).toEqual(Option.None)
			expect(Option.bind(divideOneBy)(Option.unit(0))).toEqual(Option.None)
			expect(Option.bind(divideOneBy)(Option.unit(1 / 42))).toEqual(Option.unit(42))
		})
	})

	describe("filter", () => {
		it("should filter the value in the Option context", () => {
			const filter = (x: number) => x > 41

			expect(Option.filter(filter)(Option.None)).toEqual(Option.None)
			expect(Option.filter(filter)(Option.unit(0))).toEqual(Option.None)
			expect(Option.filter(filter)(Option.unit(42))).toEqual(Option.unit(42))
		})
	})

	describe("fold", () => {
		it("should transform the Option to given type", () => {
			const addOne = (x: number): number => x + 1

			expect(Option.fold(addOne)(0)(Option.None)).toBe(0)
			expect(Option.fold(addOne)(0)(Option.unit(41))).toBe(42)
		})
	})

	describe("isEmpty", () => {
		it("should return wether the Option is empty", () => {
			expect(Option.isEmpty(Option.None)).toBe(true)
			expect(Option.isEmpty(Option.unit(42))).toBe(false)
		})
	})

	describe("nonEmpty", () => {
		it("should return wether the Option is empty", () => {
			expect(Option.nonEmpty(Option.None)).toBe(false)
			expect(Option.nonEmpty(Option.unit(42))).toBe(true)
		})
	})

	describe("toString", () => {
		it("should transform the Option to a string", () => {
			expect(Option.toString(Option.None)).toEqual("None")
			expect(Option.toString(Option.unit(42))).toEqual("Some(42)")
		})
	})

	describe("toValidated", () => {
		it("should transform the Option to a Validated", () => {
			expect(Option.toValidated("error 1")(Option.None)).toEqual(Validated.invalid(["error 1"]))
			expect(Option.toValidated("error 1")(Option.unit(42))).toEqual(Validated.valid(42))
		})
	})
})
