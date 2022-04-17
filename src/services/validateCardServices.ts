import * as currentCardInfo from "../repositories/cardRepository.js";
import bcrypt from "bcrypt";
import dayjs from "dayjs";

export async function validateCard(
  cardId: string,
  cardCVC: string,
  password: string
) {
  await checkCardStatus(cardId, cardCVC);

  await cardValidation(cardId, password);
}

async function checkCardStatus(cardId: string, cardCVC: string) {
  const cardInfo = await currentCardInfo.findById(parseInt(cardId));

  if (!cardInfo) {
    throw { code: 404, message: "Card Not Found" };
  }

  let checkCVC = bcrypt.compareSync(cardCVC, cardInfo.securityCode);

  if (!checkCVC) {
    throw { code: 401, message: "Check Your Information" };
  }

  const checkExpiration = dayjs().format("MM/YY") > cardInfo.expirationDate;

  if (checkExpiration) {
    throw { code: 401, message: "Check Your Card Date" };
  }

  const checkPassword = cardInfo.password;

  if (checkPassword.length !== 0) {
    throw { code: 409, message: "Check Your Card Information" };
  }
}

async function cardValidation(cardId: string, givenPassword: string) {
  const password = bcrypt.hashSync(givenPassword, 10);
  const id = parseInt(cardId);

  await currentCardInfo.update(id, { password });
}
