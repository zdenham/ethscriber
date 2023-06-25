import { sha256 } from './sha256';

export class EthscriptionsAPI {
  baseUrl: string;
  constructor(
    baseUrl = 'https://eth-script-indexer-eca25c4cf43b.herokuapp.com'
  ) {
    this.baseUrl = baseUrl;
  }

  async checkAvailability(
    dataUri: string
  ): Promise<{ isTaken: boolean; ownerAddress: string }> {
    const hash = await sha256(dataUri);
    const response = await fetch(
      `${this.baseUrl}/api/ethscriptions/exists/${hash}`
    );

    const data = await response.json();

    return {
      isTaken: data.result,
      ownerAddress: data.ethscription?.current_owner || null,
    };
  }
}
