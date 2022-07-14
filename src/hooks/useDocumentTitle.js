import { useEffect } from "react";

const useDocumentTitle = (title, deps=undefined) => {
  useEffect(() => {
    document.title = title;
  }, [deps]);
};

export default useDocumentTitle;
