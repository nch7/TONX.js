import HttpFetchClient from "~core/utils/http-fetch-client";
import { JsonRpcProvider } from "./provider-jsonrpc";
import type { JsonRpcApiProviderOptions } from "./provider-jsonrpc";
import { CreateAxiosDefaults } from "axios";
import { RunAction } from "./abstract-provider";
import { Network } from "~core/types/network";

type GetAccountBalanceParams = {
  address: string;
};

type GetTransactionsParams = {
  account?: string;
  end_lt?: number;
  end_utime?: number;
  hash?: string;
  limit?: number;
  offset?: number;
  seqno?: number;
  shard?: string;
  sort?: string;
  start_lt?: number;
  start_utime?: number;
  workchain?: number;
};

type GetJettonBurnsParams = {
  address?: string;
  end_lt?: number;
  end_utime?: number;
  jetton_master?: string;
  jetton_wallet?: string;
  limit?: number;
  offset?: number;
  sort?: "ASC" | "DESC";
  start_lt?: number;
  start_utime?: number;
};

type GetJettonMastersParams = {
  address?: string;
  admin_address?: string;
  limit?: number;
  offset?: number;
};

type GetJettonTransfersParams = {
  address?: string;
  direction?: "in" | "out" | "both";
  end_lt?: number;
  end_utime?: number;
  jetton_master?: string;
  jetton_wallet?: string;
  limit?: number;
  offset?: number;
  sort?: "ASC" | "DESC";
  start_lt?: number;
  start_utime?: number;
};

type GetJettonWalletsParams = {
  address?: string;
  jetton_address?: string;
  limit?: number;
  offset?: number;
  owner_address?: string;
};

type GetMessagesParams = {
  body_hash?: string;
  destination?: string;
  hash?: string;
  limit?: number;
  offset?: number;
  source?: string;
};

type GetNftCollectionsParams = {
  collection_address?: string;
  limit?: number;
  offset?: number;
  owner_address?: string;
};

type GetNftItemsParams = {
  collection_address?: string;
  limit?: number;
  offset?: number;
  owner_address?: string;
};

type GetNftTransfersParams = {
  address?: string;
  collection_address?: string;
  direction?: "in" | "out" | "both";
  end_lt?: number;
  end_utime?: number;
  item_address?: string;
  limit?: number;
  offset?: number;
  sort?: "ASC" | "DESC";
  start_lt?: number;
  start_utime?: number;
};

type EstimateFeeParams = {
  address?: string;
  body?: string;
  ignore_chksig?: boolean;
  init_code?: string;
  init_data?: string;
};

type GetAddressInformationParams = {
  address: string;
};

type GetAddressStateParams = {
  address: string;
};

type GetBlockHeaderParams = {
  file_hash?: string;
  root_hash?: string;
  seqno: number;
  shard: string;
  workchain: number;
};

type GetBlockTransactionsParams = {
  after_hash?: string;
  after_lt?: number;
  count?: number;
  file_hash?: string;
  root_hash?: string;
  seqno?: number;
  shard?: string;
  workchain?: number;
};

type GetExtendedAddressInformationParams = {
  address: string;
};

type GetMasterchainBlockSignaturesParams = {
  seqno: number;
};

type GetTokenDataParams = {
  address: string;
};

type RunGetMethodParams = {
  address: string;
  method: string;
  stack: [];
};

type SendMessageParams = {
  boc: string;
};

type GetBocStatusParams = {
  boc: string;
}

type VerifyBocParams = {
  boc: string;
}

type RadixConversionParams = {
  base: string;
  number: string;
}

type BinaryConversionParams = {
  ascii: string;
  base64?: string;
  base64url?: string;
  hexadecimal?: string;
}

type DetectAddressParams = {
  address: string;
}

