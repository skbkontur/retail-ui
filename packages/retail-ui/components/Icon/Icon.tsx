import warning from 'warning';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as Icons from '@skbkontur/react-icons';

const old2newIcons: { [key: string]: IconName } = {
  error: 'Error',
  warning: 'Warning',
  ok: 'Ok',
  star: 'Star',
  'star-o': 'Star2',
  fired: 'Fired',
  cert: 'Certificate',
  smile: 'EmoticonHappy',
  sad: 'EmoticonSad',
  'thumbs-up': 'ThumbUp',
  'thumbs-down': 'ThumbDown',
  wait: 'Clock',
  opened: 'LockOpened',
  closed: 'LockClosed',
  bell: 'NotificationBell',
  'up-down': 'ArrowParallelVertical',
  'right-left': 'ArrowParallelHorizontal',
  'arrow-top': 'ArrowBoldUp',
  'arrow-right': 'ArrowBoldRight',
  'arrow-bottom': 'ArrowBoldDown',
  'arrow-left': 'ArrowBoldLeft',
  'caret-top': 'ArrowTriangleUp',
  'caret-right': 'ArrowTriangleRight',
  'caret-bottom': 'ArrowTriangleDown',
  'caret-left': 'ArrowTriangleLeft',
  'angle-top': 'ArrowChevronUp',
  'angle-right': 'ArrowChevronRight',
  'angle-bottom': 'ArrowChevronDown',
  'angle-left': 'ArrowChevronLeft',
  'arrow-up-right': 'ArrowSize1',
  'arrow-down-right': 'ArrowSize2',
  'arrow-down-left': 'ArrowSize3',
  'arrow-up-left': 'ArrowSize4',
  maximize: 'ArrowSizeMax',
  minimize: 'ArrowSizeMin',
  drag: 'ArrowDrag',
  enter: 'ArrowCorner1',
  ellipsis: 'MenuDots',
  sort: 'ArrowTriangleUpDown',
  circle: 'Dot12',
  'circle-o': 'Dot12Lite',
  'circle-o-dotted': 'Dot12Dashed',
  'circle-small': 'Dot8',
  'circle-small-o': 'Dot8Lite',
  cloud: 'Cloud',
  android: 'Android',
  baseline: 'Baseline',
  grid: 'Grid',
  add: 'Add',
  remove: 'Delete',
  minus: 'Remove',
  edit: 'Edit',
  copy: 'Copy',
  search: 'Search',
  comp: 'PC',
  print: 'Print',
  envelop: 'Mail',
  'envelop-o': 'Mail2',
  'mail-in': 'Mail2In',
  'mail-out': 'Mail2Out',
  'send-o': 'Send',
  send: 'Send2',
  fx: 'Function',
  calendar: 'Calendar',
  undo: 'Undo',
  redo: 'Redo',
  forward: 'ArrowChevron2Right',
  backward: 'ArrowChevron2Left',
  sum: 'Sum',
  card: 'Card',
  import: 'Import',
  export: 'Export',
  cart: 'ShoppingCartSolid',
  'cart-o': 'ShoppingCartLite',
  shipment: 'Shipment',
  clear: 'Clear',
  refresh: 'Refresh',
  'new-window': 'NewWindow',
  link: 'Link',
  marker: 'Marker',
  archive: 'ArchivePack',
  unarchive: 'ArchiveUnpack',
  child: 'Baby',
  vacation: 'Vacation',
  sick: 'Medical',
  'shop-cashregister': 'ShopCashregister',
  'shop-receipt': 'ShopReceipt',
  'play-forward': 'Forward',
  'play-backward': 'Backward',
  right: 'Reply',
  left: 'Skip',
  list: 'ListRows',
  groups: 'ListGroup',
  gear: 'Settings',
  tag: 'Tag',
  video: 'Video',
  menu: 'Menu',
  user: 'User',
  'user-gear': 'UserSettings',
  people: 'People',
  trash: 'Trash',
  upload: 'Upload',
  download: 'Download',
  help: 'HelpBook',
  'help-o': 'HelpLite',
  'help-circle': 'HelpDot',
  info: 'Info',
  login: 'Login',
  logout: 'Logout',
  home: 'Home',
  hourglass: 'Loading',
  'comment-o': 'CommentLite',
  comment: 'CommentSolid',
  'eye-slash': 'EyeClosed',
  eye: 'EyeOpened',
  infinity: 'Infiniti',
  'map-pin': 'MapPin',
  pin: 'Pin',
  clip: 'Attach',
  money: 'Coin',
  coins: 'Coins',
  stats: 'Statistic',
  filter: 'Filter',
  bulb: 'Lightbulb',
  heart: 'Heart',
  'font-size': 'FontSize',
  flag: 'FlagSolid',
  'flag-o': 'FlagLite',
  services: 'Handshake',
  suitcase: 'Briefcase',
  doc: 'DocumentSolid',
  'doc-o': 'DocumentLite',
  'doc-group': 'DocumentGroup',
  'doc-auto': 'DocumentRefresh',
  'doc-revise': 'DocumentCheck',
  'doc-new': 'DocumentAdd',
  'doc-duplicate': 'DocumentCopy',
  'doc-convert': 'DocumentConvert',
  folder: 'DocumentFolder',
  'doc-doc': 'DocumentTypeDoc',
  'doc-rtf': 'DocumentTypeRtf',
  'doc-pdf': 'DocumentTypePdf',
  'doc-txt': 'DocumentTypeTxt',
  'doc-xls': 'DocumentTypeXls',
  'doc-xml': 'DocumentTypeXml',
  phone: 'Phone',
  'phone-o': 'Phone2',
  vk: 'Vkontakte',
  'vk-o': 'Vkontakte2',
  odnoklassniki: 'Odnoklassniki',
  'odnoklassniki-o': 'Odnoklassniki2',
  facebook: 'Facebook',
  'facebook-o': 'Facebook2',
  twitter: 'Twitter',
  'twitter-o': 'Twitter2',
  'google-plus': 'GooglePlus',
  'google-plus-o': 'GooglePlus2',
  youtube: 'Youtube',
  instagram: 'Instagram',
  rss: 'Rss',
  'rss-o': 'Rss2',
  ruble: 'Ruble',
  apple: 'Apple',
  windows: 'Windows',
  car: 'OwnershipCar',
  boat: 'OwnershipBoat',
  'document-declined': 'DocumentCheck2',
  cash: 'ShopCashregister',
  'cash receipt': 'ShopReceipt',
  smartphone: 'DeviceSmartphone',
  kebab: 'MenuKebab',
  'comment-add': 'CommentLiteAdd',
  shutter: 'ArrowTriangleUpDown2',
  'smartphone-slash': 'DeviceSmartphoneNo',
  telegram: 'Telegram',
  'telegram-o': 'Telegram2',
  'heart-o': 'HeartLite',
  office: 'HomeOffice',
  'arrows-h-aside': 'ArrowTriangleUpDown3',
  'arrows-h-inside': 'ArrowTriangleUpDown4',
  'tree-structure': 'StructureTree',
  calculator: 'Calculator',
  key: 'Key',
  'ok-double': 'OkDouble',
  'flash-drive': 'USB',
  'send-h': 'Send3'
};

