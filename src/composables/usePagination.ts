import { ref, computed, Ref } from "vue";

interface PaginationConfig<T> {
  rowsPerPage?: Ref<number>;
  currentPage: Ref<number>;
  arrayToPaginate: Ref<Array<T>>;
}

export function usePagination<T>(config: PaginationConfig<T>) {
  const { currentPage, arrayToPaginate } = config;
  const rowsPerPage = config.rowsPerPage ?? ref(10);

  const totalItems = computed(() => {
    return arrayToPaginate.value.length ?? 0;
  });

  const firstItem = computed(() => {
    return (currentPage.value - 1) * rowsPerPage.value;
  });

  const lastItem = computed(() => {
    return Math.min(currentPage.value * rowsPerPage.value, totalItems.value);
  });

  const paginatedItems = computed(() => {
    const start = firstItem.value;
    const end = lastItem.value;

    return arrayToPaginate.value.slice(start, end);
  });

  const numberOfPages = computed(() => {
    return Math.ceil(totalItems.value / rowsPerPage.value);
  });

  return {
    firstItem,
    lastItem,
    paginatedItems,
    totalItems,
    numberOfPages,
  };
}
