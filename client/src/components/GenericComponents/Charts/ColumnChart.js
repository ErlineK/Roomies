import React from "react";
import {
  BarChart,
  Bar,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";
import { formatCurrency } from "../../../general/utils/formatHelper";

export default function ColumnChart({ title, data, even }) {
  const formatter = (value) => formatCurrency(value);

  return (
    <div>
      <h5 className="title-margins">{title}</h5>
      <BarChart
        // width={750}
        width={window.innerWidth > 768 ? 700 : window.innerWidth * 0.9}
        height={window.innerHeight * 0.4}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          dataKey="balance"
          tickFormatter={formatter}
          allowDataOverflow={true}
        />
        <Tooltip />
        {/* <Legend /> */}
        <ReferenceLine y={even} stroke="#c60402" />
        <Bar dataKey="balance" fill="#5d993a" barSize={50}>
          <LabelList
            dataKey="balance"
            position="top"
            formatter={formatter}
            style={{ fill: "#414141" }}
          />
        </Bar>
      </BarChart>
    </div>
  );
}
