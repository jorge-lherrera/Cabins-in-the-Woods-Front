import { createContext, useContext } from "react";

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        role="table"
        className="border border-grey-200 text-sm bg-grey-0 rounded-[7px] overflow-hidden"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <header
      role="row"
      className={`grid items-center transition-none px-6 py-4 bg-grey-50 border-b border-grey-100 uppercase tracking-wide font-semibold text-grey-600`}
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </header>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      role="row"
      className="grid items-center transition-none px-6 py-3 border-b border-grey-100 last:border-b-0"
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </div>
  );
}

function Body({ data, render }) {
  if (!data.length)
    return (
      <p className="text-center text-base font-semibold my-6">
        No data to show at the moment
      </p>
    );

  return <section className="my-1">{data.map(render)}</section>;
}

function Footer({ children }) {
  if (!children) return null;
  return (
    <footer className="bg-grey-50 flex justify-center py-3">{children}</footer>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
