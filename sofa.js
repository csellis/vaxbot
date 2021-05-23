import axios from "axios";
import colors from "colors";
import { sendMessage, sendBotMessage } from "./botty.js";

async function checkForSofas(address, lookingFor) {
  axios
    .get(address)
    .then((response) => {
      if (response.data.includes(lookingFor)) {
        let message = `Found a ${lookingFor} 🛋️, ${address}`;
        // sendMessage(message);
        sendBotMessage(message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

async function logAvailableVaccine(payload) {
  const date = new Date(payload.next_date * 1000);
  const formatter = new Intl.DateTimeFormat("en-CA", { dateStyle: "long", timeStyle: "short" });
  const toLog = `💉  ${formatter.format(date)}
WalMart ${payload.location}
${payload.address}
${payload.city}, ${payload.province}
☎️ ${payload.phone}
Book Online: https://portal.healthmyself.net/${province.slug}/forms/${province.code}
  `;
  console.log(toLog);
  await sendMessage(toLog);
}

export async function checkSofa(lookingFor) {
  const perfectlyPristine = `https://www.sofa.com/gb/ready-made/perfectly-pristine`;
  const nearlyNew = `https://www.sofa.com/gb/ready-made/nearly-new`;

  await checkForSofas(perfectlyPristine, lookingFor);
  await checkForSofas(nearlyNew, lookingFor);
}
