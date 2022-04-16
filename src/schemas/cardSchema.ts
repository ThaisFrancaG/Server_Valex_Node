import joi from "joi";

const cardSchema = joi.object({
  cvc: joi.string().required(),
  password: joi.string().required(),
});

export { cardSchema };
