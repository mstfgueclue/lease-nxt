import { useQuery } from "@tanstack/react-query";
import { getProperties, getProperty } from "./api";

export function usePropertyQuery(id: string) {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => getProperty(id),
  });
}

export function usePropertiesQuery() {
  return useQuery({
    queryKey: ["properties"],
    queryFn: getProperties,
  });
}
