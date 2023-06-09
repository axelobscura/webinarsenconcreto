import useSWR from 'swr'

function fetcher(url: string) {
  return window.fetch(url).then((res) => res.json())
}

export function useEntries() {
  const { data, error } = useSWR(`/api/getentries`, fetcher)

  return {
    entries: data,
    isLoading: !error && !data,
    isError: error,
  }
}
