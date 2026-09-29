/**
 * This implementation is informed by publicly available work on perceptual text
 * contrast and the historical W3C WCAG 3 Working Draft (7 December 2021):
 *
 * https://www.w3.org/TR/2021/WD-wcag-3.0-20211207/#visual-contrast-of-text
 */
import { converter } from 'culori';

const luminanceWeights = [0.2126729, 0.7151522, 0.072175] as const;
const toRgb = converter('rgb');
const toByte = (channel: number): number => Math.min(255, Math.max(0, Math.round(channel * 255)));

function getColorLuminance(color: string): number {
  const rgb = toRgb(color);
  return rgb ? getLuminance([toByte(rgb.r), toByte(rgb.g), toByte(rgb.b)]) : 0;
}

export function calcContrast(textColor: string, backgroundColor: string): number {
  return getContrast(getColorLuminance(textColor), getColorLuminance(backgroundColor));
}

export function getLuminance(channels: readonly [number, number, number]): number {
  const luminance = channels.reduce((sum, channel, index) => sum + luminanceWeights[index] * (channel / 255) ** 2.4, 0);
  return Math.min(1, luminance);
}

function softenBlack(luminance: number): number {
  return luminance + Math.max(0, 0.022 - luminance) ** 1.414;
}

export function getContrast(textLuminance: number, backgroundLuminance: number): number {
  if (
    !Number.isFinite(textLuminance) ||
    !Number.isFinite(backgroundLuminance) ||
    textLuminance < 0 ||
    textLuminance > 1 ||
    backgroundLuminance < 0 ||
    backgroundLuminance > 1
  ) {
    return 0;
  }

  const text = softenBlack(textLuminance);
  const background = softenBlack(backgroundLuminance);
  const difference = background - text;
  const darkText = difference > 0;
  const textPower = darkText ? 0.57 : 0.62;
  const backgroundPower = darkText ? 0.56 : 0.65;
  const scaledDifference = (background ** backgroundPower - text ** textPower) * 1.14;
  const direction = darkText ? 1 : -1;
  const magnitude = scaledDifference * direction;

  return magnitude < 0.1 ? 0 : direction * (magnitude - 0.027) * 100;
}
