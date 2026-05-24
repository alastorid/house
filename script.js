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

async function refreshPublicData() {
  const status = document.querySelector("#dataStatus");
  status.textContent = "正在嘗試連線政府公開資料來源...";

  const endpoints = [
    "https://data.gov.tw/dataset/162052",
    "https://www.moi.gov.tw/News_Content.aspx?n=9&s=336898&sms=9009",
  ];

  const results = await Promise.allSettled(
    endpoints.map((url) =>
      fetch(url, { cache: "no-store", mode: "cors" }).then((response) => {
        if (!response.ok) throw new Error(`${response.status}`);
        return response.text();
      }),
    ),
  );

  const okCount = results.filter((result) => result.status === "fulfilled").length;
  if (okCount === endpoints.length) {
    status.textContent = `已成功連線 ${okCount} 個公開資料來源。由於政府資料格式跨站限制，本頁保留內建整理資料作為前端展示。`;
  } else if (okCount > 0) {
    status.textContent = `已連線 ${okCount} 個來源，部分來源被瀏覽器 CORS 或站台狀態擋下；目前仍使用內建整理資料。`;
  } else {
    status.textContent = "公開來源目前無法由瀏覽器直接讀取，已改用內建整理資料。";
  }
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

document.querySelector("#refreshData").addEventListener("click", refreshPublicData);

renderNationalCards();
renderDetails();
renderMap(districts);
renderTable();
