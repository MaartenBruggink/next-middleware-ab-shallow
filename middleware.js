import { NextResponse } from "next/server"

export const config = {
	matcher: ["/:test/page"],
}

const getRandomElement = (variations = []) => variations[1]

const abTestConfig = {
	name: "test",
	variations: [
		{
			weight: 50,
			name: "Original",
			variation_ID: 0,
		},
		{
			weight: 50,
			name: "new-page",
			variation_ID: 1,
		},
	],
	modifyUrlObject: (url = {}, value = "") => {
		const [match] = url.pathname.split("/").filter(Boolean)
		url.pathname = [match, value].join("/")
		return url
	},
}

export const middleware = (req) => {
	if (!abTestConfig) return

	const { name = "", variations = [], modifyUrlObject = null } = abTestConfig

	let abTestValue = req.cookies.get(name)
	let updateCookie = false

	if (!abTestValue || !variations.find(({ name }) => name === abTestValue)) {
		abTestValue = getRandomElement(variations)?.name
		updateCookie = true
	}

	let url = req.nextUrl.clone()

	if (abTestValue !== "Original" && modifyUrlObject) {
		url = modifyUrlObject(url, abTestValue)
	}

	const res = NextResponse.rewrite(url)

	if (updateCookie) res.cookies.set(name, abTestValue)

	return res
}
