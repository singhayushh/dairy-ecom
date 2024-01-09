#!/bin/bash

# Create the src directory
mkdir src
cd src || exit

# Create the app.ts file
touch app.ts

# Create the config directory
mkdir config
touch config/cloudinary.config.ts config/db.config.ts config/mailer.config.ts config/multer.config.ts config/redis.config.ts config/swagger.config.ts

# Create the controllers directory
mkdir controllers
touch controllers/address.controller.ts controllers/asset.controller.ts controllers/auth.controller.ts controllers/cart.item.controller.ts controllers/error.controller.ts controllers/order.controller.ts controllers/product.controller.ts controllers/role.controller.ts controllers/transaction.controller.ts controllers/ui.controller.ts

# Create the dtos directory
mkdir dtos
touch dtos/address.dto.ts dtos/asset.dto.ts dtos/cart.item.dto.ts dtos/order.dto.ts dtos/pagination.dto.ts dtos/product.dto.ts dtos/role.dto.ts dtos/transaction.dto.ts dtos/user.dto.ts

# Create the middlewares directory
mkdir middlewares
touch middlewares/authentication.middleware.ts middlewares/authorization.middleware.ts middlewares/validation.middleware.ts

# Create the models directory
mkdir models
touch models/address.model.ts models/asset.model.ts models/cart.item.model.ts models/order.model.ts models/product.model.ts models/role.model.ts models/transaction.model.ts models/user.model.ts

# Create the repositories directory
mkdir repositories
touch repositories/address.repo.ts repositories/asset.repo.ts repositories/cart.item.repo.ts repositories/order.repo.ts repositories/product.repo.ts repositories/role.repo.ts repositories/transaction.repo.ts repositories/user.repo.ts

# Create the routes directory
mkdir routes
touch routes/main.route.ts routes/ui.route.ts routes/user.route.ts

# Create the seeders directory
mkdir seeders
touch seeders/main.seeder.ts

# Create the services directory
mkdir services
touch services/address.service.ts services/asset.service.ts services/cart.item.service.ts services/order.service.ts services/pagination.service.ts services/product.service.ts services/role.service.ts services/transaction.service.ts services/user.service.ts

# Create the utils directory
mkdir utils
touch utils/logger.util.ts utils/mailer.util.ts utils/permission.parser.ts utils/response.creator.ts

# Print success message
echo "Directory and file structure created successfully."
