import { DOMAttributes, FC } from 'react';
import { defineKonturIcon } from '@skbkontur/experiments';

type CustomElement<T> = Partial<T & DOMAttributes<T>>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      ["kontur-icon-alt"]: CustomElement<{
        name: string;
        color: string;
        size: string;
        type: string;
        iconUrl: string;
      }>;
    }
  }
}

defineKonturIcon();

export const ExperimentsPage: FC = () => (
  <div>
    <kontur-icon-alt color="currentcolor" name="calendar" size="16" type="solid"></kontur-icon-alt>
    <kontur-icon-alt color="#00f100" name="arrow-a-down" size="16" type="regular"></kontur-icon-alt>
    <kontur-icon-alt color="#00f100" name="arrow-a-down" size="16" type="regular"></kontur-icon-alt>
    <kontur-icon-alt
      color="#00f1ddf0"
      iconUrl="https://s.kontur.ru/common-v2/icons-ui/black/animal-paw/animal-paw-16-regular.svg"
      size="16"
    ></kontur-icon-alt>
  </div>
);
