import styled from "styled-components";
import ReactCountryFlag from "react-country-flag";

const StyledFlag = styled(ReactCountryFlag)`
  max-width: 2rem;
  width: 2rem;
  height: 2rem;
  border-radius: var(--border-radius-tiny);
  display: block;
  border: 1px solid var(--color-grey-100);
`;

export const Flag = ({ nationality, ...props }) => (
  <StyledFlag countryCode={nationality} svg {...props} />
);