type TONXRunAction =
  | RunAction
  | {
    method: "getAccountBalance";
    params: GetAccountBalanceParams;
  }
  | {
    method: "getTransactions";
    params: GetTransactionsParams;
  }
  | {
    method: "getJettonBurns";
    params: GetJettonBurnsParams;
  }
  | {
    method: "getJettonMasters";
    params: GetJettonMastersParams;
  }
  | {
    method: "getJettonTransfers";
    params: GetJettonTransfersParams;
  }
  | {
    method: "getJettonWallets";
    params: GetJettonWalletsParams;
  }
  | {
    method: "getMessages";
    params: GetMessagesParams;
  }
  | {
    method: "getNftCollections";
    params: GetNftCollectionsParams;
  }
  | {
    method: "getNftItems";
    params: GetNftItemsParams;
  }
  | {
    method: "getNftTransfers";
    params: GetNftTransfersParams;
  }
  | {
    method: "estimateFee";
    params: EstimateFeeParams;
  }
  | {
    method: "getAddressInformation";
    params: GetAddressInformationParams;
  }
  | {
    method: "getAddressState";
    params: GetAddressStateParams;
  }
  | {
    method: "getBlockHeader";
    params: GetBlockHeaderParams;
  }
  | {
    method: "getBlockTransactions";
    params: GetBlockTransactionsParams;
  }
  | {
    method: "getConsensusBlock";
  }
  | {
    method: "getExtendedAddressInformation";
    params: GetExtendedAddressInformationParams;
  }
  | {
    method: "getMasterchainBlockSignatures";
    params: GetMasterchainBlockSignaturesParams;
  }
  | {
    method: "getTokenData";
    params: GetTokenDataParams;
  }
  | {
    method: "runGetMethod";
    params: RunGetMethodParams;
  }
  | {
    method: "sendMessage";
    params: SendMessageParams;
  }
  | {
    method: "getBocStatus";
    params: GetBocStatusParams;
  } | {
    method: "verifyBoc";
    params: VerifyBocParams;
  } | {
    method: "radixConversion";
    params: RadixConversionParams;
  } | {
    method: "binaryConversion";
    params: BinaryConversionParams;
  } | {
    method: "detectAddress";
    params: DetectAddressParams;
  } | {
    method: "getMasterchainInfo",
  }

export type TONXJsonRpcProviderOptions = JsonRpcApiProviderOptions & {
  apiKey: string;
  httpClientOptions?: CreateAxiosDefaults;
};

const version = "v2";
export class TONXJsonRpcProvider extends JsonRpcProvider {
  private apiKey: string;
  private network: Network;
  private httpClientOptions?: CreateAxiosDefaults;

  constructor(options: TONXJsonRpcProviderOptions) {
    super();
    const { network, apiKey, httpClientOptions } = options;
    this.apiKey = apiKey;
    this.network = network;
    this.httpClientOptions = httpClientOptions;
    this.initDefaultEndpoint();
  }

  private initDefaultEndpoint() {
    this.init({
      network: this.network,
      httpFetchClient: new HttpFetchClient({
        baseURL: `https://${this.network}-rpc.tonxapi.com/${version}/json-rpc/${this.apiKey}`,
        ...this.httpClientOptions,
      }),
    });
  }

  private async performWithLabsEndpoint(action: TONXRunAction): Promise<any> {
    const labsClient = new HttpFetchClient({
      baseURL: `https://${this.network}-rpc.tonxapi.com/${version}/labs/${this.apiKey}`,
      ...this.httpClientOptions,
    });

    const request = this.getRpcRequest(action);
    if (!request) {
      throw new Error(`Method ${action.method} not implemented`);
    }

    const response = await labsClient.client.post("", {
      id: 1,
      jsonrpc: "2.0",
      method: request.method,
      params: request.params
    });

    return response.data.result;
  }

  getRpcRequest(
    action: TONXRunAction
  ): null | { method: string; params: Record<string, any> } {
    switch (action.method) {
      case "getAccountBalance":
        return { method: "getAccountBalance", params: action.params };
      case "getTransactions":
        return { method: "getTransactions", params: action.params };
      case "getJettonBurns":
        return { method: "getJettonBurns", params: action.params };
      case "getJettonMasters":
        return { method: "getJettonMasters", params: action.params };
      case "getJettonTransfers":
        return { method: "getJettonTransfers", params: action.params };
      case "getJettonWallets":
        return { method: "getJettonWallets", params: action.params };
      case "getMessages":
        return { method: "getMessages", params: action.params };
      case "getNftCollections":
        return { method: "getNftCollections", params: action.params };
      case "getNftItems":
        return { method: "getNftItems", params: action.params };
      case "getNftTransfers":
        return { method: "getNftTransfers", params: action.params };
      case "estimateFee":
        return { method: "estimateFee", params: action.params };
      case "getAddressInformation":
        return { method: "getAddressInformation", params: action.params };
      case "getAddressState":
        return { method: "getAddressState", params: action.params };
      case "getBlockHeader":
        return { method: "getBlockHeader", params: action.params };
      case "getBlockTransactions":
        return { method: "getBlockTransactions", params: action.params };
      case "getConsensusBlock":
        return { method: "getConsensusBlock", params: {} };
      case "getExtendedAddressInformation":
        return {
          method: "getExtendedAddressInformation",
          params: action.params,
        };
      case "getMasterchainBlockSignatures":
        return {
          method: "getMasterchainBlockSignatures",
          params: action.params,
        };
      case "getTokenData":
        return { method: "getTokenData", params: action.params };
      case "runGetMethod":
        return { method: "runGetMethod", params: action.params };
      case "sendMessage":
        return { method: "sendMessage", params: action.params };
      case "getBocStatus":
        return { method: "getBocStatus", params: action.params };
      case "verifyBoc":
        return { method: "verifyBoc", params: action.params };
      case "radixConversion":
        return { method: "radixConversion", params: action.params };
      case "binaryConversion":
        return { method: "binaryConversion", params: action.params };
      case "detectAddress":
        return { method: "detectAddress", params: action.params };
      case "getMasterchainInfo":
        return { method: "getMasterchainInfo", params: {} }
      default:
        return super.getRpcRequest(action as RunAction);
    }
  }

