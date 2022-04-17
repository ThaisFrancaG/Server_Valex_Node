import * as rechargeInfo from "../repositories/rechargeRepository.js";
import * as currentCardInfo from "../repositories/cardRepository.js";
import * as businessRepositorie from "../repositories/businessRepository.js";

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

  console.log("passou nas cofnerencias");
}

function checkCardBalance(id) {}

function checkCardPassword(password, cardInfo) {
  if (!cardInfo.password) {
    throw { code: 409, message: "Card Not Yet Activated" };
  }
  let checkPassword = bcrypt.compareSync(password, cardInfo.password);

  if (!checkPassword) {
    throw { code: 401, message: "Check Password" };
  }
}

async function checkBusinessInfo(businessId, cardInfo) {
  console.log("chegou conferencia cartao");

  const businessInfo = await businessRepositorie.findById(businessId);
  console.log(businessInfo);

  if (!businessInfo) {
    throw { code: 404, message: "Business Not Found" };
  }

  if (businessInfo.type !== cardInfo.type) {
    throw { code: 401, message: "Card Type Invalid" };
  }
}

function makePurchase(businessId) {}
