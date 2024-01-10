/*
 * Author: Ayush Singh
 * File: pagination.dto.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */ type PaginationDto = {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number | null;
    prevPage: number | null;
    page: number;
    totalObjects: number;
    totalPages: number;
};

export { PaginationDto };
