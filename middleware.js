import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Define protected routes
        const protectedRoutes = [
          '/workspace',
          '/contributions', 
          '/tasks',
          '/analytics',
          '/hub',
          '/file'
        ];
        
        // Check if the current path is protected
        const isProtectedRoute = protectedRoutes.some(route => 
          req.nextUrl.pathname.startsWith(route)
        );
        
        // If it's a protected route, user must be authenticated
        if (isProtectedRoute) {
          return !!token;
        }
        
        // For non-protected routes, allow access
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/workspace/:path*',
    '/contributions/:path*',
    '/tasks/:path*', 
    '/analytics/:path*',
    '/hub/:path*',
    '/file/:path*'
  ]
};
