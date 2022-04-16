import * as employeeInfo from "../repositories/employeeRepository.js";
import * as cardInfo from "../repositories/cardRepository.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import dayjs from "dayjs";

export async function newCard(employeeId: number, cardType: string) {
  cardType = cardType.toLowerCase();

  checkCardType(cardType);

  let employeeData = await getEmployee(employeeId);

  await checkEmployeeCards(employeeId, cardType);

  let newCardInfo = generateCardInfo(employeeData, cardType);

  await cardInfo.insert(newCardInfo);
}

function checkCardType(cardType) {
  console.log(cardType);

  switch (cardType) {
    case "groceries":
    case "restaurant":
    case "transport":
    case "education":
    case "health":
      break;
    default:
      throw { code: 422, message: "Invalid Card Type" };
  }
}

async function getEmployee(employeeId) {
  const employeeData = await employeeInfo.findById(employeeId);
  if (!employeeData) {
    throw { code: 401, message: "Employee Not Found" };
  }
  return employeeData;
}

async function checkEmployeeCards(employeeId, cardType) {
  const hasCardType = await cardInfo.findByTypeAndEmployeeId(
    cardType,
    employeeId
  );

  if (hasCardType) {
    throw { code: 409, message: "Employee Already Has This Card Type" };
  }
}

function generateCardInfo(employeeData, cardType) {
  const cardNumber = faker.finance.creditCardNumber("martercard");
  const cardSecurityNumber = faker.finance.creditCardCVV();
  const cardCVC = bcrypt.hashSync(cardSecurityNumber, 10);

  console.log(cardSecurityNumber);

  let nameArray = employeeData.fullName.split(" ");
  let nameLength = nameArray.length;

  let firstName: string = nameArray[0];
  let lastName: string = nameArray[nameLength - 1];
  let nameInitials: string = "";

  if (nameLength > 2) {
    for (let i = 1; i < nameLength - 1; i++) {
      if (nameArray[i].length > 2) {
        nameInitials = nameInitials + nameArray[i][0] + " ";
      }
    }
  }
  const cardName: string = `${firstName} ${nameInitials}${lastName}`;

  const expirationDate = dayjs().add(5, "year").format("MM/YY");

  return {
    employeeId: employeeData.id,
    number: cardNumber,
    cardholderName: cardName,
    securityCode: cardCVC,
    expirationDate: expirationDate,
    password: "",
    isVirtual: false,
    isBlocked: false,
    type: cardType,
  };
}
