import {
	css,
	stringifyDeclaration,
	stringifyDeclarationList,
} from "./instance";

test("maps a simple CSS rule to a stable class name", () => {
	const c1 = css({ color: "red" });
	const c2 = css({ color: "red" });

	expect(c1).toBe(c2);
	expect(c1).toBe(c1.trim());
});

test("maps multiple simple CSS rules to a set of stable class names", () => {
	const c1 = css({ color: "red", background: "green" });
	const c2 = css({ background: "green", color: "red" });

	expect(new Set(c1.split(" "))).toEqual(new Set(c2.split(" ")));
});

test("auto-prefixes a CSS property–value pair", () => {
	const c1 = stringifyDeclaration("user-select", "none");

	expect(c1).toMatchInlineSnapshot(
		`"user-select:none;-ms-user-select:none;-moz-user-select:none;-webkit-user-select:none"`,
	);
});

test("postfixes numeric CSS value with a unit if necessary", () => {
	const c1 = stringifyDeclaration("padding", 16);

	expect(c1).toBe("padding:16px");
});

test("doesn't postfix unitless CSS values with a unit", () => {
	const c1 = stringifyDeclaration("line-height", 1.5);
	const c2 = stringifyDeclaration("padding", 0);

	expect(c1).toBe("line-height:1.5");
	expect(c2).toBe("padding:0");
});

test("stringifies fallback values in order", () => {
	const c1 = stringifyDeclarationList("justify-content", [
		"space-around",
		"space-evenly",
	]);

	expect(c1).toBe("justify-content:space-around;justify-content:space-evenly");
});