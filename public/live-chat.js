const __lc = {};
__lc.license = 1215771;
__lc.skill = 41;

(() => {
	const lc = document.createElement("script");
	lc.type = "text/javascript";
	lc.async = true;
	lc.src = `${document.location.protocol === "https:" ? "https://" : "http://"}cdn.livechatinc.com/tracking.js`;

	// Try to append to <body>, fallback to <head>
	const parent = document.body || document.head;
	parent.appendChild(lc);
})();
