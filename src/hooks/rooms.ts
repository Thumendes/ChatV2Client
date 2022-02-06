import { httpClient } from "services/api";
import useSWR from "swr";

const fetcher = (url: string) => httpClient.get(url).then(({ data }) => data);

export type Room = {
  id: string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
};

export function useRooms() {
  const { data, error } = useSWR<Room[]>("/chat/rooms", fetcher);

  return { rooms: data, isLoading: !data && !error, error };
}
