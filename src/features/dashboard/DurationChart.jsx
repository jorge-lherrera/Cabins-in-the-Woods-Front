import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Heading from "../../ui/Heading";

const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const COLORS = ["#ef4444", "#f97316", "#14b8a6"];

function DurationChart({ nightRanges }) {
  const data = [
    {
      duration: "2-3 nights",
      value: nightRanges?.["2-3"] ?? 0,
      color: COLORS[0],
    },
    {
      duration: "4-5 nights",
      value: nightRanges?.["4-5"] ?? 0,
      color: COLORS[1],
    },
    {
      duration: "8-14 nights",
      value: nightRanges?.["8-14"] ?? 0,
      color: COLORS[2],
    },
  ].filter((item) => item.value > 0);

  return (
    <ChartBox>
      <Heading as="h2">Stay duration summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

DurationChart.propTypes = {
  nightRanges: PropTypes.object.isRequired,
};

export default DurationChart;
