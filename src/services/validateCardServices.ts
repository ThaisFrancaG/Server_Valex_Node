import * as currentCardInfo from "../repositories/cardRepository.js";
import bcrypt from "bcrypt";
import dayjs from "dayjs";

export async function validateCard(
  cardId: string,
  cardCVC: string,
  password: string
) {
  await checkCardStatus(cardId, cardCVC);
  //aqui eu sei que todos os dados do cartão foram conferidos e estão ok
}

async function checkCardStatus(cardId: string, cardCVC: string) {
  const cardInfo = await currentCardInfo.findById(parseInt(cardId));

  if (!cardInfo) {
    throw { code: 404, message: "Card Not Found" };
  }

  let checkCVC = bcrypt.compareSync(cardCVC, cardInfo.securityCode);
  console.log(checkCVC);

  if (!checkCVC) {
    throw { code: 401, message: "Check Your Information" };
  }

  console.log(cardInfo);
  const currentDate = dayjs().format("MM/YY");
  console.log(currentDate);

  const checkExpiration = dayjs().format("MM/YY") > cardInfo.expirationDate;

  if (checkExpiration) {
    throw { code: 401, message: "Check Your Card Date" };
  }

  const checkPassword = cardInfo.password;

  if (checkPassword.length !== 0) {
    throw { code: 409, message: "Check Your Card Information" };
  }
}
