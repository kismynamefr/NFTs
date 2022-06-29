import { FETCH_HISTORY_ITEM, FETCH_HISTORY_SUCCESS, FETCH_HISTORY_ERROR } from '../constants/constantsFetchHistory';
import axios from 'axios';

export const LoadHistories = (chainId) => async (dispatch) => {
    let url;
    if(chainId === 3){
        url = `http://192.168.1.142:2406/collections/item/true`
    } else if(chainId === 97) {
        url = "http://192.168.1.142:2406/collectionBSC"
    }

    try {
        dispatch({ type: FETCH_HISTORY_ITEM });
        await axios({
            method: 'get',
            url: url
        }).then(data => {
            const responseBody = data.data;
            dispatch({
                type: FETCH_HISTORY_SUCCESS,
                data: responseBody
            })
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_HISTORY_ERROR,
            message: error
        })
    }
}