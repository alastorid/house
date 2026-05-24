const nationalData = [
  {
    name: "全國待售新成屋",
    value: "11.2 萬宅",
    text: "114 年第 2 季統計通報摘要，數量緩增。",
  },
  {
    name: "低度使用住宅比率",
    value: "10.4%",
    text: "114 年上半年低度用電住宅比率。",
  },
  {
    name: "高量體行政區",
    value: "10 區",
    text: "114Q2 待售新成屋超過 2,000 宅的鄉鎮市區。",
  },
];

const liveDataUrl = "https://plvr.land.moi.gov.tw/Download?type=zip&fileName=lvr_landcsv.zip";
const countyData = [
  ["臺北市", "a", 210, 86, 70, 96],
  ["新北市", "f", 184, 162, 98, 104],
  ["桃園市", "h", 164, 258, 92, 90],
  ["臺中市", "b", 176, 362, 104, 110],
  ["臺南市", "d", 150, 498, 98, 106],
  ["高雄市", "e", 174, 604, 112, 116],
  ["基隆市", "c", 256, 42, 56, 52],
  ["新竹市", "o", 122, 190, 54, 54],
  ["新竹縣", "j", 86, 210, 74, 72],
  ["苗栗縣", "k", 98, 302, 76, 86],
  ["彰化縣", "n", 92, 414, 86, 100],
  ["南投縣", "m", 172, 450, 72, 94],
  ["雲林縣", "p", 92, 526, 80, 92],
  ["嘉義市", "i", 146, 570, 48, 48],
  ["嘉義縣", "q", 104, 594, 74, 78],
  ["屏東縣", "t", 184, 664, 86, 92],
  ["宜蘭縣", "g", 300, 170, 70, 90],
  ["花蓮縣", "u", 300, 350, 72, 126],
  ["臺東縣", "v", 284, 526, 74, 116],
  ["澎湖縣", "x", 42, 614, 52, 48],
  ["金門縣", "w", 44, 482, 52, 48],
  ["連江縣", "z", 56, 82, 42, 42],
].map(([name, code, x, y, w, h]) => ({ name, code, x, y, w, h }));

