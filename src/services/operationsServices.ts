import * as rechargeInfo from "../repositories/rechargeRepository.js";
import * as currentCardInfo from "../repositories/cardRepository.js";
import * as businessRepositorie from "../repositories/businessRepository.js";
import * as rechargeRepositorie from "../repositories/rechargeRepository.js";
import * as purchaseRepositorie from "../repositories/paymentRepository.js";

import bcrypt from "bcrypt";

import dayjs from "dayjs";

export async function newRecharge(id: number, rechargeValue: number) {
  await rechargeInfo.insert({ cardId: id, amount: rechargeValue });
}

export async function newPurchase(
  id: number,
  businessId: number,
  purchaseValue: number,
  password: string
) {
  const cardInfo = await currentCardInfo.findById(id);

  checkCardPassword(password, cardInfo);
  await checkBusinessInfo(businessId, cardInfo);
  const balance = await checkCardBalance(id);
  await makePurchase(id, businessId, balance, purchaseValue);
}

async function checkCardBalance(id: number) {
  const recharges = await rechargeRepositorie.findByCardId(id);
  const purchases = await purchaseRepositorie.findByCardId(id);

  let totalRecharges = 0;
  let totalPurchases = 0;

  recharges.map((recharge) => {
    totalRecharges = totalRecharges + recharge.amount;
  });

  purchases.map((purchase) => {
    totalPurchases = totalPurchases + purchase.amount;
  });

  return totalRecharges - totalPurchases;
}

function checkCardPassword(password: string, cardInfo: any) {
  if (!cardInfo.password) {
    throw { code: 409, message: "Card Not Yet Activated" };
  }
  let checkPassword = bcrypt.compareSync(password, cardInfo.password);

  if (!checkPassword) {
    throw { code: 401, message: "Check Password" };
  }
}

async function checkBusinessInfo(businessId: number, cardInfo: any) {
  const businessInfo = await businessRepositorie.findById(businessId);

  if (!businessInfo) {
    throw { code: 404, message: "Business Not Found" };
  }

  if (businessInfo.type !== cardInfo.type) {
    throw { code: 401, message: "Card Type Invalid" };
  }
}

async function makePurchase(
  id: number,
  businessId: number,
  balance: number,
  purchaseValue: number
) {
  if (balance - purchaseValue <= 0) {
    throw { code: 401, message: "Insuficient Funds" };
  }

  await purchaseRepositorie.insert({
    cardId: id,
    businessId: businessId,
    amount: purchaseValue,
  });
}
