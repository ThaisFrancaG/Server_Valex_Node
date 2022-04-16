import axios from "axios";
import * as employeeInfo from "../repositories/employeeRepository.js";
import * as cardInfo from "../repositories/cardRepository.js";
import { faker } from "@faker-js/faker";

export async function newCard(employeeId: number, cardType: string) {
  checkCardType(cardType);

  let employeeData = await getEmployee(employeeId);

  await checkEmployeeCards(employeeId, cardType);

  let newCardInfo = generateCardInfo(employeeData);
}

function checkCardType(cardType: string) {
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

async function getEmployee(employeeId: number) {
  const employeeData = await employeeInfo.findById(employeeId);
  if (!employeeData) {
    throw { code: 401, message: "Employee Not Found" };
  }
  return employeeData;
}

async function checkEmployeeCards(employeeId: number, cardType) {
  const hasCardType = await cardInfo.findByTypeAndEmployeeId(
    cardType,
    employeeId
  );

  if (hasCardType) {
    throw { code: 409, message: "Employee Already Has This Card Type" };
  }
}

function generateCardInfo(employeeData: any) {
  const cardNumber = faker.finance.creditCardNumber("martercard");

  const cardSecurityNumber = faker.finance.creditCardCVV();
  //usar o faker para gerar o cvv
  //FALTA CRIPTOGRAFAR

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

  console.log(cardName);
}
