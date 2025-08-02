import { href } from "react-router";
import { Breadcrumb } from "~/components";

export const handle = {
	breadcrumb: () => ({ label: "Sitemap", path: "/sitemap" }),
};
export default function SitemapPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<Breadcrumb />
			<h1 className="mb-4 font-bold text-3xl">Sitemap</h1>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				<div>
					<h2 className="mb-2 font-semibold text-xl">Products</h2>
					<ul>
						<li>
							<a href={href("/:resource/sitemap.xml", { resource: "p" })}>
								Products XML
							</a>
						</li>
					</ul>
				</div>
				<div>
					<h2 className="mb-2 font-semibold text-xl">Categories</h2>
					<ul>
						<li>
							<a href={href("/:resource/sitemap.xml", { resource: "c" })}>
								Categories XML
							</a>
						</li>
					</ul>
				</div>
				<div>
					<h2 className="mb-2 font-semibold text-xl">Info Hub</h2>
					<ul>
						<li>
							<a
								href={href("/:resource/sitemap.xml", { resource: "info-hub" })}
							>
								Info Hub XML
							</a>
						</li>
					</ul>
				</div>
				<div>
					<h2 className="mb-2 font-semibold text-xl">Pages</h2>
					<ul>
						<li>
							<a href={href("/:resource/sitemap.xml", { resource: "pages" })}>
								Pages XML
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
