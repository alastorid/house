const countyManifestPath = "data/latest/manifest.json";

// Fallback data in case fetch fails
const countySnapshot = {
  period: "114Y2S",
  total: 425964,
  avgAge: 37.8,
  buckets: [
    ["1年以下", 5958],
    ["1-5年", 17231],
    ["5-10年", 18008],
    ["10-15年", 14107],
    ["15-20年", 17024],
    ["20-25年", 16248],
    ["25-30年", 48279],
    ["30-40年", 92910],
    ["40-50年", 106128],
    ["50年以上", 90071],
  ],
};

const districtData = [
  { name: "彰化市", total: 80726, under10: 4505, age10to20: 7072, age20to30: 21045, age30to40: 16000, age40to50: 23193, over50: 8911, avgAge: 34, avgArea: 49.41, x: 322, y: 210, w: 146, h: 108 },
  { name: "鹿港鎮", total: 27274, under10: 2618, age10to20: 2046, age20to30: 7034, age30to40: 4522, age40to50: 6344, over50: 4710, avgAge: 36, avgArea: 53.55, x: 164, y: 258, w: 112, h: 92 },
  { name: "和美鎮", total: 29958, under10: 2876, age10to20: 2957, age20to30: 7636, age30to40: 5449, age40to50: 7337, over50: 3703, avgAge: 33, avgArea: 56.23, x: 242, y: 178, w: 116, h: 92 },
  { name: "線西鄉", total: 4738, under10: 479, age10to20: 177, age20to30: 1422, age30to40: 777, age40to50: 892, over50: 991, avgAge: 36, avgArea: 54.8, x: 70, y: 252, w: 84, h: 70 },
  { name: "伸港鄉", total: 11339, under10: 1707, age10to20: 729, age20to30: 3011, age30to40: 1886, age40to50: 2397, over50: 1609, avgAge: 32, avgArea: 55.64, x: 108, y: 176, w: 102, h: 78 },
  { name: "福興鄉", total: 13840, under10: 1217, age10to20: 938, age20to30: 3580, age30to40: 3131, age40to50: 3121, over50: 1853, avgAge: 34, avgArea: 58.58, x: 144, y: 342, w: 112, h: 80 },
  { name: "秀水鄉", total: 12293, under10: 1151, age10to20: 1117, age20to30: 2988, age30to40: 2448, age40to50: 2219, over50: 2370, avgAge: 35, avgArea: 52.6, x: 236, y: 118, w: 94, h: 76 },
  { name: "花壇鄉", total: 14664, under10: 1188, age10to20: 1024, age20to30: 3541, age30to40: 2868, age40to50: 3906, over50: 2137, avgAge: 35, avgArea: 53.81, x: 318, y: 140, w: 104, h: 84 },
  { name: "芬園鄉", total: 6948, under10: 343, age10to20: 470, age20to30: 1567, age30to40: 1346, age40to50: 1565, over50: 1657, avgAge: 39, avgArea: 55.75, x: 422, y: 142, w: 92, h: 76 },
  { name: "員林市", total: 41741, under10: 5222, age10to20: 3272, age20to30: 10314, age30to40: 8908, age40to50: 9513, over50: 4512, avgAge: 32, avgArea: 48.75, x: 442, y: 326, w: 138, h: 100 },
  { name: "溪湖鎮", total: 17232, under10: 1846, age10to20: 1187, age20to30: 4971, age30to40: 3327, age40to50: 3253, over50: 2648, avgAge: 33, avgArea: 53.43, x: 390, y: 430, w: 104, h: 88 },
  { name: "田中鎮", total: 13764, under10: 992, age10to20: 736, age20to30: 3324, age30to40: 2700, age40to50: 3346, over50: 2666, avgAge: 37, avgArea: 50.49, x: 508, y: 430, w: 96, h: 88 },
  { name: "大村鄉", total: 10459, under10: 1390, age10to20: 1013, age20to30: 3675, age30to40: 1741, age40to50: 1468, over50: 1172, avgAge: 30, avgArea: 55.9, x: 504, y: 340, w: 86, h: 76 },
  { name: "埔鹽鄉", total: 8979, under10: 780, age10to20: 545, age20to30: 2531, age30to40: 1787, age40to50: 1647, over50: 1689, avgAge: 35, avgArea: 55.78, x: 304, y: 384, w: 92, h: 74 },
  { name: "埔心鄉", total: 10943, under10: 1615, age10to20: 1074, age20to30: 2782, age30to40: 2097, age40to50: 1678, over50: 1697, avgAge: 32, avgArea: 46.69, x: 424, y: 390, w: 92, h: 72 },
  { name: "永靖鄉", total: 10220, under10: 726, age10to20: 629, age20to30: 2715, age30to40: 2038, age40to50: 2464, over50: 1648, avgAge: 35, avgArea: 53.87, x: 512, y: 386, w: 86, h: 72 },
  { name: "社頭鄉", total: 12007, under10: 980, age10to20: 680, age20to30: 3376, age30to40: 2589, age40to50: 2614, over50: 1768, avgAge: 35, avgArea: 53.03, x: 534, y: 500, w: 96, h: 80 },
  { name: "二水鄉", total: 5191, under10: 186, age10to20: 187, age20to30: 800, age30to40: 868, age40to50: 1542, over50: 1608, avgAge: 44, avgArea: 47.43, x: 518, y: 584, w: 88, h: 66 },
  { name: "北斗鎮", total: 12135, under10: 1298, age10to20: 815, age20to30: 3182, age30to40: 2263, age40to50: 2985, over50: 1592, avgAge: 34, avgArea: 53.14, x: 468, y: 488, w: 104, h: 82 },
  { name: "二林鎮", total: 16347, under10: 1326, age10to20: 858, age20to30: 4049, age30to40: 3032, age40to50: 3346, over50: 3736, avgAge: 37, avgArea: 51.07, x: 230, y: 472, w: 130, h: 92 },
  { name: "田尾鄉", total: 9025, under10: 801, age10to20: 559, age20to30: 2673, age30to40: 1219, age40to50: 1715, over50: 2058, avgAge: 35, avgArea: 50.81, x: 420, y: 526, w: 86, h: 72 },
  { name: "埤頭鄉", total: 10535, under10: 818, age10to20: 585, age20to30: 2400, age30to40: 1711, age40to50: 2717, over50: 2304, avgAge: 37, avgArea: 51.69, x: 362, y: 524, w: 88, h: 74 },
  { name: "芳苑鄉", total: 10665, under10: 273, age10to20: 1127, age20to30: 1690, age30to40: 1383, age40to50: 3205, over50: 2987, avgAge: 41, avgArea: 51.46, x: 104, y: 444, w: 108, h: 84 },
  { name: "大城鄉", total: 4453, under10: 134, age10to20: 124, age20to30: 726, age30to40: 479, age40to50: 1208, over50: 1782, avgAge: 45, avgArea: 44.02, x: 84, y: 534, w: 92, h: 70 },
  { name: "竹塘鄉", total: 4980, under10: 121, age10to20: 179, age20to30: 1025, age30to40: 706, age40to50: 1260, over50: 1689, avgAge: 43, avgArea: 45.51, x: 224, y: 562, w: 86, h: 68 },
  { name: "溪州鄉", total: 9060, under10: 704, age10to20: 705, age20to30: 1994, age30to40: 1416, age40to50: 1900, over50: 2341, avgAge: 38, avgArea: 51.94, x: 342, y: 572, w: 104, h: 74 },
];

