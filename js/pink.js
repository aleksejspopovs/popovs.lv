(function () {
	const pinks = ['#ffc0cb', '#ffb6c1', '#ff69b4', '#ff1493', '#f1ddcf', '#ffddf4', '#fddde6', '#f9ccca', '#f4c2c2', '#f7bfbe', '#efbbcc', '#f2bdcd', '#f2c1d1', '#ffb7c5', '#ffb3de', '#fbaed2', '#ffbcd9', '#ffa6c9', '#ff91af', '#fc89ac', '#f19cbb', '#e68fac', '#de6fa1', '#ffdae9', '#e4717a', '#f88379', '#dea5a4', '#d7837f', '#893843', '#c78b95', '#c4aead', '#e8ccd7', '#dbb2d1', '#997a8d', '#e8c3ba', '#edcdc2', '#d74894', '#e4007c', '#da1884', '#de5285', '#e63e62', '#fb607f', '#fd6c9e', '#ff007f', '#f77fbe', '#ff66cc', '#ff5ccd', '#ff6fff', '#fc0fc0', '#cf6ba9', '#ed7a9b', '#cc33cc']

	function setPink(pink) {
    document.documentElement.style.setProperty('--pink', pink)
    document.getElementById('theme-color').content = pink
  }

  setPink(pinks[Math.round(Math.random() * (pinks.length - 1))])
})()
