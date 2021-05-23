import cron from "node-cron";
import colors from "colors";
import { checkSofa } from "./sofa.js";
import { sendMessage, sendBotMessage } from "./botty.js";

console.log(colors.green(`Booting up!`));
// sendMessage("Booting up!", { disable_notification: true, dev: true });

async function go() {
  sendBotMessage("Running a check", { disable_notification: true, dev: false });
  console.log(colors.bold("running the checks!"));
  let lookingFor = "Iggy Sofa";
  await checkSofa(lookingFor);
}

cron.schedule("15 8-15 * * *", go);
go();