const formatter = new Intl.NumberFormat("zh-TW");
let selectedDistrict = "彰化市";

function pct(value, total) {
  return total ? `${((value / total) * 100).toFixed(1)}%` : "--";
}

function homes(value) {
  return `${formatter.format(value)} 宅`;
}

function parseCsv(text) {
  // Remove BOM if present
  const cleanText = text.replace(/^\uFEFF/, "");
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < cleanText.length; index += 1) {
    const char = cleanText[index];
    const next = cleanText[index + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell.trim());
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  if (cell || row.length) {
    row.push(cell.trim());
    rows.push(row);
  }
  return rows;
}

function countyFromCsv(text) {
  const rows = parseCsv(text);
  if (rows.length < 3) throw new Error("CSV 資料列數不足");
  const header = rows[0];
  const records = rows.slice(2);
  const index = Object.fromEntries(header.map((name, position) => [name, position]));
  
  if (index.COUNTY === undefined) throw new Error("找不到 COUNTY 欄位");
  
  const row = records.find((record) => record[index.COUNTY] && record[index.COUNTY].includes("彰化"));
  if (!row) throw new Error("CSV 裡找不到彰化縣數據");
  
  const number = (field) => {
    const val = row[index[field]];
    return val ? Number(val.replace(/,/g, "")) : 0;
  };

  return {
    period: (row[index.INFO_TIME] || "未知").replaceAll('"', ""),
    total: number("FLD01"),
    avgAge: number("FLD02"),
    buckets: [
      ["1年以下", number("FLD03")],
      ["1-5年", number("FLD04")],
      ["5-10年", number("FLD05")],
      ["10-15年", number("FLD06")],
      ["15-20年", number("FLD07")],
      ["20-25年", number("FLD08")],
      ["25-30年", number("FLD09")],
      ["30-40年", number("FLD10")],
      ["40-50年", number("FLD11")],
      ["50年以上", number("FLD12")],
    ],
  };
}