  async getAccountBalance(address: string): Promise<any> {
    return await this._perform({
      method: "getAccountBalance",
      params: { address },
    });
  }

  async getTransactions(params: GetTransactionsParams = {}): Promise<any> {
    return await this._perform({
      method: "getTransactions",
      params,
    });
  }

  async getJettonBurns(params: GetJettonBurnsParams = {}): Promise<any> {
    return await this._perform({
      method: "getJettonBurns",
      params,
    });
  }

  async getJettonMasters(params: GetJettonMastersParams = {}): Promise<any> {
    return await this._perform({
      method: "getJettonMasters",
      params,
    });
  }

  async getJettonTransfers(
    params: GetJettonTransfersParams = {}
  ): Promise<any> {
    return await this._perform({
      method: "getJettonTransfers",
      params,
    });
  }

  async getJettonWallets(params: GetJettonWalletsParams = {}): Promise<any> {
    return await this._perform({
      method: "getJettonWallets",
      params,
    });
  }

  async getMessages(params: GetMessagesParams = {}): Promise<any> {
    return await this._perform({
      method: "getMessages",
      params,
    });
  }

  async getNftCollections(params: GetNftCollectionsParams = {}): Promise<any> {
    return await this._perform({
      method: "getNftCollections",
      params,
    });
  }

  async getNftItems(params: GetNftItemsParams = {}): Promise<any> {
    return await this._perform({
      method: "getNftItems",
      params,
    });
  }

  async getNftTransfers(params: GetNftTransfersParams = {}): Promise<any> {
    return await this._perform({
      method: "getNftTransfers",
      params,
    });
  }

  async estimateFee(params: EstimateFeeParams = {}): Promise<any> {
    return await this._perform({
      method: "estimateFee",
      params,
    });
  }

  async getAddressInformation(address: string): Promise<any> {
    return await this._perform({
      method: "getAddressInformation",
      params: { address },
    });
  }

  async getAddressState(address: string): Promise<any> {
    return await this._perform({
      method: "getAddressState",
      params: { address },
    });
  }

  async getBlockHeader(params: GetBlockHeaderParams): Promise<any> {
    return await this._perform({
      method: "getBlockHeader",
      params,
    });
  }

  async getBlockTransactions(params: GetBlockTransactionsParams): Promise<any> {
    return await this._perform({
      method: "getBlockTransactions",
      params,
    });
  }

  async getConsensusBlock(): Promise<any> {
    return await this._perform({
      method: "getConsensusBlock",
      params: {},
    });
  }

  async getExtendedAddressInformation(address: string): Promise<any> {
    return await this._perform({
      method: "getExtendedAddressInformation",
      params: { address },
    });
  }

  async getMasterchainBlockSignatures(seqno: number): Promise<any> {
    return await this._perform({
      method: "getMasterchainBlockSignatures",
      params: { seqno },
    });
  }

  async getTokenData(address: string): Promise<any> {
    return await this._perform({
      method: "getTokenData",
      params: { address },
    });
  }

  async runGetMethod(params: RunGetMethodParams): Promise<any> {
    return await this._perform({
      method: "runGetMethod",
      params,
    });
  }

  async sendMessage(boc: string): Promise<any> {
    return await this._perform({
      method: "sendMessage",
      params: { boc },
    });
  }

  async getBocStatus(boc: string): Promise<any> {
    return await this.performWithLabsEndpoint({
      method: "getBocStatus",
      params: { boc },
    });
  }

  async verifyBoc(boc: string): Promise<any> {
    return await this.performWithLabsEndpoint({
      method: "verifyBoc",
      params: { boc },
    });
  }

  async radixConversion(params: RadixConversionParams): Promise<any> {
    return await this.performWithLabsEndpoint({
      method: "radixConversion",
      params
    });
  }

  async binaryConversion(params: BinaryConversionParams): Promise<any> {
    return await this.performWithLabsEndpoint({
      method: "binaryConversion",
      params
    });
  }

  async detectAddress(address: string): Promise<any> {
    return await this.performWithLabsEndpoint({
      method: "detectAddress",
      params: { address }
    });
  }

  async getMasterchainInfo(): Promise<any> {
    return await this._perform({
      method: "getMasterchainInfo",
      params: {},
    });
  }
}