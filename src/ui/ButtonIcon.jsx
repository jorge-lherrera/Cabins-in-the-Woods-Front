function ButtonIcon({ children }) {
  return (
    <button className="bg-none border-none p-[0.6rem] rounded-sm transition-all duration-200 hover:bg-grey-100">
      {children}
    </button>
  );
}

export default ButtonIcon;
