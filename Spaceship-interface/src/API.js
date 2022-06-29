import React from 'react';

const useAPI = () => {
    const API = async (chainId) => {
        switch (chainId) {
            case 3:
                return "http://192.168.1.142:2406/collections";
            case 97:
                return "http://192.168.1.142:2406/collectionBSC";
            default:
                return null;
        }
    }
    return { API }
}
export default useAPI;