if (location.pathname.endsWith('/index.html')) {
	history.replaceState(null, document.title, location.pathname.replace(/index\.html$/u, ''));
}
