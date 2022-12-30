import joi, { ArraySchema, ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import logging from "../library/Logging.js";
import { dishDocument } from "../models/dishes.js";
import { leaderDocument } from "../models/leaders.js";
import { promotionDocument } from "../models/promotions.js";
import { userDocument } from "../models/users";

export const ValidateSchema = (schema: ObjectSchema | ArraySchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      logging.error(error);
      return res.status(422).json({ error });
    }
  };
};
interface favDocument {
  dish: string;
}
interface passDocument {
  oldPassword: string;
  newPassword: string;
}

export const validationSchemas = {
  dish: {
    create: joi.object<dishDocument>({
      name: joi.string().required(),
      description: joi.string().required(),
      category: joi.string().required(),
      image: joi.string().required(),
      label: joi.string().required(),
      price: joi.number().required(),
      featured: joi.boolean().required(),
    }),
    update: joi.object<dishDocument>({
      name: joi.string(),
      description: joi.string(),
      category: joi.string(),
      image: joi.string(),
      label: joi.string(),
      price: joi.number(),
      featured: joi.boolean(),
    }),
  },
  favourite: joi.array().items(
    joi.object<favDocument>({
      dish: joi.string().required(),
    })
  ),
  leader: {
    create: joi.object<leaderDocument>({
      name: joi.string().required(),
      image: joi.string().required(),
      designation: joi.string().required(),
      abbr: joi.string().required(),
      description: joi.string().required(),
    }),
    update: joi.object<leaderDocument>({
      name: joi.string(),
      image: joi.string(),
      designation: joi.string(),
      abbr: joi.string(),
      description: joi.string(),
    }),
  },
  promotion: {
    create: joi.object<promotionDocument>({
      name: joi.string().required(),
      image: joi.string().required(),
      label: joi.string().required(),
      price: joi.number().required(),
    }),
    update: joi.object<promotionDocument>({
      name: joi.string(),
      image: joi.string(),
      label: joi.string(),
      price: joi.number(),
    }),
  },
  user: {
    create: joi.object<userDocument>({
      username: joi.string().required(),
      password: joi
        .string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
        .required(),
      firstname: joi.string(),
      lastname: joi.string(),
    }),
    update: joi.object<userDocument>({
      firstname: joi.string(),
      lastname: joi.string(),
    }),
    updatePassword: joi.object<passDocument>({
      oldPassword: joi.string().required(),
      newPassword: joi
        .string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
        .required(),
    }),
  },
};
