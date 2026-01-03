import type { Page } from 'playwright-core';

export const tid = (tid: string) => `[data-tid~="${tid}"]`;

/**
 * Ожидает появления элемента по data-tid
 * @param page - страница
 * @param tidName - имя data-tid
 *
 * @example await waitForByTid(page, 'PopupContent');
 */
export const waitForByTid = async (page: Page, tidName: string) => {
  await page.locator(tid(tidName)).waitFor();
};

/**
 * Ожидает появления попапа
 * @param page - страница
 *
 */
export const waitForPopup = async (page: Page) => {
  await page.locator(tid('PopupContent')).waitFor();
};
