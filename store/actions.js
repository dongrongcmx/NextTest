import {actionTypes} from "./action-types";
import fetch from 'isomorphic-unfetch'

//前台
export const getSearchPageList = async (dispatch, url) => {
  //点击搜索分页搜索到的文章列表
  const res = await fetch(url)
  const jsonData = await res.json()
  return dispatch({type: actionTypes.SEARCH_PAGE_DATA, searchData: jsonData})
}
