import {getAssetPlatforms} from '~/api/common';
import useNetworkStore from '~/hooks/store/useNetworkStore';

export const getTokenListUrl = async () => {
  const {currentNetwork} = useNetworkStore.getState();

  const chainId = currentNetwork?.chain_id;

  switch (Number(chainId)) {
    case 1:
      return 'https://tokens.coingecko.com/ethereum/all.json';
    case 56:
      return 'https://tokens.coingecko.com/binance-smart-chain/all.json';
    case 324:
      return 'https://tokens.coingecko.com/zksync/all.json';
    case 43114:
      return 'https://tokens.coingecko.com/avalanche/all.json';
    case 59144:
      return 'https://tokens.coingecko.com/linea/all.json';
    case 100:
      return 'https://tokens.coingecko.com/xdai/all.json';
    case 42161:
      return 'https://tokens.coingecko.com/arbitrum-one/all.json';
    case 10:
      return 'https://tokens.coingecko.com/optimistic-ethereum/all.json';
    case 8453:
      return 'https://tokens.coingecko.com/base/all.json';
    case 81457:
      return 'https://tokens.coingecko.com/blast/all.json';
    case 42220:
      return 'https://tokens.coingecko.com/celo/all.json';
    case 7777777:
      return 'https://tokens.coingecko.com/zora-network/all.json';
    case 1313161554:
      return 'https://tokens.coingecko.com/aurora/all.json';
    case 204:
      return 'https://tokens.coingecko.com/opbnb/all.json';
    case 137:
      return 'https://tokens.coingecko.com/polygon-pos/all.json';
    case 1101:
      return 'https://tokens.coingecko.com/polygon-zkevm/all.json';
    case 250:
      return 'https://tokens.coingecko.com/fantom/all.json';
    case 25:
      return 'https://tokens.coingecko.com/cronos/all.json';
    case 2046399126:
      return 'https://tokens.coingecko.com/skale/all.json';
    case 666666666:
      return 'https://tokens.coingecko.com/degen/all.json';
    case 2222:
      return 'https://tokens.coingecko.com/kava/all.json';
    case 288:
      return 'https://tokens.coingecko.com/boba/all.json';
    case 5000:
      return 'https://tokens.coingecko.com/mantle/all.json';
    case 1284:
      return 'https://tokens.coingecko.com/moonbeam/all.json';
    case 534352:
      return 'https://tokens.coingecko.com/scroll/all.json';
    case 34443:
      return 'https://tokens.coingecko.com/mode/all.json';
    case 4080:
      return 'https://testnet.tobescan.com/api/v2/tokens';
    case 7000:
      return 'https://tokens.coingecko.com/zetachain/all.json';
    default:
      const platforms = await getAssetPlatforms();

      const platformId = platforms.find(
        platform => platform.chain_identifier === Number(chainId),
      )?.id;

      return platformId
        ? `https://tokens.coingecko.com/${platformId}/all.json`
        : null;
  }
};
// url platforms : https://api.coingecko.com/api/v3/asset_platforms