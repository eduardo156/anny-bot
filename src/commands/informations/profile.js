const fs = require("fs");
const { sendImage } = require("../../utils/message");
const { getBuffer } = require("../../utils/media");

function getRandomPercentage() {
  return Math.floor(Math.random() * 100);
}

function getRandomProgramValue() {
  return Math.floor(Math.random() * (10000 - 50 + 1)) + 50;
}

async function getUserProfilePic(sock, sender) {
  try {
    const userProfilePicUrl = await sock.profilePictureUrl(sender, "image");
    return await getBuffer(userProfilePicUrl);
  } catch {
    return fs.readFileSync("./assets/profile.jpeg");
  }
}

async function getUserStatus(sock, sender) {
  try {
    const statusData = await sock.fetchStatus(sender);
    return statusData.status;
  } catch {
    return "";
  }
}

async function profile(sock, from, sender, quoted, pushName, userDevice) {
  const userProfilePic = await getUserProfilePic(sock, sender);
  const status = await getUserStatus(sock, sender);

  const randomPutaPercentage = getRandomPercentage();
  const randomGostosuraPercentage = getRandomPercentage();
  const randomGadoPercentage = getRandomPercentage();
  const randomProgramValue = getRandomProgramValue();

  const text = `
👤「 INFORMAÇÕES PERFIL 」👤

🗣️ Usuário: ${pushName}
📱 Dispositivo: ${userDevice}
💭 Bio: ${status}
🏦 Instituição: Anny Bank

⭐「 % PORCENTAGEM % 」⭐

😈 Nível de Puta: ${randomPutaPercentage}%
🌜 Nível de Gostosura: ${randomGostosuraPercentage}%
💋 Nível de Gado: ${randomGadoPercentage}%
👅 Valor do Programa: R$${randomProgramValue}
`;

  sendImage(sock, from, quoted, userProfilePic, text);
}

module.exports = profile;