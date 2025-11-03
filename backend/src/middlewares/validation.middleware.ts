import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import ApiError from "@/utils/ApiError";

// export const validate = (schema: Joi.ObjectSchema) => {
//   return (req: Request, res: Response, next: NextFunction): void => {
//     const { error } = schema.validate(req.body, { abortEarly: false });

//     if (error) {
//       const errors = error.details.map((detail) => ({
//         field: detail.path.join("."),
//         message: detail.message.replace(/"/g, ""),
//         type: detail.type,
//       }));

//       return next(new ApiError(422, "Validation failed", { errors }));
//     }

//     next();
//   };
// };

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // Get all errors, not just first one
      stripUnknown: true, // Remove unknown fields
    });

    if (error) {
      // Format Joi errors
      const errors = error.details.reduce((acc, curr) => {
        acc[curr.path.join(".")] = curr.message;
        return acc;
      }, {} as Record<string, string>);

      const apiError = ApiError.unprocessableEntity(
        "Validation failed",
        errors
      );
      return res.status(apiError.statusCode).json(apiError);
    }

    // Replace req.body with validated and sanitized value
    req.body = value;
    next();
  };
};
