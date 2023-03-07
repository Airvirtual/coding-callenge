import { mergeTypeDefs } from "@graphql-tools/merge";
import { TokenDayDataModel } from "./TokenModel";
import { TransactionModel } from "./TransactionModel";

export const typeDefs = mergeTypeDefs([TokenDayDataModel, TransactionModel]);
