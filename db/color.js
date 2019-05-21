function generateColor() {
	let r = Math.random();
	r = Math.floor(r * 256);
	let g = Math.random();
	g = Math.floor(g * 256);
	let b = Math.random();
	b = Math.floor(b * 256);
	let rHex = r.toString(16).toUpperCase();
	let gHex = g.toString(16).toUpperCase();
	let bHex = b.toString(16).toUpperCase();

	return {
		rgb: {r, g, b},
		hex: `${rHex}${gHex}${bHex}`,
		timestamp: Date.now()
	};
}

export default generateColor;