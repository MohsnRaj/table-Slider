import React, { useState, useEffect, createContext, useMemo } from "react";
import style from "./App.module.css"
interface CustomProTableProps {
  headcol: string[]; // عناوین ستون‌ها
  colType: string[]; // نوع هر ستون (مثلاً "text" یا "action")
  data: any[];
  children: (dataItem: any, index: number) => React.ReactNode;
}

interface TableColumnContextProps {
  visibleColumnIndices: number[];
  actionColumnIndex: number | null;
}

export const TableColumnContext = createContext<TableColumnContextProps>({
  visibleColumnIndices: [],
  actionColumnIndex: null,
});

const CustomProTable: React.FC<CustomProTableProps> = ({
  headcol,
  colType,
  data,
  children,
}) => {
  const nonActionColumnsIndices = headcol
    .map((_, index) => index)
    .filter((index) => colType[index] !== "action");

  const actionIndex = headcol.findIndex(
    (_, index) => colType[index] === "action"
  );

  
  const getVisibleCount = () => {
    const maxsize=headcol.length - 1
    const windowSize = window.innerWidth;
    if (windowSize <= 640) {
      return "1";
    } else if (windowSize <= 840) {
      return "3";
    } else if (windowSize <= 1024) {
      return "4";
    } else if (windowSize <= 1124) {
      return "5";
    } else if (windowSize <= 1224) {
      return "6";
    } else {
      return maxsize.toString() ;
    }
  };
  
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const [sliderIndex, setSliderIndex] = useState(0);
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
      setSliderIndex(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(nonActionColumnsIndices.length - parseInt(visibleCount, 10), 0);

  const handlePrev = () => {
    setSliderIndex((prev) => Math.max(prev - parseInt(visibleCount, 10), 0));
  };

  const handleNext = () => {
    setSliderIndex((prev) => Math.min(prev + parseInt(visibleCount, 10), maxIndex));
  };

  const visibleNonActionIndices = nonActionColumnsIndices.slice(
    sliderIndex,
    sliderIndex + parseInt(visibleCount, 10)
  );
  const visibleColumnIndices =
    actionIndex !== -1
      ? [...visibleNonActionIndices, actionIndex]
      : visibleNonActionIndices;

  const sortedData = useMemo(() => {
    if (sortColumn === null) return data;
    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      return sortDirection === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
    return sorted;
  }, [data, sortColumn, sortDirection]);

  const handleSort = (columnIndex: number) => {
    if (sortColumn === columnIndex) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortColumn(null);
        setSortDirection("asc");
      }
    } else {
      setSortColumn(columnIndex);
      setSortDirection("asc");
    }
  };

  const renderSortIcon = (columnIndex: number) => {
    if (sortColumn !== columnIndex) return null;
    return sortDirection === "asc" ? (
      <svg
        className="w-4 h-4 inline-block ml-1"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M5 10l5-5 5 5H5z" />
      </svg>
    ) : (
      <svg
        className="w-4 h-4 inline-block ml-1"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M15 10l-5 5-5-5h10z" />
      </svg>
    );
  };

  return (
    <div className={style.MyCustomTable}>
      <table>
        <thead className="text-gray-50">
          <tr>
            {visibleNonActionIndices.map((index) => (
              <th
                key={index}
                onClick={() => handleSort(index)}
                className=""
              >
                {headcol[index]}
                {renderSortIcon(index)}
              </th>
            ))}
            {actionIndex !== -1 && (
              <th className="px-4 py-2 text-center">{headcol[actionIndex]}</th>
            )}
          </tr>
          <tr>
            <th
              colSpan={
                visibleNonActionIndices.length + (actionIndex !== -1 ? 1 : 0)
              }
              className="px-4 py-2"
            ></th>
          </tr>
        </thead>
        <tbody>
          <TableColumnContext.Provider
            value={{
              visibleColumnIndices,
              actionColumnIndex: actionIndex !== -1 ? actionIndex : null,
            }}
          >
            {sortedData.map((dataItem, index) => children(dataItem, index))}
          </TableColumnContext.Provider>
        </tbody>
      </table>

      {
      (headcol.length != parseInt(visibleCount,10)+1) && (
      <div className="flex justify-between mt-7 mb-4">
        <button
          onClick={handlePrev}
          disabled={sliderIndex === 0}
          className="px-2 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          قبلی
        </button>
        <button
          onClick={handleNext}
          disabled={sliderIndex >= maxIndex}
          className="px-2 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          بعدی
        </button>
      </div>
      )}
    </div>
  );
};

export default CustomProTable;
