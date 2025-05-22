import { useTodayActivity } from "../../hooks/bookings/useTodayActivity";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";

function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();

  return (
    <div className="bg-grey-0 border-grey-100 col-span-2 flex flex-col gap-6 rounded-md border p-8 pt-6">
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {!isLoading ? (
        activities?.length > 0 ? (
          <ul className="scrollbar-hide overflow-scroll overflow-x-hidden">
            {activities.map((activity) => (
              <TodayItem activity={activity} key={activity.id} />
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-center text-lg font-semibold">
            No activity today...
          </p>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default TodayActivity;
