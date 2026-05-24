import { mkdir, writeFile } from "node:fs/promises";

const endpoint =
  "https://segisws.moi.gov.tw/STATWSSTData/OpenService.asmx/GetAdminSTDataForOpenCode?oCode=88641597DE2A496B3B5AF84EB79808624B4FA5171FA6518DB327184AC9041FEF07D0ADAFDAF79C0DD8BBECC4B34231B0";

const response = await fetch(endpoint, { cache: "no-store" });
if (!response.ok) {
  throw new Error(`SEGIS request failed: HTTP ${response.status}`);
}

const payload = await response.json();
const row = payload.RowDataList?.find((item) => item.COUNTY === "彰化縣");
if (!row) {
  throw new Error("SEGIS response did not include Changhua County");
}

const data = {
  source: "內政部社會經濟資料服務平台 SEGIS",
  sourceUrl: endpoint,
  fetchedAt: new Date().toISOString(),
  period: row.INFO_TIME,
  total: row.FLD01,
  avgAge: row.FLD02,
  buckets: [
    ["1年以下", row.FLD03],
    ["1-5年", row.FLD04],
    ["5-10年", row.FLD05],
    ["10-15年", row.FLD06],
    ["15-20年", row.FLD07],
    ["20-25年", row.FLD08],
    ["25-30年", row.FLD09],
    ["30-40年", row.FLD10],
    ["40-50年", row.FLD11],
    ["50年以上", row.FLD12],
  ],
};

await mkdir("data", { recursive: true });
await writeFile("data/changhua-county-age.json", `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated data/changhua-county-age.json for ${data.period}`);
