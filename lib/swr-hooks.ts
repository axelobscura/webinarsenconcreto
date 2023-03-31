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

/*
export function useSectores() {
  const { data, error } = useSWR(`/api/get-sectores`, fetcher)

  return {
    sectores: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useCategorias() {
  const { data, error } = useSWR(`/api/get-categorias`, fetcher)

  return {
    categorias: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useEmpresas() {
  const { data, error } = useSWR(`/api/get-empresas`, fetcher)

  return {
    empresas: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useProductos() {
  const { data, error } = useSWR(`/api/get-productos`, fetcher)

  return {
    productos: data,
    isLoadingProductos: !error && !data,
    isError: error,
  }
}

export function useEmpresa(id: string) {
  const { data, error } = useSWR(`/api/get-empresa?id=${id}`, fetcher)

  return {
    productos: data,
    isLoadingProductos: !error && !data,
    isError: error,
  }
}

export function useEntry(id: string) {
  return useSWR(`/api/get-entry?id=${id}`, fetcher)
}
*/