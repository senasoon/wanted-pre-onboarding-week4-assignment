import apiRequest from './index';

const RESOURCE = '/search';
const SEARCH_LIMIT = 10;

export const getSearchTodo = async (keyword: string, page: number) => {
  try {
    const response = await apiRequest.get(
      `${RESOURCE}?q=${keyword}&page=${page}&limit=${SEARCH_LIMIT}`
    );

    return response;
  } catch (error) {
    throw new Error('API getTodoList error');
  }
};
