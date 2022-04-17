import joi from "joi";

const rechargeSchema = joi.object({
  recharge: joi.number().required(),
});

const purchaseSchema = joi.object({
  purchase: joi.number().required(),
});

export { rechargeSchema, purchaseSchema };
