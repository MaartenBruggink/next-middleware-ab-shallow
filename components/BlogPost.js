import styles from "../styles/Home.module.css"

import Link from "next/link"
import { useRouter } from "next/router"

const POSTS = ["hello-world", "sup-world", "at-worlds-end"]

export default function BlogPost({ version }) {
	const { query } = useRouter()

	console.log("query", query)

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
							{slug}
						</Link>
					)
				})}
			</nav>
		</div>
	)
}