const districts = [
  ["彰化市", 90200, 73500, 16700, 3520, 3.9, "縣內最大住宅量體，都市核心與重劃區共同推升新屋數。", 322, 210, 146, 108],
  ["員林市", 56100, 46100, 10000, 2650, 4.7, "南彰化生活圈核心，近年推案集中在車站與外環道路周邊。", 442, 326, 138, 100],
  ["和美鎮", 31300, 25500, 5800, 1250, 4.0, "鄰近彰化市與台中海線，住宅供給穩定增加。", 242, 178, 116, 92],
  ["鹿港鎮", 32300, 25800, 6500, 980, 3.0, "觀光與傳產聚落並存，新屋比例中等。", 164, 258, 112, 92],
  ["溪湖鎮", 24500, 19700, 4800, 720, 2.9, "中部農產與交通節點，住宅供給較平緩。", 390, 430, 104, 88],
  ["二林鎮", 25500, 19600, 5900, 640, 2.5, "西南角大型鄉鎮，總戶數高但新屋比例較低。", 230, 472, 130, 92],
  ["田中鎮", 20200, 15800, 4400, 510, 2.5, "山線聚落，新屋集中在交通節點附近。", 508, 430, 96, 88],
  ["北斗鎮", 18600, 14500, 4100, 560, 3.0, "傳統商業中心，戶數穩定。", 468, 488, 104, 82],
  ["花壇鄉", 17100, 14200, 2900, 690, 4.0, "接近彰化市，通勤住宅需求帶動新建案。", 318, 140, 104, 84],
  ["秀水鄉", 15400, 12600, 2800, 520, 3.4, "製造業聚落與彰化市外圍居住需求交疊。", 236, 118, 94, 76],
  ["伸港鄉", 14200, 11300, 2900, 610, 4.3, "海線工業與通勤需求形成較高新屋比例。", 108, 176, 102, 78],
  ["線西鄉", 7700, 6100, 1600, 260, 3.4, "住宅量體小，比例變化容易受個案影響。", 70, 252, 84, 70],
  ["福興鄉", 15300, 12100, 3200, 410, 2.7, "鹿港外圍生活圈，新增住宅較分散。", 144, 342, 112, 80],
  ["芬園鄉", 10400, 8500, 1900, 270, 2.6, "山麓型鄉鎮，住宅開發節奏保守。", 422, 142, 92, 76],
  ["埔心鄉", 12800, 10400, 2400, 470, 3.7, "員林生活圈外圍，新屋比例略高。", 424, 390, 92, 72],
  ["埔鹽鄉", 11500, 9300, 2200, 300, 2.6, "農業與低密居住為主，新增量較小。", 304, 384, 92, 74],
  ["大村鄉", 12800, 10700, 2100, 520, 4.1, "鄰近員林與高鐵彰化站，近年住宅需求提高。", 504, 340, 86, 76],
  ["永靖鄉", 12600, 10100, 2500, 390, 3.1, "傳統聚落密集，新增住宅較平均。", 512, 386, 86, 72],
  ["社頭鄉", 14100, 11100, 3000, 370, 2.6, "山線產業聚落，新屋比例偏低。", 534, 500, 96, 80],
  ["田尾鄉", 10400, 8200, 2200, 260, 2.5, "苗木產業與低密住宅為主。", 420, 526, 86, 72],
  ["埤頭鄉", 10200, 7900, 2300, 240, 2.4, "農村型鄉鎮，住宅新增量有限。", 362, 524, 88, 74],
  ["芳苑鄉", 10800, 8000, 2800, 210, 1.9, "西南沿海地區，空置比例相對較高。", 104, 444, 108, 84],
  ["大城鄉", 6500, 4700, 1800, 110, 1.7, "人口密度低，新屋供給少。", 84, 534, 92, 70],
  ["竹塘鄉", 6900, 5100, 1800, 130, 1.9, "西南平原農業鄉鎮，新建量低。", 224, 562, 86, 68],
  ["溪州鄉", 10400, 7900, 2500, 210, 2.0, "南端農業鄉鎮，新增住宅較少。", 342, 572, 104, 74],
  ["二水鄉", 6200, 4700, 1500, 120, 1.9, "山線南端，住宅供給保守。", 518, 584, 88, 66],
].map(([name, totalHomes, occupiedHomes, vacantHomes, newHomes, newHomeRatio, note, x, y, w, h]) => ({
  name,
  totalHomes,
  occupiedHomes,
  vacantHomes,
  newHomes,
  newHomeRatio,
  note,
  x,
  y,
  w,
  h,
}));

const formatter = new Intl.NumberFormat("zh-TW");
let selectedDistrict = districts[0].name;
let selectedCounty = "彰化縣";
const zipCache = new Map();

function formatHomes(value) {
  return `${formatter.format(value)} 宅`;
}

function colorForRatio(ratio) {
  if (ratio >= 4.5) return "#1f8a70";
  if (ratio >= 3.8) return "#58b38f";
  if (ratio >= 3) return "#9ccf9f";
  if (ratio >= 2.3) return "#ecd178";
  return "#d99553";
}

function renderNationalCards() {
  const root = document.querySelector("#nationalCards");
  root.innerHTML = nationalData
    .map(
      (item) => `
        <article class="stat-card">
          <span class="metric-label">${item.name}</span>
          <strong>${item.value}</strong>
          <p>${item.text}</p>
        </article>
      `,
    )
    .join("");
}

function renderCountyOptions() {
  const select = document.querySelector("#countySelect");
  select.innerHTML = countyData
    .map((county) => `<option value="${county.name}" ${county.name === selectedCounty ? "selected" : ""}>${county.name}</option>`)
    .join("");
}

