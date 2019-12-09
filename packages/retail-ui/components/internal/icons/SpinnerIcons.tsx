export const CircleIcon = ({ strokeClassName }: { strokeClassName: string }) => (
  <svg width="16" height="16">
    <circle cx="8" cy="8" r="6" strokeWidth="1.5" className={strokeClassName} />
  </svg>
);

const CLOUD_SVG_PATH = `M32.0297086,9.1495774 L31.5978628,8.5870774 C29.3570968,
      5.67148577 25.9305165,4 22.1999329,4 C17.3429265,
      4 12.9026663,7.04270463 11.154144,11.5717304 L10.901479,
      12.2253114 L10.2421341,12.4725311 C6.50853057,13.8727758 4,
      17.4719751 4,21.428492 C4,26.7061833 8.32047079,
      31 13.6314689,31 L32.0297086,31 C38.078569,31 43,26.1036477 43,
      20.0862989 C43,14.3602091 38.493302,9.5769573 32.7403918,
      9.19661922 L32.0297086,9.1495774 Z`;

const CLOUD_SIZE_MAP = {
  normal: {
    height: 35,
    width: 47,
    viewBox: undefined,
    strokeWidth: 2,
  },
  big: {
    height: 70,
    width: 94,
    viewBox: '0 0 47 35',
    strokeWidth: 2,
  },
};

export const CloudIcon = ({
  size,
  bgClassName,
  strokeClassName,
}: {
  size: 'normal' | 'big';
  bgClassName: string;
  strokeClassName: string;
}) => {
  const params = CLOUD_SIZE_MAP[size];
  return (
    <svg width={params.width} height={params.height} viewBox={params.viewBox}>
      <path d={CLOUD_SVG_PATH} strokeWidth={params.strokeWidth} className={bgClassName} />
      <path d={CLOUD_SVG_PATH} strokeWidth={params.strokeWidth} className={strokeClassName} />
    </svg>
  );
};
