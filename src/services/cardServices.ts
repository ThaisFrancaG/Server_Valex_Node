import axios from "axios";
import * as employeeInfo from "../repositories/employeeRepository.js";
import * as cardInfo from "../repositories/cardRepository.js";
import { faker } from "@faker-js/faker";

export async function newCard(employeeId: number, cardType: string) {
  console.log(cardType);
  checkCardType(cardType);
  console.log(cardType);
  let employeeData = await getEmployee(employeeId);
  console.log("return from employeeData");
  console.log(employeeData);
  //partindo do pressuposto de que ele vem como objeto

  if (!employeeData) {
    //isso vai significar que náo foi encontrado nenhum usuário com este id
    throw "usuário náo encontrado";
  }
  console.log("passou pelo Id");
  //check the types of card that the employee has. Check if the employee already has this card type

  await checkEmployeeCards(employeeId, cardType);
  console.log("passou pela conferencia de tipos de cartão");

  console.log("passou por todas as conferencias, agora é gerar os dados");

  //agora, pode criar os dados do cartäo, usando o faker. Mas tem que conferir se o n[umero de cartào gerado já consta no banco de dados, ver se é minimamente "unico"

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
      console.log("caiu no erro");
      throw { code: 422, message: "Invalid Card Type" };
  }
}

async function getEmployee(employeeId: number) {
  const employeeData = await employeeInfo.findById(employeeId);
  console.log(employeeData);
  if (!employeeData) {
    //talvez tenha que mudar o formato da verficação
    console.log("usuário não encontrado");
    throw { code: 401, message: "Invalid Card Type" };
  }
  return employeeData;
}

async function checkEmployeeCards(employeeId, cardType) {
  const hasCardType = await cardInfo.findByTypeAndEmployeeId(
    cardType,
    employeeId
  );

  console.log(hasCardType);
  //tem que ver qual que é o resultado antes de continuar, mas tem que ter um throw aqui

  if (hasCardType) {
    //isso vai significar que ele encontrou o usuário com esse tipo de cartào
    console.log("Usuário já tem esse tipo de cartào");
    throw "Usuário já tem esse tipo de cartào";
  }
}

function generateCardInfo(employeeData) {
  //usar o faker para gerar o numero do cartão

  const cardNumber = faker.finance.creditCardNumber("martercard");

  //conferir se o número já existe? Não tem uma função pra isso no repositories. Deixar quieto

  const cardSecurityNumber = faker.finance.creditCardCVV();
  //usar o faker para gerar o cvv
  //FALTA CRIPTOGRAFAR

  console.log("conferindo faker");
  console.log(cardNumber + "   " + cardSecurityNumber);
  //tratamento do nome da pessoa

  let nameArray = employeeData.fullName.split(" ");
  let nameLength = nameArray.length;
  console.log(nameArray);

  let firstName: string = nameArray[0];
  let lastName: string = nameArray[nameLength - 1];
  let nameInitials: string = "";

  if (nameLength > 2) {
    for (let i = 1; i < nameLength; i++) {
      if (nameArray[i].length > 2) {
        nameInitials = nameInitials + nameArray[0] + " ";
        console.log(nameInitials);
      }
    }
  }
  const cardname: string = `${firstName} ${nameInitials}+${lastName}`;

  console.log("nome pro cartão=" + cardname);
}