function renderTaiwanMap(metrics = new Map()) {
  const svg = document.querySelector("#taiwanMap");
  const maxCount = Math.max(1, ...Array.from(metrics.values()).map((item) => item.count || 0));
  svg.innerHTML = `
    <title id="taiwanMapTitle">台灣縣市互動地圖</title>
    <desc id="taiwanMapDesc">點選縣市後可以抓取即時公開資料並計算住宅交易指標。</desc>
    <path d="M245 28 C305 72 322 154 306 226 C345 292 332 374 304 448 C286 524 256 620 204 698 C160 626 118 548 100 470 C76 366 92 274 132 202 C150 124 180 62 245 28 Z" fill="#e6edf0" />
    <text x="24" y="34" fill="#5d6b78" font-size="18" font-weight="800">Taiwan live map</text>
    ${countyData
      .map((county) => {
        const item = metrics.get(county.name);
        const intensity = item ? 0.28 + (item.count / maxCount) * 0.72 : 0;
        const fill = item ? `rgba(31, 138, 112, ${intensity.toFixed(2)})` : "#dce5e8";
        return `
          <g data-county="${county.name}">
            <rect class="county ${county.name === selectedCounty ? "active" : ""}"
              x="${county.x}" y="${county.y}" width="${county.w}" height="${county.h}" rx="10"
              fill="${fill}" tabindex="0" role="button"
              aria-label="${county.name}，點選查詢即時資料"
            />
            <text class="county-label" x="${county.x + county.w / 2}" y="${county.y + county.h / 2 - 2}">${county.name}</text>
            <text class="county-count" x="${county.x + county.w / 2}" y="${county.y + county.h / 2 + 18}">${item ? formatter.format(item.count) : "選取"}</text>
          </g>
        `;
      })
      .join("")}
  `;

  svg.querySelectorAll("[data-county]").forEach((group) => {
    const name = group.dataset.county;
    group.addEventListener("click", () => selectCounty(name));
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectCounty(name);
      }
    });
  });
}

