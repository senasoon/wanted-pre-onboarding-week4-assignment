import apiRequest from './index';
import { RECOMMEND_LIMIT_PER_PAGE } from '../constants/search';

const RESOURCE = '/search';

export const getSearchTodo = async (keyword: string, page: number) => {
  try {
    const response = await apiRequest.get(
      `${RESOURCE}?q=${keyword}&page=${page}&limit=${RECOMMEND_LIMIT_PER_PAGE}`
    );

    return response;
  } catch (error) {
    throw new Error('API getTodoList error');
  }
};
