import { NextFunction, Request, Response } from 'express';
import { FetchRoleById } from '../services/role.service';
import { FetchRequiredPerms } from '../utils/permission.parser';
import { generateResponse } from '../utils/response.creator';
import { Types } from 'mongoose';

/**
 * Middleware for user authorization based on resource key and required permissions.
 *
 * @param resourceKey - Key representing the resource.
 * @param requiredPerms - Optional parameter for explicitly specifying required permissions.
 */
const AuthorizationMiddleware = (
  resourceKey: number,
  requiredPerms?: string
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Initialize the allow flag to false
      let allow = false;

      // Fetch the user's role based on the role ID in res.locals.user
      const userRole = await FetchRoleById(new Types.ObjectId(res.locals.user.role));

      // If userRole is not found, deny access (403 Forbidden)
      if (!userRole) return generateResponse(res, 403);

      // Find the resource in the user's role based on the provided resourceKey
      const userResources = userRole.resources.find(
        (resource) => resource.resourceKey === resourceKey
      );

      // If userResources is not found, deny access (403 Forbidden)
      if (!userResources) return generateResponse(res, 403);

      // Extract the user's permissions for the specified resource
      const userPerms: string = userResources.permissions
        .map((perms) => perms.val)
        .join('');

      // If requiredPerms is not provided, fetch required permissions based on the HTTP method
      if (!requiredPerms)
        requiredPerms = FetchRequiredPerms(req.method, userResources.permissions);

      // Perform bitwise AND operation to check if the user has the required permissions
      if (
        (parseInt(requiredPerms, 2) & parseInt(userPerms, 2)) ===
        parseInt(requiredPerms, 2)
      ) {
        allow = true;
      }

      // If the last character of requiredPerms is '1', deny access
      if (requiredPerms.charAt(requiredPerms.length - 1) === '1') {
        allow = false;
      }

      // If allow is true, proceed to the next middleware or route handler
      if (allow) {
        next();
      } else {
        // Otherwise, deny access (403 Forbidden)
        return generateResponse(res, 403);
      }
    } catch (error: any) {
      // Handle any errors by denying access (403 Forbidden)
      return generateResponse(res, 403);
    }
  };
};

export { AuthorizationMiddleware };
