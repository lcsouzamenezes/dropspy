import {
  GSHEET_IM_SPY_API_URL,
  SPYBOT_APP_USER,
  VERSION,
  CURRENT_DATETIME,
  SPYBOT_LOOP_INTERVAL,
  LOGGER
} from "../../../configs/configs";

import fetchJsonUrl from "../../../utils/functions/fetch-json-url";
import getOsUsageData from "../../../utils/functions/getOsUsageData";

enum ENUM_UPDATE_BOT_INFO {
  INITIAL_INFO,
  LAST_RESTARTED_TIME,
  CHECKED_INFO,
  LAST_SALE_TIME
}

export {
  getAllBotsArr,
  getCurrentServer,
  getBotsOption,
  getSpyedStores,
  updateBotInfo,
  ENUM_UPDATE_BOT_INFO
}

async function getAllBotsArr() {
  const finalUrl = `${GSHEET_IM_SPY_API_URL}?method=getbots`
  const response = await fetchJsonUrl(finalUrl)

  if (response?.commandResult) {
    return response.commandResult
  } else {
    return false
  }
}

async function getCurrentServer() {
  const finalUrl = `${GSHEET_IM_SPY_API_URL}?method=getcurrentserver`
  const response = await fetchJsonUrl(finalUrl)

  if (response?.commandResult) {
    return response.commandResult
  } else {
    return false
  }
}

async function getBotsOption() {

  const finalUrl = `${GSHEET_IM_SPY_API_URL}?method=getbotsoption`
  const response = await fetchJsonUrl(finalUrl)

  if (response) {

    if (response.commandResult === "") {
      return true
    } else if (response.commandResult === "STAND-BY") {
      return "Os bots foram colocados em modo espera"
    } else if (response.commandResult === "OFF") {
      return "Os bots foram desligados"
    }

  } else {
    return "Erro desconhecido ao obter opção dos bots"
  }

}


async function getSpyedStores(botName) {

  const finalUrl = `${GSHEET_IM_SPY_API_URL}?method=getstores`
  const response = await fetchJsonUrl(finalUrl)
  if (response === false){return "Erro ao obter resposta do servidor"}

  const allData = response.commandResult
  const storesCount = allData.length
  if (storesCount === 0) {return "Não há lojas para espionar"}

  var storesToSpyArr = [];

  for (const row of allData) {

    const storeStatus = row[0]
    const spyUser = row[1]
    const storeName = row[2]
    const storeLink = row[3]
    const storeCategory = row[4]
    const storeError = row[5]

    if (storeStatus !== "Ativo") { continue }
    if (spyUser !== botName) { continue }

    storesToSpyArr.push({
      storeName,
      storeLink,
      storeCategory
    })

  }

  return storesToSpyArr

}


async function updateBotInfo(infoToUpdate: ENUM_UPDATE_BOT_INFO){

  let queryFinal;

  if (infoToUpdate === ENUM_UPDATE_BOT_INFO.INITIAL_INFO){
    queryFinal = `botVersion=${VERSION}&botLoopInterval=${Number(SPYBOT_LOOP_INTERVAL)/60}`
  } else if (infoToUpdate === ENUM_UPDATE_BOT_INFO.LAST_RESTARTED_TIME){
    queryFinal = `botLastRestartedTime=${CURRENT_DATETIME()}`
  } else if (infoToUpdate === ENUM_UPDATE_BOT_INFO.CHECKED_INFO){
    const {usedCpu, usedRAM, totalRAM} = await getOsUsageData()
    queryFinal = `botLasCpuUsagePercentual=${usedCpu}&botLastMemoryUsage=${usedRAM}/${totalRAM}&botLastCheckedTime=${CURRENT_DATETIME()}`
  } else if (infoToUpdate === ENUM_UPDATE_BOT_INFO.LAST_SALE_TIME){
    queryFinal = `botLastSaleTime=${CURRENT_DATETIME()}`
  } else {
    return
  }

  LOGGER(`Atualizando informações do bot na planilha - ${infoToUpdate}`, {from: "SPYBOT", pid: true})

  const finalUrl = `${GSHEET_IM_SPY_API_URL}?method=updatebot&bot=${SPYBOT_APP_USER}&${queryFinal}`
  const response = await fetchJsonUrl(finalUrl)

}
