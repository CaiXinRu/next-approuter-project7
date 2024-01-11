// NOTE: PM的 google drive google, spreadsheets 文件, https://docs.google.com/spreadsheets/d/1LNMkZ4uV0K4xw2_k-XfpuAQFvIzqMQpiV7aTIM_7s_4/edit#gid=0

// NOTE：本機執行工具，取得遠端 google-spreadsheet 文件的CSV，再轉成json格式儲存

const fs = require("fs");
const { parse } = require("csv-parse");
const axios = require("axios");

const TW_PATH = "./public/assets/f2e/locales/zh-Hant/";
const EN_PATH = "./public/assets/f2e/locales/en/";

const SOURCE_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS2ZrAiFjho18ie3i_f1aCRS7-jlHu_8c88sT0pgTnLcRNdfz_DLgRklFy7RRD8XVHIYaVxDWQAcw4I/pub?single=true&output=csv";

const TAB_ARRAY = [
  { gid: "0", fileName: "common.json" }, //全域
  { gid: "1954819121", fileName: "page-sitemap.json" },
  { gid: "1236214078", fileName: "page-signup.json" }, //註冊
  { gid: "2107477322", fileName: "page-insurance.json" }, //保險
  { gid: "864272811", fileName: "page-rentWay.json" }, //借還方式
  { gid: "1487730898", fileName: "page-station-info.json" }, //站點資訊
  { gid: "1204643862", fileName: "page-news-media.json" }, //News&Media
  { gid: "2077014928", fileName: "page-fee.json" }, //收費方式
  { gid: "1028641944", fileName: "page-faqs.json" },
  { gid: "1259285291", fileName: "page-riding-tips.json" }, //騎乘須知
  { gid: "150827924", fileName: "page-equipment.json" }, //設備介紹
  { gid: "1711926685", fileName: "page-about-us.json" }, //關於我們
  { gid: "1392217223", fileName: "page-contact-us.json" }, //聯絡我們
  { gid: "847680229", fileName: "page-member-area.json" }, //會員專區
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

    langList.forEach((item) => {
      if (!item.key) return;

      twTran[item.key.trim()] = item?.tw?.trim() || "";
      enTran[item.key.trim()] = item?.en?.trim() || "";
    });

    return { twTran, enTran };
  } catch (err) {
    console.log(err.message);
  }
}

function writeJsonFile(path, data) {
  fs.access(path, fs.F_OK, (err) => {
    if (err) {
      console.log(`${path} 不存在，即將新增此檔案`);
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
    const { twTran, enTran } = await getLangs(item.gid);
    if (!Object.keys(twTran).length || !Object.keys(enTran).length) {
      console.warn(
        ` ${item.gid}, ${item.fileName} 中文 / 英文語系可能全都是空白的語言包, 已中止`
      );
      console.log("---");
      return;
    }
    writeJsonFile(`${TW_PATH}${item.fileName}`, twTran);
    writeJsonFile(`${EN_PATH}${item.fileName}`, enTran);
    console.log("---");
  }
}

main();
