import joi from "joi";

const newCardSchema = joi.object({
  employeeId: joi.number().required(),
  cardType: joi.string().required(),
});

const cardSchema = joi.object({
  cvc: joi.string().required(),
  password: joi.string().required(),
});

export { cardSchema, newCardSchema };
