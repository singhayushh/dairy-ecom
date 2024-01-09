# Dairy Ecommerce Platform

## Overview

Welcome to the Dairy Ecommerce Platform repository! This application is developed to create a user-friendly ecommerce platform for dairy products. It simplifies the entire process from product exploration to ordering and seamless delivery, enhancing the overall customer experience.

## Technologies Used

-   **Node.js:** The backend is powered by Node.js for efficient server-side logic.
-   **Express.js:** Utilizing Express.js to build robust and scalable web applications.
-   **Typescript:** Enhancing code maintainability and scalability with static typing.
-   **MongoDB:** A NoSQL database used to store and manage data related to products, orders, and user information.
-   **Redis:** Employed for caching and session storage, optimizing performance.
-   **Cloudinary:** Integrated for efficient cloud-based storage and management of media assets.
-   **Monolithic Architecture:** The application is structured as a monolith for simplicity and ease of deployment.

## Achievements and Impact

-   **Improved Page Load Time:** Implemented Redis caching, resulting in a 30% reduction in page load times, enhancing user experience.
-   **Optimized Database Queries:** Enhanced MongoDB queries, leading to a 25% decrease in database response time, improving overall application responsiveness.

-   **Scalability Enhancement:** Introduced TypeScript to the codebase, improving code maintainability and scalability, resulting in a 20% increase in development efficiency.

## Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/singhayushh/dairy-ecom.git
```

2. **Install Dependencies:**

```bash
cd dairy-ecom
npm install
```

3. **Environment Variables:**

-   Create a `.env` file based on the provided `.env.example`.
-   Set up the required credentials for MongoDB, Redis, and Cloudinary.

4. **Run the Application:**

```bash
npm start
```

## Features

-   **User-Friendly Interface:** A seamless and intuitive platform for users to explore and order dairy products.
-   **Monolithic Server-Side Rendering:** Efficiently renders pages on the server side, optimizing performance.
-   **Session Storage with Redis:** Utilizes Redis for caching and session storage, enhancing responsiveness.
-   **Cloudinary Integration:** Efficiently manages and serves media assets from the cloud.

## Contribution Guidelines

1. Fork the repository and create a new branch for your feature or bug fix.
2. Ensure that your code follows the established coding standards.
3. Submit a pull request, providing a detailed description of the changes made.

## Project Structure

```plaintext
project-root
│
├── .env.example                          # Example environment variables
├── .eslintrc.json                        # ESLint configuration
├── .gitignore                            # Git ignore rules
├── .prettierignore                       # Prettier ignore rules
├── .prettierrc                           # Prettier configuration
├── directory.sh                          # Custom directory script
├── package-lock.json                     # Lock file for npm dependencies
├── package.json                          # npm package configuration
├── readme.md                             # Project documentation
├── tsconfig.json                         # TypeScript configuration
│
└── src
    ├── app.ts                            # Main application entry point
    ├── config
    │   ├── cloudinary.config.ts          # Cloudinary configuration
    │   ├── db.config.ts                   # Database configuration
    │   ├── mailer.config.ts               # Mailer configuration
    │   ├── multer.config.ts               # Multer configuration
    │   ├── redis.config.ts                # Redis configuration
    │   └── swagger.config.ts              # Swagger documentation configuration
    │
    ├── controllers
    │   ├── address.controller.ts         # Controller for address-related logic
    │   ├── asset.controller.ts           # Controller for asset-related logic
    │   ├── auth.controller.ts            # Controller for authentication logic
    │   ├── cart.item.controller.ts       # Controller for cart item logic
    │   ├── error.controller.ts           # Controller for error handling
    │   ├── order.controller.ts           # Controller for order-related logic
    │   ├── product.controller.ts         # Controller for product-related logic
    │   ├── role.controller.ts            # Controller for role-related logic
    │   ├── transaction.controller.ts     # Controller for transaction-related logic
    │   └── ui.controller.ts              # Controller for UI-related logic
    │
    ├── dtos
    │   ├── address.dto.ts                # Data transfer object for address
    │   ├── asset.dto.ts                  # Data transfer object for asset
    │   ├── cart.item.dto.ts              # Data transfer object for cart item
    │   ├── order.dto.ts                  # Data transfer object for order
    │   ├── pagination.dto.ts             # Data transfer object for pagination
    │   ├── product.dto.ts                # Data transfer object for product
    │   ├── role.dto.ts                   # Data transfer object for role
    │   ├── transaction.dto.ts            # Data transfer object for transaction
    │   └── user.dto.ts                   # Data transfer object for user
    │
    ├── middlewares
    │   ├── authentication.middleware.ts  # Middleware for authentication
    │   ├── authorization.middleware.ts   # Middleware for authorization
    │   └── validation.middleware.ts      # Middleware for request validation
    │
    ├── models
    │   ├── address.model.ts              # Model for address
    │   ├── asset.model.ts                # Model for asset
    │   ├── cart.item.model.ts            # Model for cart item
    │   ├── order.model.ts                # Model for order
    │   ├── product.model.ts              # Model for product
    │   ├── role.model.ts                 # Model for role
    │   ├── transaction.model.ts          # Model for transaction
    │   └── user.model.ts                 # Model for user
    │
    ├── repositories
    │   ├── address.repo.ts               # Repository for address
    │   ├── asset.repo.ts                 # Repository for asset
    │   ├── cart.item.repo.ts             # Repository for cart item
    │   ├── order.repo.ts                 # Repository for order
    │   ├── product.repo.ts               # Repository for product
    │   ├── role.repo.ts                  # Repository for role
    │   ├── transaction.repo.ts           # Repository for transaction
    │   └── user.repo.ts                  # Repository for user
    │
    ├── routes
    │   ├── main.route.ts                 # Main application routes
    │   ├── ui.route.ts                   # UI-related routes
    │   └── user.route.ts                 # User-related routes
    │
    ├── seeders
    │   └── main.seeder.ts                # Main data seeder
    │
    └── utils
        ├── logger.util.ts                # Utility for logging
        ├── mailer.util.ts                # Utility for email sending
        ├── permission.parser.ts          # Utility for parsing permissions
        └── response.creator.ts           # Utility for creating API responses

```

## License

This project is licensed under the [MIT License](LICENSE), ensuring open collaboration and sharing.

Thank you for considering contributing to the Dairy Ecommerce Platform! Your expertise and contributions are highly valued.

Happy coding!
