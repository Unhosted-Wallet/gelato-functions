import {
  Web3Function,
  Web3FunctionContext,
} from "@gelatonetwork/web3-functions-sdk";
import ky from "ky";
// import ky from "ky";

// function getDayOfMonth(): number {
//   const date = new Date();
//   return date.getDate();
// }
function getDayOfWeek(): number {
  const date = new Date();
  return date.getDay();
}
function getHourOfDay(): number {
  const date = new Date();
  return date.getHours();
}
// BASIS
// 0 -> DAILY
// 1 -> WEEKLY
// 2 -> MONTHLY

// Execution DAY
// Can be from 1-28(monthly) or 1-7(weekly)

// Execution Hour Start
// Hour of the day when to exec the calldata

// Execution Hour End
// Hour of the Day when it cannot be executed

// DATA
//  Calldata that will be executed

// SCENARIO

// 1. Let's say i have a monthly dca to execute on the 28th of every month, on the 7th hr of that day
// How will my database query look like?
// Find all the recurring execs with basis = 1, executionDay = 28,ExecutionHourStart=7

// 2. Let's say i have a daily dca to execute, on the 10th hr of that day
// How will my database query look like?
// Find all the recurring execs with basis = 0, executionDay = 0,ExecutionHourStart=10

// 3. Let's say i have a weekly dca to execute on the 3rd of every week, on the 10th hr of that day
// How will my database query look like?
// Find all the recurring execs with basis = 1, executionDay = 3,ExecutionHourStart=10

Web3Function.onRun(async (context: Web3FunctionContext) => {
  // const { userArgs } = context;
  const chainId = context.gelatoArgs.chainId;
  console.log(chainId);

  const basis = 0; // Daily Recurring Execs
  const executionDay = getDayOfWeek();
  const executionHourStart = getHourOfDay();
  console.log({
    basis,
    executionDay,
    executionHourStart,
  });

  const url = `https://api.unhosted.com/v1/strategies/recurring-execution?chainId=${chainId}&basis=${basis}&executionDay=${1}&executionHourStart=${1}`;
  const response = (await ky.get(url).json()) as any;
  for (const executionData of response.data) {
    const { address, smartAccount, target, data, value } = executionData;
    console.log(address, smartAccount, target, data, value);
    // console.log(executionData);
  }
  // .then((response) => {
  //   if (!response.ok) {
  //     throw new Error("Network response was not ok");
  //   }
  //   return response.json();
  // })
  // .then((data) => {
  //   // Process the response data here
  //   console.log(data);
  // })
  // .catch((error) => {
  //   // Handle any errors that occur during the fetch request
  //   console.error("There was a problem with the fetch operation:", error);
  // });

  // const provider = multiChainProvider.default();
  // // Retrieve Last oracle update time
  // const oracleAddress =
  //   (userArgs.oracle as string) ?? "0x71B9B0F6C999CBbB0FeF9c92B80D54e4973214da";
  // let lastUpdated;
  // let oracle;
  // try {
  //   oracle = new Contract(oracleAddress, ORACLE_ABI, provider);
  //   lastUpdated = parseInt(await oracle.lastUpdated());
  //   console.log(`Last oracle update: ${lastUpdated}`);
  // } catch (err) {
  //   return { canExec: false, message: `Rpc call failed` };
  // }

  // Check if it's ready for a new update
  // const nextUpdateTime = lastUpdated + 3600; // 1h
  // const timestamp = (await provider.getBlock("latest")).timestamp;
  // console.log(`Next oracle update: ${nextUpdateTime}`);
  // if (timestamp < nextUpdateTime) {
  //   return { canExec: false, message: `Time not elapsed` };
  // }

  // Get current price on coingecko
  // const currency = (userArgs.currency as string) ?? "ethereum";
  // let price = 0;
  // try {
  //   const coingeckoApi = `https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=usd`;

  //   const priceData: { [key: string]: { usd: number } } = await ky
  //     .get(coingeckoApi, { timeout: 5_000, retry: 0 })
  //     .json();
  //   price = Math.floor(priceData[currency].usd);
  // } catch (err) {
  //   return { canExec: false, message: `Coingecko call failed` };
  // }
  // console.log(`Updating price: ${price}`);

  // // Return execution call data
  return {
    canExec: true,
    callData: [
      {
        to: "0x70eA2D4Ac98b304FbF8924fb43C8f7f220F0b4F6",
        data: "0x70eA2D4Ac98b304FbF8924fb43C8f7f220F0b4F6vndfkvfnikdb",
      },
    ],
  };
});
