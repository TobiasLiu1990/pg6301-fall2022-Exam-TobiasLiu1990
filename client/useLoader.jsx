//Custom Hook
//Fetches / loads a page
import { useEffect, useState } from "react";

export function useLoader(loadingFn) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    reloadPage();
  }, []);

  async function reloadPage() {
    //Use try-finally here to handle in case url is written wrongly - it will show Loading... forever.
    try {
      setData(await loadingFn());
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, data, reloadPage };
}
