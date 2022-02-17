import xlsx, { WorkBook } from "xlsx";

// import XLSX from "./EXCEL";
//
const XLSX = xlsx;

export const importExcelFromBuffer = <Item = any>(
  file: ArrayBuffer
): Item[] => {
  // 读取表格
  const workbook = xlsx.read(file, {
    type: "buffer",
    raw: true,
  });
  const sheetNames = workbook.SheetNames;
  const sheet1 = workbook.Sheets[sheetNames[0]];
  // 读取内容
  return xlsx.utils.sheet_to_json(sheet1, {
    raw: true,
  });
};

interface ExportExcelParams {
  list: any[];
  fileName?: string;
  sheetName?: string;
}

/**
 *
 * @param list
 * @default []
 *
 * @returns
 */

export const exportExcel = ({
  list,
  fileName = `execl-${Date.now()}.xlsx`,
  sheetName = "Sheet1",
}: ExportExcelParams) => {
  const jsonWorkSheet = xlsx.utils.json_to_sheet(list);

  const workBook: WorkBook = {
    SheetNames: [sheetName],
    Sheets: {
      [sheetName]: jsonWorkSheet,
    },
  };
  return xlsx.writeFile(workBook, fileName, {
    Props: {
      Title: "测试标题",
    },
  });
};

export const exportExcelHandleStyle = ({
  list,
  fileName = `execl-${Date.now()}.xlsx`,
  sheetName = "Sheet1",
}: ExportExcelParams) => {
  var wb = xlsx.utils.table_to_book(document.querySelector("table"), {
    raw: true,
  });

  let range = XLSX.utils.decode_range(wb["Sheets"][sheetName]["!ref"]);
  let borderStyle = {
    top: {
      style: "thin",
      color: { rgb: "000000" },
    },
    bottom: {
      style: "thin",
      color: { rgb: "000000" },
    },
    left: {
      style: "thin",
      color: { rgb: "000000" },
    },
    right: {
      style: "thin",
      color: { rgb: "000000" },
    },
  };

  wb.Sheets[sheetName]["!rows"] = [
    { hpx: 150 },
    { hpx: 50 },
    { hpx: 50 },
    { hpx: 50 },
    { hpx: 50 },
    { hpx: 50 },
  ];
  console.log(wb.Sheets[sheetName]["!merges"]);

  wb.Sheets[sheetName]["!merges"]?.forEach((item) => {
    if (item.e.r == item.s.r && item.e.c != item.s.c) {
      // 列合并
      let R = item.s.r;
      let countLength = item.e.c - item.s.c;
      for (let i = item.s.c; i <= item.e.c; i++) {
        let cell = { c: i, r: R };
        let cell_ref = XLSX.utils.encode_cell(cell);
        if (!wb.Sheets[sheetName][cell_ref]) {
          wb.Sheets[sheetName][cell_ref] = { t: "s", v: "" };
        }
      }
    } else if (item.e.c == item.s.c && item.e.r != item.s.r) {
      // 行合并
      let C = item.s.c;
      let countLength = item.e.r - item.s.r;
      for (let i = item.s.r; i <= item.e.r; i++) {
        let cell = { c: C, r: i };
        let cell_ref = XLSX.utils.encode_cell(cell);
        if (!wb.Sheets[sheetName][cell_ref]) {
          wb.Sheets[sheetName][cell_ref] = { t: "s", v: "" };
        }
      }
    }
  });
  for (let C = range.s.c; C <= range.e.c; ++C) {
    for (let R = range.s.r; R <= range.e.r; ++R) {
      let cell = { c: C, r: R };
      let cell_ref = XLSX.utils.encode_cell(cell);
      if (R == 4 || wb.Sheets[sheetName][cell_ref].v == "最终结论") {
        wb.Sheets[sheetName][cell_ref].s = {
          fill: {
            fgColor: {
              rgb: "eeeeee",
            },
          },
          alignment: {
            horizontal: "center",
          },
          font: {
            name: "黑体",
            sz: "15",
            bold: true,
          },
          border: borderStyle,
        };
      } else if (R == 1) {
        wb.Sheets[sheetName][cell_ref].s = {
          alignment: {
            horizontal: "center",
            vertical: "center",
          },
          font: {
            name: "黑体",
            sz: "15",
            bold: true,
          },
          border: borderStyle,
        };
      } else {
        if (wb.Sheets[sheetName][cell_ref]) {
          wb.Sheets[sheetName][cell_ref].s = {
            font: {
              name: "黑体",
              sz: "12",
            },
            border: borderStyle,
          };
        }
      }
    }
  }

  return XLSX.writeFile(wb, fileName, {
    Props: {
      Title: "测试标题",
    },
  });
};

export function formatSheetDate(numb: number, format: string) {
  const old = numb - 1;
  const t = Math.round((old - Math.floor(old)) * 24 * 60 * 60);
  const time = new Date(1900, 0, old, 0, 0, t);
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  return (
    year +
    format +
    (month < 10 ? "0" + month : month) +
    format +
    (date < 10 ? "0" + date : date)
  );
}

export const defaultValue = [
  {
    name: "张三",
    age: 18,
    gender: "男",
  },
  {
    name: "李四",
    age: 24,
    gender: "女",
  },
];
