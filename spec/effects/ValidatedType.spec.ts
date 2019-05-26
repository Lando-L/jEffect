import { spy } from "sinon"
import * as Option from "../../src/effects/OptionType"
import * as Validated from "../../src/effects/ValidatedType"

describe("Option", () => {
	describe("unit", () => {
		it("should lift given value into the Validated context", () => {
			expect(Validated.unit(42)).toEqual(new Validated.Valid(42))
		})
	})

	describe("valid", () => {
		it("should lift given value into the Validated context", () => {
			expect(Validated.valid(42)).toEqual(new Validated.Valid(42))
		})
	})

	describe("invalid", () => {
		it("should lift given value into the Validated context", () => {
			expect(Validated.invalid(["error 1"])).toEqual(new Validated.Invalid(["error 1"]))
		})
	})

	describe("map", () => {
		it("should lift a function into the Validated context", () => {
			const addOne = (x: number): number => x + 1

			expect(Validated.map(addOne)(Validated.invalid(["error 1"]))).toEqual(Validated.invalid(["error 1"]))
			expect(Validated.map(addOne)(Validated.valid(41))).toEqual(Validated.valid(42))
		})
	})

	describe("forEach", () => {
		it("should execute a given function in the Validated context", () => {
			const stub = spy()
			
			Validated.forEach(stub)(Validated.invalid(["error 1"]))
			expect(stub.called).toBe(false)

			Validated.forEach(stub)(Validated.valid(42))
			expect(stub.called).toBe(true)
		})
	})

	describe("apply", () => {
		it("should transform a lifted value into a lifted function", () => {
			const addOne = (x: number): number => x + 1

			expect(Validated.apply(Validated.invalid(["error 1"]))(Validated.invalid(["error 2"]))).toEqual(Validated.invalid(["error 1", "error 2"]))
			expect(Validated.apply(Validated.valid(addOne))(Validated.invalid(["error 1"]))).toEqual(Validated.invalid(["error 1"]))
			expect(Validated.apply(Validated.valid(addOne))(Validated.valid(41))).toEqual(Validated.valid(42))
		})
	})

	describe("bind", () => {
		it("should enable Validated composition", () => {
			const divideOneBy = (x: number): Validated.ValidatedType<number, string[]> => {
				return (x !== 0) ? Validated.valid(1 / x): Validated.invalid(["division by 0"])
			}

			expect(Validated.bind(divideOneBy)(Validated.invalid(["error 1"]))).toEqual(Validated.invalid(["error 1"]))
			expect(Validated.bind(divideOneBy)(Validated.valid(0))).toEqual(Validated.invalid(["division by 0"]))
			expect(Validated.bind(divideOneBy)(Validated.valid(1 / 42))).toEqual(Validated.valid(42))
		})
	})

	describe("filter", () => {
		it("should filter the value in the Option context", () => {
			const filter = (x: number) => x > 41

			expect(Validated.filter(filter)("error 2")(Validated.invalid(["error 1"]))).toEqual(Validated.invalid(["error 1"]))
			expect(Validated.filter(filter)("error 2")(Validated.valid(0))).toEqual(Validated.invalid(["error 2"]))
			expect(Validated.filter(filter)("error 2")(Validated.valid(42))).toEqual(Validated.valid(42))
		})
	})

	describe("fold", () => {
		it("should transform the Validated to given type", () => {
			const addOne = (x: number): number => x + 1

			expect(Validated.fold(addOne)(0)(Validated.invalid(["error 1"]))).toBe(0)
			expect(Validated.fold(addOne)(0)(Validated.valid(41))).toBe(42)
		})
	})

	describe("isValid", () => {
		it("should return wether the Validated is empty", () => {
			expect(Validated.isValid(Validated.invalid(["error 1"]))).toBe(false)
			expect(Validated.isValid(Validated.valid(42))).toBe(true)
		})
	})

	describe("isInvalid", () => {
		it("should return wether the Validated is empty", () => {
			expect(Validated.isInvalid(Validated.invalid(["error 1"]))).toBe(true)
			expect(Validated.isInvalid(Validated.valid(42))).toBe(false)
		})
	})

	describe("toString", () => {
		it("should transform the Validated to a string", () => {
			expect(Validated.toString(Validated.invalid(["error 1"]))).toEqual("Invalid(error 1)")
			expect(Validated.toString(Validated.valid(42))).toEqual("Valid(42)")
		})
	})

	describe("toOption", () => {
		it("should transform the Validated to an Option", () => {
			expect(Validated.toOption(Validated.invalid(["error 1"]))).toEqual(Option.None)
			expect(Validated.toOption(Validated.valid(42))).toEqual(Option.unit(42))
		})
	})
})
