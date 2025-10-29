import type { Page } from 'playwright-core';

export const tid = (tid: string) => `[data-tid~="${tid}"]`;

export const waitForByTid = async (page: Page, tidName: string) => {
  await page.locator(tid(tidName)).waitFor();
};
