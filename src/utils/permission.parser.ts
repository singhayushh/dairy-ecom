/*
 * Author: Ayush Singh
 * File: permission.parser.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { PermissionDto } from "../dtos/role.dto";

const FetchRequiredPerms = (
    requestMethod: string,
    permissions: PermissionDto[]
) => {
    const requiredPerms: number[] = new Array<number>(permissions.length).fill(
        0
    );
    switch (requestMethod) {
        case "POST":
            requiredPerms[0] = 1;
            break;
        case "GET":
            requiredPerms[1] = 1;
            break;
        case "PATCH":
            requiredPerms[2] = 1;
            break;
        case "PUT":
            requiredPerms[2] = 1;
            break;
        case "DELETE":
            requiredPerms[3] = 1;
            break;
    }
    return requiredPerms.join("");
};

export { FetchRequiredPerms };
