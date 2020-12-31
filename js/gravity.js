(function () {
	const imageWidth = 800 * window.devicePixelRatio
	const imageHeight = 48 * window.devicePixelRatio
	let currentDirection = 0
	let currentState = null
	let currentParticles = []
	let animating = false

	function pickRandomInteger() {
		let x = Math.random()
		let i = 0
		let p = 0.5
		while (x >= p) {
			x -= p
			p *= 0.5
			i++
		}
		return i * ((Math.random() < 0.5) ? (-1) : 1)
	}

	function clamp(min, x, max) {
		return Math.max(min, Math.min(x, max))
	}

	function evolveState() {
		currentParticles.sort((currentDirection === 1) ? ((x, y) => y - x) : ((x, y) => x - y))
		let particleAt = new Map()
		for (let i = 0; i < currentParticles.length; i++) {
			particleAt.set(currentParticles[i], i)
		}

		let movement = false
		for (let p = 0; p < currentParticles.length; p++) {
			let i = currentParticles[p]
			let j = i + imageWidth * currentDirection
			let x = i % imageWidth
			let delta = clamp(-x, pickRandomInteger(), imageWidth - x - 1)
			j += delta

			let ip = 4*i + 3
			let jp = 4*j + 3
			if ((jp > 0) && (jp < currentState.data.length) && (currentState.data[jp] < currentState.data[ip])) {
				movement = true
				let old = currentState.data[jp]
				currentState.data[jp] = currentState.data[ip]
				currentState.data[ip] = old

				currentParticles[p] = j
				if (particleAt.has(j)) {
					currentParticles[particleAt.get(j)] = i
					particleAt.set(i, particleAt.get(j))
				} else {
					particleAt.delete(i)
				}
				particleAt.set(j, p)
			}
		}

		return movement
	}

	function constructInitialState(canvas, ctx) {
		ctx.font = 'bold ' + (24 * window.devicePixelRatio) + 'pt body'
		ctx.textBaseline = 'bottom'

		let prefix = 'hi there, I\'m Aleks'
		let suffix = 'ejs'
		let fullStringWidth = ctx.measureText(prefix + suffix).width
		let suffixWidth = ctx.measureText(suffix).width

		let pad = 5 * window.devicePixelRatio
		ctx.fillText(prefix, (canvas.width - fullStringWidth) / 2, imageHeight - pad)
		ctx.fillStyle = '#999'
		ctx.fillText(suffix, (canvas.width + fullStringWidth) / 2 - suffixWidth, imageHeight - pad)

		let state = ctx.getImageData(0, 0, imageWidth, imageHeight)

		// convert to grayscale
		for (let i = 0; i < state.data.length / 4; i++) {
			let avg = Math.round(
				(255 - (state.data[4*i] + state.data[4*i+1] + state.data[4*i+2]) / 3)
				* (state.data[4*i + 3] / 255)
			)
			state.data[4*i] = 0
			state.data[4*i + 1] = 0
			state.data[4*i + 2] = 0
			state.data[4*i + 3] = avg
		}

		return state
	}

	function gravityInit() {
		let canvas = document.getElementById('name')

		canvas.width = imageWidth
		canvas.height = imageHeight

		canvas.addEventListener('dblclick', boop)
		canvas.addEventListener('mousedown', (e) => e.preventDefault())

		let ctx = canvas.getContext('2d')

		currentState = constructInitialState(canvas, ctx)

		for (let i = 0; i < currentState.data.length / 4; i++) {
			if (currentState.data[4*i + 3] !== 0) {
				currentParticles.push(i)
			}
		}

		render()
	}

	function render() {
		let ctx = document.getElementById('name').getContext('2d')
		ctx.putImageData(currentState, 0, 0)
	}

	function animate() {
		animating = evolveState()
		if (animating) {
			render()
			requestAnimationFrame(animate)
		}
	}

	function boop(e) {
		if (currentDirection === 0) {
			currentDirection = 1
		} else {
			currentDirection *= -1
		}

		if (!animating) {
			animate()
		}
	}

	gravityInit()
})()
