import { Toaster } from "react-hot-toast";

function ToasterComponent() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerClassName="toaster-container"
      toastOptions={{
        className: "toaster-toast",
        success: {
          duration: 3000,
          className: "toaster-toast--success",
        },
        error: {
          duration: 5000,
          className: "toaster-toast--error",
        },
      }}
    />
  );
}

export default ToasterComponent;
