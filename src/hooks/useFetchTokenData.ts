import { TOKEN_DAY_DATA } from "../queries";
import { useQuery } from "@apollo/client";

function useFetchTokenData(pageSize: number, currentPage: number) {
  const {
    loading: tokenLoading,
    error: tokenError,
    data: tokenData,
    refetch: refetchToken,
  } = useQuery(TOKEN_DAY_DATA, {
    variables: {
      first: pageSize, // The number of tokens to fetch per page
      skip: currentPage * pageSize, // The number of tokens to skip based on the current page number
    },
  });

  return {
    tokenLoading,
    tokenData,
    errorMessage: tokenError?.message, // Display the error message if there is an error
    refetchToken, // A function to refetch the token data
  };
}

export default useFetchTokenData;
