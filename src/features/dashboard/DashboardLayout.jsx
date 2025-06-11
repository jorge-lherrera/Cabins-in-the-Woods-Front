import styled from "styled-components";
import { useBookings } from "../../hooks/bookings/useBookings";
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
  const { isLoading, error, data } = useBookings();

  if (isLoading) return <Spinner />;
  if (error) return <div>Erro ao carregar dados do dashboard</div>;

  const stats = data?.resource;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={stats?.total ?? 0}
        confirmedStays={stats?.checkedInBookings ?? 0}
        numDays={stats?.totalRevenue ?? 0}
        cabinCount={stats?.occupancyRate ?? 0}
      />
      <TodayActivity bookingsToday={stats?.bookingsToday ?? []} />
      <DurationChart nightRanges={stats?.nightRanges ?? {}} />
      <SalesChart salesChart={stats?.salesChart ?? []} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
