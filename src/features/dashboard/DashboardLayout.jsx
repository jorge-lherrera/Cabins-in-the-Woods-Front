import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

import { useDashboardBookings } from "../../hooks/bookings/useDashboardBookings";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const [searchParams] = useSearchParams();
  const days = Number(searchParams.get("last")) || 7;

  const { isLoading, error, dashboardData } = useDashboardBookings({ days });

  console.log("Dashboard Data: layout", dashboardData);

  if (isLoading) return <Spinner />;
  if (error) return <div>Erro ao carregar dados do dashboard</div>;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={dashboardData?.total ?? 0}
        confirmedStays={dashboardData?.checkedInBookings ?? 0}
        numDays={dashboardData?.totalRevenue ?? 0}
        cabinCount={dashboardData?.occupancyRate ?? 0}
      />
      <TodayActivity bookingsToday={dashboardData?.bookingsToday ?? []} />
      <DurationChart nightRanges={dashboardData?.nightRanges ?? {}} />
      <SalesChart salesChart={dashboardData?.salesChart ?? []} days={days} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
