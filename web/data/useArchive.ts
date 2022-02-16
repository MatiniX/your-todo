import { AxiosError } from "axios";
import useSWR from "swr";
import axiosInstance from "../utils/axiosInstance";
import { Task } from "./interfaces/Task";
import useSWRInfinite from "swr/infinite";

interface PaginatedTasks {
  hasMore: boolean;
  tasks: Task[];
}

const getKey = (index: any, previousPageData: any) => {
  console.log({ index, previousPageData });

  // reached the end
  if (previousPageData && !previousPageData.hasMore) return null;

  if (index === 0) return "task/archived?limit=9";

  return `task/archived?cursor=${
    previousPageData.tasks[previousPageData.tasks.length - 1].updatedAt
  }&limit=9`;
};

const useArchive = () => {
  const { data, error, isValidating, size, setSize, mutate } = useSWRInfinite<
    PaginatedTasks,
    AxiosError
  >(getKey, async (url) => {
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  });

  // tento trik spraví jednu array so všetkými taskami z data v ktorej sú taksky separátne spolu s hasMore property

  const allTasks: Task[] = data ? new Array<Task>().concat(...data.map((d) => d.tasks)) : [];

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === "undefined");
  const hasMore = data && data[data.length - 1]?.hasMore;
  const isRefreshing = isValidating && data && data.length === size;

  return {
    data,
    error,
    isValidating,
    allTasks,
    setSize,
    size,
    isLoadingMore,
    isLoadingInitialData,
    hasMore,
    isRefreshing,
  };
};

export { useArchive };
