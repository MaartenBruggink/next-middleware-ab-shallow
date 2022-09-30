import styles from "../styles/Home.module.css"

import Link from "next/link"
import { useRouter } from "next/router"

const POSTS = ["hello-world", "sup-world", "at-worlds-end"]

export default function BlogPost({ version }) {
	const { query, replace } = useRouter()

	console.log("query", query)

	// const onClick = (e) => {
	// 	e.preventDefault()

	// 	const internalUrl = e.target.pathname.replace("/page", "/new-page")

	// 	replace(internalUrl, null, {
	// 		shallow: true,
	// 	})

	// 	requestAnimationFrame(() => {
	// 		history.replaceState({ test: "123" }, null, e.target.pathname)
	// 	})
	// }

	return (
		<div className={styles.container}>
			<Link href="/">index</Link>

			<h1 style={{ color: version === "b" ? "red" : "black" }}>{query.test}</h1>

			<nav className={styles.nav}>
				{POSTS.map((slug) => {
					return (
						<Link
							key={slug}
							href={`/${slug}/page`}
							scroll={false}
							shallow={true}
						>
							<a>{slug}</a>
							{/* <a onClick={onClick}>{slug}</a> */}
						</Link>
					)
				})}
			</nav>
		</div>
	)
}
