/**
 * Заглушка для модуля @skbkontur/react-ui/lib/size.
 *
 * Используется в Vitest для react-ui v5.x, где модуль не существует.
 * Динамический import() в useSizeContext.ts получит этот модуль,
 * проверит отсутствие SizeControlContext и useSizeContext,
 * и вернёт null, эмулируя поведение при catch.
 *
 * Для react-ui v5.4.0+ этот файл не используется — резолвится реальный модуль.
 */

export {};
