import toast from "react-hot-toast";

function useCopyToClipboard() {
  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    // Write the given text to the clipboard and show a success message
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied Successfully");
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      return false;
    }
  };

  return [copy];
}

export default useCopyToClipboard;
