import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type {
  TimeFormat,
  TimeItemValue,
  TimePickerExtendedItem,
  TimePickerSource,
} from '../../components/TimePicker/helpers/TimePicker.shared.js';
import { sanitizeTimeItems } from '../../components/TimePicker/helpers/TimePicker.value.js';

/** Общая пустая коллекция элементов: не создает новую ссылку на каждый рендер. */
const EMPTY_ITEMS: never[] = [];

interface UseTimePickerSourceOptions<T extends TimeItemValue> {
  source?: TimePickerSource<T>;
  format: TimeFormat;
  isDropdownOpened: boolean;
  /** Текущий запрос: введенные цифры сегментов с сохранением их позиций. */
  filterQuery: string;
}

interface UseTimePickerSourceResult<T extends TimeItemValue> {
  /** Элементы источника, готовые к фильтрации и отрисовке. */
  items: Array<TimePickerExtendedItem<T>>;
  /** Запрос, для которого получены текущие элементы функции-источника. */
  fetchedQuery: string | null;
  isLoading: boolean;
  isFailed: boolean;
  retry: () => void;
}

/**
 * Отдает элементы выпадающего списка из массива или функции-источника.
 *
 * Функция вызывается только для открытого меню и на каждый новый запрос;
 * ответ на устаревший запрос отбрасывается, а отказ можно повторить через `retry`.
 * При закрытии меню результаты функции сбрасываются, чтобы следующее открытие
 * не показывало элементы для старого запроса.
 * Замена самой функции уже открытый список не перезапрашивает: актуальная функция
 * используется при следующем запросе.
 */
export const useTimePickerSource = <T extends TimeItemValue>(
  options: UseTimePickerSourceOptions<T>,
): UseTimePickerSourceResult<T> => {
  const { source, format, isDropdownOpened, filterQuery } = options;

  const isSourceFunction = typeof source === 'function';

  const [fetchedItems, setFetchedItems] = useState<Array<TimePickerExtendedItem<T>>>([]);
  const [fetchedQuery, setFetchedQuery] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [requestVersion, setRequestVersion] = useState(0);

  const sourceRef = useRef(source);
  sourceRef.current = source;

  useEffect(() => {
    const currentSource = sourceRef.current;

    if (typeof currentSource !== 'function' || !isDropdownOpened) {
      setIsLoading(false);
      setIsFailed(false);
      return;
    }

    let cancelled = false;

    setIsLoading(true);
    setIsFailed(false);

    new Promise<Array<TimePickerExtendedItem<T>>>((resolve) => resolve(currentSource(filterQuery))).then(
      (nextItems) => {
        if (!cancelled) {
          setFetchedItems(nextItems);
          setFetchedQuery(filterQuery);
          setIsLoading(false);
          setIsFailed(false);
        }
      },
      () => {
        if (!cancelled) {
          setFetchedItems([]);
          setFetchedQuery(null);
          setIsLoading(false);
          setIsFailed(true);
        }
      },
    );

    return () => {
      cancelled = true;
    };
  }, [filterQuery, isDropdownOpened, isSourceFunction, requestVersion]);

  useEffect(() => {
    if (isDropdownOpened || !isSourceFunction) {
      return;
    }

    setFetchedItems(EMPTY_ITEMS);
    setFetchedQuery(null);
  }, [isDropdownOpened, isSourceFunction]);

  // Ссылка стабильна и без мемоизации: у массива это он сам, у функции — общая пустая коллекция.
  const sourceItems = Array.isArray(source) ? source : EMPTY_ITEMS;

  const items = useMemo(
    () => sanitizeTimeItems(isSourceFunction ? fetchedItems : sourceItems, format),
    [fetchedItems, format, isSourceFunction, sourceItems],
  );

  const retry = useCallback(() => setRequestVersion((version) => version + 1), []);

  return { items, fetchedQuery, isLoading, isFailed, retry };
};
