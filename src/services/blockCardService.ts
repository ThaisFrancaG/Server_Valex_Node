import bcrypt from "bcrypt";
import * as currentCardRepo from "../repositories/cardRepository.js";

export async function blockCard(id: number, password: string) {
  const cardInfo = await currentCardRepo.findById(id);
  checkCardInfo(password, cardInfo, true);
  await currentCardRepo.update(id, { isBlocked: true });
}

export async function unBlockCard(id: number, password: string) {
  const cardInfo = await currentCardRepo.findById(id);
  checkCardInfo(password, cardInfo, false);
  await currentCardRepo.update(id, { isBlocked: false });
}
function checkCardInfo(password: string, cardInfo: any, block: boolean) {
  let checkPassword = bcrypt.compareSync(password, cardInfo.password);

  if (!checkPassword) {
    throw { code: 401, message: "Check Password" };
  }

  if (cardInfo.isBlocked && block) {
    throw { code: 409, message: "Card Already Blocked" };
  }

  if (!cardInfo.isBlocked && !block) {
    throw { code: 409, message: "Card Not Blocked" };
  }
}
