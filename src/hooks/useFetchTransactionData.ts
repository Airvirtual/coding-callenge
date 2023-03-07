import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../queries";

// Custom hook to fetch transaction data using Apollo useQuery hook
function useFetchTransactionData(pageSize: number, currentPage: number) {
  const {
    loading: transactionLoading, // Flag indicating whether transaction data is loading
    error: transactionError, // Error object if an error occurs during the query
    data: transactionData, // The transaction data returned by the query
    refetch: refetchTransaction, // Function to refetch the transaction data
  } = useQuery(GET_TRANSACTIONS, {
    // useQuery hook with GET_TRANSACTIONS query and variables
    variables: {
      first: pageSize, // Number of transactions to fetch per page
      skip: currentPage * pageSize, // Number of transactions to skip based on current page and page size
    },
  });

  // Return an object with the transaction data and related information
  return {
    transactionLoading,
    transactionData,
    errorMessageTrans: transactionError?.message,
    refetchTransaction,
  };
}

export default useFetchTransactionData; // Export the custom hook for use in other modules
