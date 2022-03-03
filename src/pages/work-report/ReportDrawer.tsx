import { copy2Clipboard, copyToBoard } from "@/utils";
import { Button, Drawer, DrawerProps, Input } from "@arco-design/web-react";
import { IconCopy } from "@arco-design/web-react/icon";
import {
  Axis,
  Chart,
  Coordinate,
  Interaction,
  Interval,
  Legend,
  useChartInstance,
} from "bizcharts";
import { ISliderProps } from "bizcharts/lib/components/Slider";
import dayjs from "dayjs";
import React, { FC, ReactElement, useMemo, useState } from "react";
import { weekMap } from ".";

interface IProps {
  data?: WorkReportItem[];
}

const _data: unknown = [
  {
    date: "星期一",
    content: "A活",
    workTime: 3,
  },
  {
    date: "星期一",
    content: "B活",
    workTime: 2,
  },
  {
    date: "星期一",
    content: "C活",
    workTime: 1,
  },
  {
    date: "星期二",
    content: "D活",
    workTime: 1,
  },
];
const ReportDrawer: FC<IProps & DrawerProps> = ({
  data = _data as WorkReportItem[],
  ...rest
}): ReactElement => {
  const scale = {
    workTime: {
      type: "linear",
      min: 0,
      max: 8,
    },
  };

  const [testText, setTestText] = useState("");

  const _data = useMemo(() => {
    // 根据日期排序
    return data
      .sort((a, b) => {
        return dayjs(b.date).unix() - dayjs(a.date).unix();
      })
      .map((item) => ({
        ...item,
        weekText: weekMap[dayjs(item.date).format("d")],
      }));
  }, [data]);

  const testResult = useMemo(() => {
    const res = {};

    data
      .sort((a, b) => {
        return dayjs(b.date).unix() - dayjs(a.date).unix();
      })
      .forEach((item) => {
        const { date } = item;
        if (!res[date]) {
          res[date] = [item];
        } else {
          res[date].push(item);
        }
      });
    return res;
  }, [data]);
  console.log("👴2022-03-03 16:17:31 ReportDrawer.tsx line:83", testResult);
  return (
    <Drawer title="工作报告" width={800} {...rest}>
      <Chart height={400} data={_data} autoFit scale={scale}>
        <Coordinate transpose />
        <Axis name="workTime" />
        <Legend visible={false} />
        <Interval
          adjust={[{ type: "stack" }]}
          position="weekText*workTime"
          color={"project"}
          style={{
            fillOpacity: 0.75,
          }}
          // tooltip={false}
          label={[
            "workTime",
            {
              position: "middle",
              offset: 0,
              style: { fill: "#fff" },
              layout: { type: "limit-in-shape" },
            },
          ]}
        />
      </Chart>
      <div>
        {Object.keys(testResult).map((item) => (
          <div key={item}>
            <h2>{`${item} (  ${weekMap[dayjs(item).format("d")]})`}</h2>
            <ul>
              {testResult[item].map((item, index) => {
                return (
                  <li key={item.id}>
                    {index + 1} .
                    <span
                      style={{
                        display: "inline-block",
                        width: 150,
                        marginLeft: 5,
                      }}
                    >
                      {item.project}
                    </span>
                    -{" "}
                    <span
                      style={{
                        marginLeft: 5,
                      }}
                    >
                      {item.content}
                    </span>
                  </li>
                );
              })}
            </ul>
            <Button
              icon={<IconCopy />}
              size="mini"
              type="primary"
              onClick={(e) => {
                let contentText = ``;
                testResult[item].forEach((item, index) => {
                  const { projectName, content } = item as WorkReportItem;
                  contentText += `${index + 1} 、${projectName} - ${content}\n`;
                });

                copy2Clipboard(contentText);
              }}
            >
              复制今日日报
            </Button>
          </div>
        ))}

      </div>
    </Drawer>
  );
};

export default ReportDrawer;
