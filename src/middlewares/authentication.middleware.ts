import { NextFunction, Request, Response } from 'express';
import { redisClient } from '../config/redis.config';
import { UserCacheDto } from '../dtos/user.dto';

/**
 * Middleware for user authentication.
 *
 * @param enforceAuth - If set to true, redirects to the sign-in page for unauthenticated users.
 * @param adminOnly - If set to true, redirects to the home page for non-admin users.
 */
const AuthenticationMiddleware = (enforceAuth: boolean = false, adminOnly: boolean = false) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if the session cookie is present
      if (!req.cookies || !req.cookies['session']) {
        throw new Error('Cookie not found');
      }

      // Retrieve the token from the session cookie
      const token = req.cookies['session'];

      // Retrieve user information from Redis cache using the token
      const userCache: string | null = await redisClient.get(token);

      // If userCache is null, the token is invalid
      if (!userCache) {
        throw new Error('Invalid token');
      }

      // Attach user information to res.locals for further use in the application
      res.locals.user = JSON.parse(userCache) as UserCacheDto;

      if (enforceAuth && adminOnly) {
        if (!res.locals.user.isAdmin) return res.redirect('/?message=Only admins can access this page');
      }
      // Continue to the next middleware or route handler
      next();
    } catch (error: any) {
      // Handle authentication errors

      if (enforceAuth) {
        // If enforceAuth is true, redirect unauthenticated users to the sign-in page
        return res.redirect('/session/new?message=Please sign in to view the page');
      } else {
        // If enforceAuth is false, continue to the next middleware or route handler
        res.locals.user = null;
        next();
      }
    }
  };
};

export { AuthenticationMiddleware };