function districtMetric(item, metric) {
  if (metric === "under10Share") return item.under10 / item.total;
  if (metric === "avgAge") return item.avgAge;
  if (metric === "avgArea") return item.avgArea;
  if (metric === "total") return item.total;
  return item.over50 / item.total;
}

function colorFor(value, min, max, metric) {
  const t = max === min ? 0.5 : (value - min) / (max - min);
  if (metric === "under10Share") return `hsl(${155 - t * 55} 48% ${78 - t * 34}%)`;
  if (metric === "avgArea") return `hsl(${205 - t * 45} 52% ${80 - t * 36}%)`;
  return `hsl(${42 - t * 20} 76% ${78 - t * 34}%)`;
}

function renderCounty(data) {
  if (!data) {
    document.querySelector("#periodLabel").textContent = "讀取中...";
    document.querySelector("#countyTotal").textContent = "--";
    document.querySelector("#countyAvgAge").textContent = "--";
    document.querySelector("#countyUnder5").textContent = "--";
    document.querySelector("#countyBars").innerHTML = '<p class="loading-placeholder">請稍候，正在載入最新資料...</p>';
    return;
  }
  document.querySelector("#periodLabel").textContent = data.period;
  document.querySelector("#countyTotal").textContent = homes(data.total);
  document.querySelector("#countyAvgAge").textContent = `${data.avgAge.toFixed(2)} 年`;
  const under5 = data.buckets.slice(0, 2).reduce((sum, [, value]) => sum + value, 0);
  document.querySelector("#countyUnder5").textContent = homes(under5);
  const max = Math.max(...data.buckets.map(([, value]) => value));
  document.querySelector("#countyBars").innerHTML = data.buckets
    .map(([label, value]) => {
      const width = Math.max(4, (value / max) * 100);
      return `
        <article class="age-row">
          <div>
            <strong>${label}</strong>
            <span>${homes(value)} · ${pct(value, data.total)}</span>
          </div>
          <div class="bar-track"><span style="width:${width}%"></span></div>
        </article>
      `;
    })
    .join("");
}

