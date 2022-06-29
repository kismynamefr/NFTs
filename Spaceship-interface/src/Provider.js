import React from 'react';
import Web3 from 'web3';
import {
    ABI,
    ABI_FBS,
    ADDRESS_CONTRACT_BNB,
    ADDRESS_CONTRACT_JETWINGS_ETH,
    ADDRESS_CONTRACT_NITRO_ETH,
    ADDRESS_CONTRACT_ARMOR_ETH,
    ADDRESS_CONTRACT_ENGINE_ETH,
    ADDRESS_FBS_ETH
} from './components/ABI/NFTs';

const useProvider = () => {
    const web3 = new Web3(Web3.givenProvider);
    let NFTsMarket;
    let NFTsBuyFPS;
    let account;
    let balanceFBS;

    const Provider = async (chainId, nameItem) => {
        account = await web3.eth.getAccounts();
        switch (chainId) {
            case 3:
                switch (nameItem) {
                    case 'Wings':
                        NFTsMarket = new web3.eth.Contract(ABI, ADDRESS_CONTRACT_JETWINGS_ETH);
                        NFTsBuyFPS = new web3.eth.Contract(ABI_FBS, ADDRESS_FBS_ETH);
                        balanceFBS = await NFTsBuyFPS.methods.balanceOf(account[0]).call();
                        return { NFTsMarket, NFTsBuyFPS, ADDRESS_CONTRACT: ADDRESS_CONTRACT_JETWINGS_ETH, account: account[0], balanceFBS };
                    case 'Nitro':
                        NFTsMarket = new web3.eth.Contract(ABI, ADDRESS_CONTRACT_NITRO_ETH);
                        NFTsBuyFPS = new web3.eth.Contract(ABI_FBS, ADDRESS_FBS_ETH);
                        return { NFTsMarket, NFTsBuyFPS, ADDRESS_CONTRACT: ADDRESS_CONTRACT_NITRO_ETH, account: account[0] };
                    case 'Armor':
                        NFTsMarket = new web3.eth.Contract(ABI, ADDRESS_CONTRACT_ARMOR_ETH);
                        NFTsBuyFPS = new web3.eth.Contract(ABI_FBS, ADDRESS_FBS_ETH)
                        return { NFTsMarket, NFTsBuyFPS, ADDRESS_CONTRACT: ADDRESS_CONTRACT_ARMOR_ETH, account: account[0] };
                    case 'Engine':
                        NFTsMarket = new web3.eth.Contract(ABI, ADDRESS_CONTRACT_ENGINE_ETH);
                        NFTsBuyFPS = new web3.eth.Contract(ABI_FBS, ADDRESS_FBS_ETH)
                        return { NFTsMarket, NFTsBuyFPS, ADDRESS_CONTRACT: ADDRESS_CONTRACT_ENGINE_ETH, account: account[0] };
                    default:
                        break;
                }
            case 97:
                switch (nameItem) {
                    case 'Wings':
                        NFTsMarket = new web3.eth.Contract(ABI, ADDRESS_CONTRACT_BNB);
                        return { NFTsMarket, ADDRESS_CONTRACT: ADDRESS_CONTRACT_BNB, account: account[0] };
                    case 'Nitro':
                        NFTsMarket = new web3.eth.Contract(ABI, ADDRESS_CONTRACT_BNB);
                        return { NFTsMarket, ADDRESS_CONTRACT: ADDRESS_CONTRACT_BNB, account: account[0] };
                    case 'Armor':
                        NFTsMarket = new web3.eth.Contract(ABI, ADDRESS_CONTRACT_BNB);
                        return { NFTsMarket, ADDRESS_CONTRACT: ADDRESS_CONTRACT_BNB, account: account[0] };
                    case 'Engine':
                        NFTsMarket = new web3.eth.Contract(ABI, ADDRESS_CONTRACT_BNB);
                        return { NFTsMarket, ADDRESS_CONTRACT: ADDRESS_CONTRACT_BNB, account: account[0] };
                    default:
                        break;
                }
            default:
                break;
        }

    }
    return { Provider }
}
export default useProvider;