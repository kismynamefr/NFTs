import { FETCH_MARKET_ERROR, FETCH_MARKET_SUCCESS, FETCH_MARKET_ITEM } from "../constants/constantsFetch";
import axios from 'axios';

export const LoadItems = (chainId) => async (dispatch) => {
    let url;
    if(chainId === 3){
        url = `http://192.168.1.142:2406/collections/item/false`
    } else if(chainId === 97) {
        url = "http://192.168.1.142:2406/collectionBSC"
    }

    try {
        dispatch({ type: FETCH_MARKET_ITEM });
        await axios({
            method: 'get',
            url: url
        }).then(data => {
            const responseBody = data.data;
            dispatch({
                type: FETCH_MARKET_SUCCESS,
                data: responseBody
            })
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_MARKET_ERROR,
            message: error
        })
    }
}