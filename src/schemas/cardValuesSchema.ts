import joi from "joi";

const rechargeSchema = joi.object({
  recharge: joi.number().required(),
});

const purchaseSchema = joi.object({
  purchase: joi.number().required(),
  password: joi.string().required(),
});

export { rechargeSchema, purchaseSchema };
