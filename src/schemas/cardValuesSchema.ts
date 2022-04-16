import joi from "joi";

const rechargeSchema = joi.object({
  recharge: joi.number().required(),
});

export { rechargeSchema };
