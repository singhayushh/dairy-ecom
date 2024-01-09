import { compare } from "bcryptjs";
import * as userRepository from "../repositories/user.repo";
import { randomBytes } from "crypto";
import { UserCacheDto, UserDto } from "../dtos/user.dto";
import { redisClient } from "../config/redis.config";
import env from "../config/env.config";
import { fetchRole } from "./role.service";

const signIn = async (email: string, password: string) => {
    const user = await userRepository.findByEmail(email);
    if (!user) return null;
    const checkPassword = await compare(
        String(password),
        user.password
    );

    if (!checkPassword) return null;

    const token = randomBytes(6).toString("hex");
    const role = await fetchRole("admin");
    const dto: UserCacheDto = {
        _id: user._id,
        name: user.name,
        email: user.contact.email,
        phone: user.contact.phone,
        role: user.role,
        isAdmin: role && role._id.toString() == user.role?.toString() ? true : false
    };

    await redisClient.setEx(token, env.SESSION_EXPIRY, JSON.stringify(dto));

    return { token, dto };
};

const createUser = (dto: UserDto) => {
    dto.slug = randomBytes(3).toString("hex");
    dto.code = dto.slug.toUpperCase();
    return userRepository.create(dto)
};

export { signIn, createUser };