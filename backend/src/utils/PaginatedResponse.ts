import {
  IPaginatedResponse,
  IPaginationMetadata,
  IPaginationOptions,
} from "@/types/pagination.types";
import { Document, FilterQuery, Model } from "mongoose";

class PaginatedHelper {
  static async paginate<T extends Document>(
    model: Model<T>,
    {
      options,
      filter,
      populate,
      select,
    }: {
      options: IPaginationOptions;
      filter: Record<string, any>;
      populate?: string | string[];
      select?: string;
    }
  ): Promise<IPaginatedResponse<T>> {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
      search,
      searchFields = [],
    } = options;

    // Ensure page and limit are positive integers
    const validPage = Math.max(1, Math.floor(page));
    const validLimit = Math.max(1, Math.min(100, Math.floor(limit))); // Max 100 items per page
    const skip = (validPage - 1) * validLimit;

    // Build search query
    if (search && searchFields.length > 0) {
      filter.$or = searchFields.map((field) => ({
        [field]: { $regex: search, $options: "i" },
      }));
    }

    const sort: any = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Execute queries in parallel
    const [data, totalItems] = await Promise.all([
      model
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(validLimit)
        .populate(populate || "")
        .select(select || "")
        .lean(),
      model.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalItems / validLimit);
    const hasNextPage = validPage < totalPages;
    const hasPreviousPage = validPage > 1;

    const metadata: IPaginationMetadata = {
      currentPage: validPage,
      pageSize: validLimit,
      totalItems,
      totalPages,
      hasNextPage,
      hasPreviousPage,
      nextPage: hasNextPage ? validPage + 1 : null,
      previousPage: hasPreviousPage ? validPage - 1 : null,
    };

    return {
      data: data as T[],
      metadata,
      message: "Data retrieved successfully",
    };
  }

  static extractPaginationParams(query: any): IPaginationOptions {
    return {
      page: query.page ? parseInt(query.page, 10) : 1,
      limit: query.limit ? parseInt(query.limit, 10) : 10,
      sortBy: query.sortBy || "createdAt",
      sortOrder: query.sortOrder === "asc" ? "asc" : "desc",
      search: query.search,
      searchFields: query.searchFields ? query.searchFields.split(",") : [],
    };
  }
}

export default PaginatedHelper;
