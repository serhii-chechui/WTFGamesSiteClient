import { useEffect } from "react";

// Sets document.title for the lifetime of the calling page component. This
// project only has a handful of static routes, so a full metadata library
// (e.g. react-helmet-async) would be more than this needs - a tiny hook is
// enough to give each page its own browser tab title.
const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};

export default useDocumentTitle;
