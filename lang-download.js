// google spreadsheets 文件：https://docs.google.com/spreadsheets/d/1EPa4-0BexQaL3L9SL7ZiX-SAvxni41iS7yNy7Rd1-r0/edit?usp=sharing
// 本機執行工具，取得遠端 google-spreadsheet 文件的CSV，再轉成json格式儲存
// 在TERMINAL輸入指令node lang-download.js即可載入語言包

const fs = require("fs");
const { parse } = require("csv-parse");
const axios = require("axios");

const TW_PATH = "./src/dictionaries/zh/";
const EN_PATH = "./src/dictionaries/en/";
const DE_PATH = "./src/dictionaries/de/";

const SOURCE_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS2z16k-y2Zz3GVI7MKuzRWNnAd2BYgUZPJG920emmKczVifCxuSq8Ibk8Vt6CvezNwcG-ht1YT9epC/pub?output=csv";

const TAB_ARRAY = [
  { gid: "0", fileName: "about.json" },
  { gid: "1843368633", fileName: "home.json" },
  { gid: "1299602173", fileName: "navigation.json" },
  { gid: "2053540978", fileName: "press_news.json" },
  { gid: "49981618", fileName: "press.json" },
];

async function fetchCsvFromUrl(url) {
  const res = await axios.get(url);
  return await new Promise((resolve, reject) => {
    parse(res.data, { columns: true }, (err, output) =>
      err ? reject(err) : resolve(output)
    );
  });
}

async function getLangs(gidVal) {
  if (!gidVal) {
    throw new Error("param of gidVal on getLangs is missing !");
  }

  try {
    const langList = await fetchCsvFromUrl(`${SOURCE_CSV_URL}&gid=${gidVal}`);
    // console.log(langList)
    const twTran = {};
    const enTran = {};
    const deTran = {};

    langList.forEach((item) => {
      if (!item.key) return;

      twTran[item.key.trim()] = item?.tw?.trim() || "";
      enTran[item.key.trim()] = item?.en?.trim() || "";
      deTran[item.key.trim()] = item?.de?.trim() || "";
    });

    return { twTran, enTran, deTran };
  } catch (err) {
    console.log(err.message);
  }
}

function writeJsonFile(path, data) {
  fs.access(path, fs.F_OK, (err) => {
    if (err) {
      console.log(`${path} 不存在，請新增此路徑檔案`);
    }

    const jsonData = JSON.stringify(data);
    try {
      fs.writeFile(path, jsonData, (err) => {
        if (err) throw err;
        console.log(`${path} 文件寫入成功 `);
      });
    } catch (err) {
      console.log(`${path} 文件寫入失敗 `);
      console.log(err.message);
    }
  });
}

// ----

async function main() {
  for (const item of TAB_ARRAY) {
    const { twTran, enTran, deTran } = await getLangs(item.gid);
    if (
      !Object.keys(twTran).length ||
      !Object.keys(enTran).length ||
      !Object.keys(deTran).length
    ) {
      console.warn(
        ` ${item.gid}, ${item.fileName} 中文 / 英文 / 德文語系可能全都是空白的語言包, 已中止運行`
      );
      console.log("---");
      return;
    }
    writeJsonFile(`${TW_PATH}${item.fileName}`, twTran);
    writeJsonFile(`${EN_PATH}${item.fileName}`, enTran);
    writeJsonFile(`${DE_PATH}${item.fileName}`, deTran);
    console.log("---");
  }
}

main();