async function refreshCounty() {
  const status = document.querySelector("#countyStatus");
  status.textContent = "正在確認資料版本...";
  try {
    const manifestResponse = await fetch(`${countyManifestPath}?v=${Date.now()}`, { cache: "no-store" });
    if (!manifestResponse.ok) throw new Error("無法讀取 manifest.json");
    const manifest = await manifestResponse.json();
    
    const countyFileName = manifest.dataFiles?.county;
    if (!countyFileName) throw new Error("資料清單中找不到縣市檔案");

    status.textContent = `載入原始數據：${countyFileName}...`;
    
    const csvPath = `data/latest/${encodeURIComponent(countyFileName)}`;
    const response = await fetch(`${csvPath}?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`無法讀取 CSV (HTTP ${response.status})`);
    
    const data = countyFromCsv(await response.text());
    renderCounty(data);
    
    const fetched = manifest.fetchedAt ? ` (更新時間：${new Date(manifest.fetchedAt).toLocaleString("zh-TW")})` : "";
    status.textContent = `已載入最新官方數據：${data.period}${fetched}。`;
  } catch (error) {
    console.error("Data refresh failed:", error);
    renderCounty(countySnapshot);
    status.textContent = `無法取得最新數據，已顯示預載快照。原因：${error.message}`;
  }
}

function filteredData() {
  const query = document.querySelector("#districtSearch").value.trim();
  return districtData.filter((item) => item.name.includes(query));
}

function renderMap() {
  const data = filteredData();
  const metric = document.querySelector("#metricSelect").value;
  const values = districtData.map((item) => districtMetric(item, metric));
  const min = Math.min(...values);
  const max = Math.max(...values);
  document.querySelector("#changhuaMap").innerHTML = `
    <title id="mapTitle">彰化縣鄉鎮市屋齡地圖</title>
    <desc id="mapDesc">點選鄉鎮市查看屋齡戶數。</desc>
    <rect x="28" y="70" width="608" height="540" rx="18" fill="#e9eef2" />
    <text x="50" y="44" fill="#5d6b78" font-size="18" font-weight="800">彰化縣屋齡地圖</text>
    ${data
      .map((item) => {
        const value = districtMetric(item, metric);
        const label =
          metric === "avgAge"
            ? `${item.avgAge}年`
            : metric === "avgArea"
              ? `${item.avgArea.toFixed(1)}坪`
              : metric === "total"
                ? formatter.format(item.total)
                : pct(metric === "under10Share" ? item.under10 : item.over50, item.total);
        return `
          <g data-district="${item.name}">
            <rect class="district ${item.name === selectedDistrict ? "active" : ""}"
              x="${item.x}" y="${item.y}" width="${item.w}" height="${item.h}" rx="8"
              fill="${colorFor(value, min, max, metric)}" tabindex="0" role="button"
              aria-label="${item.name}"
            />
            <text class="district-label" x="${item.x + item.w / 2}" y="${item.y + item.h / 2 - 4}">${item.name}</text>
            <text class="district-count" x="${item.x + item.w / 2}" y="${item.y + item.h / 2 + 20}">${label}</text>
          </g>
        `;
      })
      .join("")}
  `;
  document.querySelectorAll("[data-district]").forEach((group) => {
    const name = group.dataset.district;
    group.addEventListener("click", () => selectDistrict(name));
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectDistrict(name);
      }
    });
  });
}

function renderDetails() {
  const item = districtData.find((district) => district.name === selectedDistrict) || districtData[0];
  const old30 = item.age30to40 + item.age40to50 + item.over50;
  document.querySelector("#selectedName").textContent = item.name;
  document.querySelector("#selectedTotal").textContent = homes(item.total);
  document.querySelector("#selectedAvg").textContent = `${item.avgAge} 年`;
  document.querySelector("#selectedArea").textContent = `${item.avgArea.toFixed(2)} 坪`;
  document.querySelector("#selectedYoung").textContent = `${homes(item.under10)} (${pct(item.under10, item.total)})`;
  document.querySelector("#selectedOld30").textContent = `${homes(old30)} (${pct(old30, item.total)})`;
  document.querySelector("#selectedOld50").textContent = `${homes(item.over50)} (${pct(item.over50, item.total)})`;
}

function renderTable() {
  const rows = filteredData().sort((a, b) => b.over50 / b.total - a.over50 / a.total);
  document.querySelector("#districtRows").innerHTML = rows
    .map(
      (item) => `
        <tr class="${item.name === selectedDistrict ? "active" : ""}" data-row="${item.name}">
          <td>${item.name}</td>
          <td>${homes(item.total)}</td>
          <td>${item.avgAge} 年</td>
          <td>${item.avgArea.toFixed(2)} 坪</td>
          <td>${homes(item.under10)}</td>
          <td>${homes(item.age10to20)}</td>
          <td>${homes(item.age20to30)}</td>
          <td>${homes(item.age30to40)}</td>
          <td>${homes(item.age40to50)}</td>
          <td>${homes(item.over50)}</td>
        </tr>
      `,
    )
    .join("");
  document.querySelectorAll("[data-row]").forEach((row) => {
    row.addEventListener("click", () => selectDistrict(row.dataset.row));
  });
}

function selectDistrict(name) {
  selectedDistrict = name;
  renderDetails();
  renderMap();
  renderTable();
}

document.querySelector("#refreshCounty").addEventListener("click", refreshCounty);
document.querySelector("#districtSearch").addEventListener("input", () => {
  const rows = filteredData();
  if (rows.length && !rows.some((item) => item.name === selectedDistrict)) selectedDistrict = rows[0].name;
  renderDetails();
  renderMap();
  renderTable();
});
document.querySelector("#metricSelect").addEventListener("change", renderMap);

// Initial Load
renderCounty(countySnapshot); // Show initial snapshot
refreshCounty(); // Try to fetch latest from CSV
renderDetails();
renderMap();
renderTable();
