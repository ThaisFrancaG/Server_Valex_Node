import * as rechargeInfo from "../repositories/rechargeRepository.js";
import dayjs from "dayjs";

export async function newRecharge(id: number, rechargeValue: number) {
  await rechargeInfo.insert({ cardId: id, amount: rechargeValue });
}
