import PropTypes from "prop-types";
import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  max-height: 32rem;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: var(--color-grey-300) transparent;
  transition: scrollbar-color 0.2s;

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
    transition: width 0.2s;
  }

  &:hover::-webkit-scrollbar,
  &:focus-within::-webkit-scrollbar {
    width: 8px;
    background: transparent;
  }

  &:hover,
  &:focus-within {
    scrollbar-width: thin;
    scrollbar-color: var(--color-grey-300) transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
    border-radius: 8px;
  }

  &::-webkit-scrollbar-button {
    display: none;
    height: 0;
    width: 0;
  }
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity({ bookingsToday }) {
  if (!bookingsToday) return <Spinner />;

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Hoje</Heading>
      </Row>

      {bookingsToday.length > 0 ? (
        <TodayList>
          {bookingsToday.map((activity, idx) => (
            <TodayItem activity={activity} key={activity.id || idx} />
          ))}
        </TodayList>
      ) : (
        <NoActivity>Nenhuma atividade hoje...</NoActivity>
      )}
    </StyledToday>
  );
}

TodayActivity.propTypes = {
  bookingsToday: PropTypes.array,
};

export default TodayActivity;
