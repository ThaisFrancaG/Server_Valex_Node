import * as rechargeInfo from "../repositories/rechargeRepository.js";
import dayjs from "dayjs";

export async function newRecharge(id: number, rechargeValue: number) {
  await rechargeInfo.insert({ cardId: id, amount: rechargeValue });
}

export async function newPurchase(
  id: number,
  businessId: number,
  purchaseValue: number
) {
  console.log("chegou no service");
}
