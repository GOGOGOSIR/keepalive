export default function (dom) {
	setTimeout(() => {
		dom.scrollIntoView(true)
		dom.scrollIntoViewIfNeeded();
	},200)
}