export type IconName = keyof typeof Icons;

function getNewIconName(name: string): IconName | undefined {
  return old2newIcons[name];
}

export interface IconProps {
  color?: string;
  name: IconName;
  size?: number | string;
}

class Icon extends React.Component<IconProps> {
  public static propTypes = {
    color: PropTypes.string,

    /**
     * Icon id.
     */
    name: PropTypes.oneOf(Object.keys(Icons).concat(Object.keys(old2newIcons))),

    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  public static Names = Object.keys(Icons).reduce(
    (acc, x) => ({ ...acc, [x]: x }),
    {}
  );

  public static getAllNames = () => Object.keys(Icons) as IconName[];

  constructor(props: IconProps) {
    super(props);
    if (process.env.NODE_ENV !== 'production') {
      this.checkDeprecatedName(props);
    }
  }

  public componentWillReceiveProps(props: IconProps) {
    if (
      process.env.NODE_ENV !== 'production' &&
      this.props.name !== props.name
    ) {
      this.checkDeprecatedName(props);
    }
  }

  public render(): JSX.Element {
    const { name, ...restProps } = this.props;
    const newName = getNewIconName(name);
    let SvgIcon = null;
    if (name in Icons) {
      SvgIcon = Icons[name];
    } else if (newName !== undefined) {
      SvgIcon = Icons[newName];
    }
    // TODO Throw error?
    if (SvgIcon == null) {
      return <span />;
    }
    return <SvgIcon {...restProps} />;
  }

  private checkDeprecatedName(props: IconProps) {
    const newName = getNewIconName(props.name);
    warning(
      props.name in Icons && !newName,
      `Icon name "${props.name}" is depricated, ` + `use "${newName}" instead`
    );
  }
}

export default Icon;
