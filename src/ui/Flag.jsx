import styled from "styled-components";
import ReactCountryFlag from "react-country-flag";
import { getCode } from "country-list";

const StyledFlag = styled(ReactCountryFlag)`
  max-width: 2.2rem;
  width: 2rem;
  height: 2rem;
  border-radius: var(--border-radius-tiny);
  display: block;
  border: 1px solid var(--color-grey-100);
`;

export const Flag = ({ nationality, ...props }) => {
  const countryCode = getCode(nationality) || "";
  return <StyledFlag countryCode={countryCode} svg {...props} />;
};
