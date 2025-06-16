import styled from "styled-components";

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
  const { isLoading, error, dashboardData } = useDashboardBookings();

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
      <SalesChart salesChart={dashboardData?.salesChart ?? []} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
