import { NextFunction, Request, Response } from 'express';
import * as userService from '../services/user.service';
import { UserDto } from '../dtos/user.dto';

/**
 * Renders the sign-in page.
 *
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction.
 */
const RenderSignIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.render('login', { message: req.query.message });
  } catch (error) {
    next(error);
  }
};

/**
 * Renders the sign-up page.
 *
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction.
 */
const RenderSignUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.render('register', { message: req.query.message });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles user sign-in.
 *
 * @param req - Express Request object with user credentials.
 * @param res - Express Response object.
 * @param next - Express NextFunction.
 */
const SignIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Sign in the user using the provided credentials
    const result = await userService.signIn(email, password);

    if (result) {
      // Set a session cookie if sign-in is successful
      res.cookie('session', result.token, {
        httpOnly: true,
        secure: false, // Change to true in a production environment with HTTPS
        maxAge: 60 * 24 * 8.64e7, // Set the cookie expiration time (8.64e7 milliseconds = 1 day)
      });
      return res.redirect('/?message=success');
    } else {
      // Redirect to the home page with a failed message if sign-in fails
      return res.redirect('/?message=failed');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Handles user sign-up.
 *
 * @param req - Express Request object with user details.
 * @param res - Express Response object.
 * @param next - Express NextFunction.
 */
const SignUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract user details from the request body
    const dto: UserDto = { ...req.body };

    // Create a new user using the provided details
    const user = await userService.createUser(dto);

    // Redirect to the login page with a message to verify email before login
    return res.redirect('/auth/login?message=Verify email before login');
  } catch (error) {
    next(error);
  }
};

/**
 * Handles user sign-out.
 *
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction.
 */
const SignOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Clear the session cookie on sign-out
    res.cookie('session', null, { maxAge: 0 });
    res.redirect('/auth/login');
  } catch (error) {
    next(error);
  }
};

export { RenderSignIn, RenderSignUp, SignIn, SignOut, SignUp };
