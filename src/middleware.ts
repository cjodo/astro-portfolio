import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
	const { request, url } = context;
	
	// Skip auth for login page and static assets
	if (url.pathname === '/admin/login' || url.pathname.startsWith('/_astro/') || url.pathname.startsWith('/api/')) {
		return next();
	}
	
	// Check if user is authenticated
	const cookies = request.headers.get('cookie') || '';
	console.log('Middleware - Cookies:', cookies);
	const isAuthenticated = cookies.includes('auth=true');
	console.log('Middleware - Is Authenticated:', isAuthenticated);
	
	// Redirect to login if not authenticated and trying to access admin routes
	if (url.pathname.startsWith('/admin') && !isAuthenticated) {
		console.log('Middleware - Redirecting to login');
		return Response.redirect(new URL('/admin/login', url), 302);
	}
	
	// If already authenticated and trying to access login, redirect to dashboard
	if (url.pathname === '/admin/login' && isAuthenticated) {
		return Response.redirect(new URL('/admin/dashboard', url), 302);
	}
	
	return next();
});
