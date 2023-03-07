import { GET_TOP_POOLS } from "../queries";
import { useQuery } from "@apollo/client";

// Custom hook to fetch top pool data
function useFetchTopPoolData(pageSize: number, currentPage: number) {
  // Fetch data using useQuery hook from Apollo client
  const {
    loading: topPoolLoading, // Boolean flag for loading status
    error: topPoolError, // Error object if an error occurred during the fetch
    data: topPoolData, // Fetched data
    refetch: refetchTopPool, // Function to refetch the data
  } = useQuery(GET_TOP_POOLS, {
    variables: {
      first: pageSize, // Limit the number of items fetched per page
      skip: currentPage * pageSize, // Offset for pagination
    },
  });

  // Return data and relevant variables
  return {
    topPoolData,
    topPoolLoading,
    refetchTopPool,
    errorMessageTopPool: topPoolError?.message, // Error message if an error occurred during the fetch
  };
}

export default useFetchTopPoolData;