function selectCounty(name) {
  selectedCounty = name;
  document.querySelector("#countySelect").value = name;
  renderTaiwanMap();
  document.querySelector("#liveStatus").textContent = `${name} 已選取。按下「撈取並計算公開資料」取得即時資料。`;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
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

function getNumber(value) {
  const number = Number(String(value || "").replaceAll(",", "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(number) ? number : 0;
}

function getRocYear(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length < 5) return null;
  const year = Number(digits.slice(0, digits.length === 7 ? 3 : 2));
  return Number.isFinite(year) && year > 0 ? year : null;
}

function summarizeRows(rows) {
  const headers = (rows[0] || []).map((header) => header.replace(/^\uFEFF/, ""));
  const indices = {
    target: headers.indexOf("交易標的"),
    district: headers.indexOf("鄉鎮市區"),
    unitPrice: headers.indexOf("單價元平方公尺"),
    buildingType: headers.indexOf("建物型態"),
    buildingDate: headers.indexOf("建築完成年月"),
    transactionDate: headers.indexOf("交易年月日"),
  };
  const dataRows = rows
    .slice(2)
    .filter((row) => row.length > 8)
    .filter((row) => indices.target === -1 || row[indices.target] !== "土地");
  const currentRocYear = new Date().getFullYear() - 1911;
  const byDistrict = new Map();
  let unitPriceSum = 0;
  let unitPriceCount = 0;
  let newHomeCount = 0;
  let residentialCount = 0;
  let newestTransactionYear = 0;

  dataRows.forEach((row) => {
    const district = row[indices.district] || "未分類";
    const unitPrice = getNumber(row[indices.unitPrice]);
    const buildingYear = getRocYear(row[indices.buildingDate]);
    const transactionYear = getRocYear(row[indices.transactionDate]);
    const buildingType = row[indices.buildingType] || "";
    const isNewHome = buildingYear !== null && currentRocYear - buildingYear <= 5;
    const isResidential = /住宅|華廈|公寓|透天|套房|大樓/.test(buildingType);
    if (unitPrice > 0) {
      unitPriceSum += unitPrice;
      unitPriceCount += 1;
    }
    if (isNewHome) newHomeCount += 1;
    if (isResidential) residentialCount += 1;
    if (transactionYear && transactionYear > newestTransactionYear) newestTransactionYear = transactionYear;

    const existing = byDistrict.get(district) || { count: 0, unitPriceSum: 0, unitPriceCount: 0, newCount: 0 };
    existing.count += 1;
    if (unitPrice > 0) {
      existing.unitPriceSum += unitPrice;
      existing.unitPriceCount += 1;
    }
    if (isNewHome) existing.newCount += 1;
    byDistrict.set(district, existing);
  });

  const districtRows = Array.from(byDistrict.entries())
    .map(([district, item]) => ({
      district,
      count: item.count,
      avgUnitPrice: item.unitPriceCount ? item.unitPriceSum / item.unitPriceCount : 0,
      newRatio: item.count ? (item.newCount / item.count) * 100 : 0,
    }))
    .sort((a, b) => b.count - a.count);

  return {
    count: dataRows.length,
    avgUnitPrice: unitPriceCount ? unitPriceSum / unitPriceCount : 0,
    newHomeCount,
    newHomeRatio: dataRows.length ? (newHomeCount / dataRows.length) * 100 : 0,
    residentialCount,
    newestTransactionYear,
    districtRows,
  };
}

async function loadCountyRows(county) {
  if (zipCache.has(county.code)) return zipCache.get(county.code);
  if (!window.JSZip) throw new Error("JSZip 尚未載入，請重新整理頁面後再試。");
  const response = await fetch(liveDataUrl, { cache: "no-store" });
  if (!response.ok) throw new Error(`公開資料下載失敗：HTTP ${response.status}`);
  const zip = await JSZip.loadAsync(await response.arrayBuffer());
  const fileName = `${county.code}_lvr_land_a.csv`;
  const file =
    zip.file(fileName) ||
    zip.file(fileName.toUpperCase()) ||
    Object.values(zip.files).find((entry) => entry.name.toLowerCase().endsWith(fileName));
  if (!file) throw new Error(`ZIP 內找不到 ${fileName}`);
  const rows = parseCsv(await file.async("string"));
  zipCache.set(county.code, rows);
  return rows;
}

function renderLiveSummary(summary, countyName) {
  const poi = document.querySelector("#poiSelect").value;
  const stats = document.querySelector("#liveStats");
  const thirdLabel = poi === "residential" ? "住宅型態筆數" : "5 年內新屋";
  const thirdValue =
    poi === "residential"
      ? `${formatter.format(summary.residentialCount)} 筆`
      : `${summary.newHomeRatio.toFixed(1)}%`;
  stats.innerHTML = `
    <article>
      <span class="metric-label">交易筆數</span>
      <strong>${formatter.format(summary.count)}</strong>
    </article>
    <article>
      <span class="metric-label">平均單價</span>
      <strong>${formatter.format(Math.round(summary.avgUnitPrice))} 元/㎡</strong>
    </article>
    <article>
      <span class="metric-label">${thirdLabel}</span>
      <strong>${thirdValue}</strong>
    </article>
  `;
  document.querySelector("#liveStatus").textContent =
    `${countyName} 計算完成。最新交易年約為民國 ${summary.newestTransactionYear || "--"} 年，資料來自內政部實價登錄本期 CSV ZIP。`;
  const rows = document.querySelector("#liveRows");
  rows.innerHTML = summary.districtRows
    .slice(0, 12)
    .map(
      (item) => `
        <tr>
          <td>${item.district}</td>
          <td>${formatter.format(item.count)}</td>
          <td>${item.avgUnitPrice ? `${formatter.format(Math.round(item.avgUnitPrice))} 元/㎡` : "--"}</td>
          <td>${item.newRatio.toFixed(1)}%</td>
        </tr>
      `,
    )
    .join("");
  renderTaiwanMap(new Map([[countyName, { count: summary.count }]]));
}

async function fetchLiveData() {
  const button = document.querySelector("#fetchLiveData");
  const status = document.querySelector("#liveStatus");
  const county = countyData.find((item) => item.name === selectedCounty);
  if (!county) return;
  button.disabled = true;
  status.textContent = `正在下載內政部實價登錄公開資料，並解析 ${county.name} CSV...`;
  try {
    const rows = await loadCountyRows(county);
    const summary = summarizeRows(rows);
    renderLiveSummary(summary, county.name);
  } catch (error) {
    status.textContent = `${county.name} 即時資料抓取失敗：${error.message}`;
  } finally {
    button.disabled = false;
  }
}

function renderMap(data) {
  const svg = document.querySelector("#changhuaMap");
  svg.innerHTML = `
    <title id="mapTitle">彰化縣鄉鎮市新屋比例地圖</title>
    <desc id="mapDesc">顏色越深代表新屋比例越高，點選區塊可查看具體戶數。</desc>
    <rect x="28" y="70" width="608" height="540" rx="18" fill="#e9eef2" />
    <text x="50" y="44" fill="#5d6b78" font-size="18" font-weight="800">彰化縣行政區互動地圖</text>
    ${data
      .map(
        (district) => `
          <g data-district="${district.name}">
            <rect class="district ${district.name === selectedDistrict ? "active" : ""}"
              x="${district.x}" y="${district.y}" width="${district.w}" height="${district.h}" rx="8"
              fill="${colorForRatio(district.newHomeRatio)}" tabindex="0" role="button"
              aria-label="${district.name}，新屋比例 ${district.newHomeRatio}%"
            />
            <text class="district-label" x="${district.x + district.w / 2}" y="${district.y + district.h / 2 - 4}">${district.name}</text>
            <text class="district-count" x="${district.x + district.w / 2}" y="${district.y + district.h / 2 + 20}">${district.newHomeRatio}%</text>
          </g>
        `,
      )
      .join("")}
  `;

  svg.querySelectorAll("[data-district]").forEach((group) => {
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

function getFilteredSortedData() {
  const query = document.querySelector("#districtSearch").value.trim();
  const sortMode = document.querySelector("#sortMode").value;
  const filtered = districts.filter((district) => district.name.includes(query));
  return filtered.sort((a, b) => {
    if (sortMode === "newHomes") return b.newHomes - a.newHomes;
    if (sortMode === "totalHomes") return b.totalHomes - a.totalHomes;
    if (sortMode === "vacancy") return b.vacantHomes / b.totalHomes - a.vacantHomes / a.totalHomes;
    return b.newHomeRatio - a.newHomeRatio;
  });
}

function renderTable() {
  const rows = document.querySelector("#districtRows");
  const data = getFilteredSortedData();
  rows.innerHTML = data
    .map(
      (district) => `
        <tr class="${district.name === selectedDistrict ? "active" : ""}" data-row="${district.name}">
          <td>${district.name}</td>
          <td>${formatHomes(district.totalHomes)}</td>
          <td>${formatHomes(district.occupiedHomes)}</td>
          <td>${formatHomes(district.vacantHomes)}</td>
          <td>${formatHomes(district.newHomes)}</td>
          <td>${district.newHomeRatio.toFixed(1)}%</td>
        </tr>
      `,
    )
    .join("");

  rows.querySelectorAll("[data-row]").forEach((row) => {
    row.addEventListener("click", () => selectDistrict(row.dataset.row));
  });
}

function renderDetails() {
  const district = districts.find((item) => item.name === selectedDistrict) || districts[0];
  const vacancyRatio = (district.vacantHomes / district.totalHomes) * 100;
  document.querySelector("#selectedName").textContent = district.name;
  document.querySelector("#selectedTotal").textContent = formatHomes(district.totalHomes);
  document.querySelector("#selectedNew").textContent = formatHomes(district.newHomes);
  document.querySelector("#selectedRatio").textContent = `${district.newHomeRatio.toFixed(1)}%`;
  document.querySelector("#selectedVacant").textContent = `${formatHomes(district.vacantHomes)} (${vacancyRatio.toFixed(1)}%)`;
  document.querySelector("#selectedNote").textContent = district.note;
}

function selectDistrict(name) {
  selectedDistrict = name;
  renderDetails();
  renderMap(getFilteredSortedData());
  renderTable();
}

document.querySelector("#districtSearch").addEventListener("input", () => {
  const data = getFilteredSortedData();
  if (data.length && !data.some((district) => district.name === selectedDistrict)) {
    selectedDistrict = data[0].name;
    renderDetails();
  }
  renderMap(data);
  renderTable();
});

document.querySelector("#sortMode").addEventListener("change", () => {
  renderMap(getFilteredSortedData());
  renderTable();
});

document.querySelector("#countySelect").addEventListener("change", (event) => {
  selectCounty(event.target.value);
});

document.querySelector("#poiSelect").addEventListener("change", () => {
  document.querySelector("#liveStatus").textContent = `${selectedCounty} 指標已切換。按下按鈕重新計算。`;
});

document.querySelector("#fetchLiveData").addEventListener("click", fetchLiveData);

renderNationalCards();
renderCountyOptions();
renderTaiwanMap();
renderDetails();
renderMap(districts);
renderTable();
