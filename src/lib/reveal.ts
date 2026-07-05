/**
 * A Svelte action to add the 'reveal-active' class when the element enters the viewport.
 */
export function reveal(
	node: HTMLElement,
	options = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
) {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				node.classList.add('reveal-active');
				observer.unobserve(node); // Reveal only once
			}
		});
	}, options);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
