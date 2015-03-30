var React = require('react');

require('./Icon.less');
var cx = require('../cx')('RTIcon');

var MAP = {
  error: '\ue004',
  warning: '\ue005',
  ok: '\ue006',
  star: '\ue007',
  fired: '\ue008',
  cert: '\ue00a',
  smile: '\ue00b',
  sad: '\ue00c',
  'thumbs-up': '\ue073',
  'thumbs-down': '\ue074',
  wait: '\ue021',
  opened: '\ue02d',
  closed: '\ue02e',
  bell: '\ue06c',

  'up-down': '\ue01f',
  'right-left': '\ue06d',

  'arrow-top': '\ue042',
  'arrow-right': '\ue041',
  'arrow-bottom': '\ue040',
  'arrow-left': '\ue04f',

  'caret-top': '\ue04d',
  'caret-right': '\ue04a',
  'caret-bottom': '\ue04c',
  'caret-left': '\ue04b',

  'angle-top': '\ue059',
  'angle-right': '\ue066',
  'angle-bottom': '\ue058',
  'angle-left': '\ue065',

  ellipsis: '\ue048',
  sort: '\ue049',

  circle: '\ue001',
  'circle-small': '\ue068',
  cloud: '\ue002',
  android: '\ue06a',
  baseline: '\ue003',
  grid: '\ue03e',

  add: '\ue00d',
  remove: '\ue00e',
  minus: '\ue01e',
  edit: '\ue00f',
  search: '\ue009',
  comp: '\ue069',
  print: '\ue010',
  envelop: '\ue011',
  'envelop-o': '\ue078',
  'mail-in': '\ue079',
  'mail-out': '\ue07a',
  fx: '\ue036',
  calendar: '\ue023',
  undo: '\ue012',
  forward: '\ue013',
  backward: '\ue014',
  sum: '\ue02a',
  card: '\ue019',
  import: '\ue01a',
  export: '\ue027',
  shipment: '\ue02b',
  clear: '\ue030',
  refresh: '\ue029',
  'new-window': '\ue061',
  link: '\ue062',
  marker: '\ue075',
  archive: '\ue076',
  unarchive: '\ue077',

  'play-forward': '\ue050',
  'play-backward': '\ue051',
  right: '\ue052',
  left: '\ue053',

  list: '\ue01b',
  groups: '\ue01c',
  gear: '\ue018',
  tag: '\ue016',
  video: '\ue017',
  menu: '\ue01d',
  user: '\ue020',
  'user-gear': '\ue05b',
  trash: '\ue022',
  upload: '\ue02c',
  download: '\ue015',
  help: '\ue037',
  'help-o': '\ue038',
  'help-circle': '\ue055',
  info: '\ue06f',
  login: '\ue067',
  logout: '\ue039',
  home: '\ue05c',
  hourglass: '\ue071',
  'comment-o': '\ue054',
  comment: '\ue05d',

  'eye-slash': '\ue043',
  eye: '\ue044',
  infinity: '\ue03f',
  'map-pin': '\ue04e',
  pin: '\ue06b',
  clip: '\ue045',
  money: '\ue046',
  coins: '\ue05a',
  stats: '\ue047',
  filter: '\ue060',
  bulb: '\ue06e',
  heart: '\ue070',

  doc: '\ue024',
  'doc-group': '\ue02f',
  'doc-auto': '\ue05f',
  'doc-new': '\ue025',
  'doc-duplicate': '\ue026',
  folder: '\ue028',
  'doc-doc': '\ue031',
  'doc-rtf': '\ue064',
  'doc-pdf': '\ue032',
  'doc-txt': '\ue033',
  'doc-xls': '\ue034',
  'doc-xml': '\ue035',

  phone: '\ue03b',
  vk: '\ue03d',
  odnoklassniki: '\ue056',
  facebook: '\ue03a',
  twitter: '\ue03c',
  'google-plus': '\ue063',
  youtube: '\ue057',
  instagram: '\ue072',
  rss: '\ue05e'
};

var Icon = React.createClass({
  statics: {
    getAllNames() {
      return Object.keys(MAP);
    }
  },

  propTypes: {
    /**
     * Icon id.
     */
    name: React.PropTypes.string.isRequired,
  },

  render() {
    return (
      <span className={cx('')}>{MAP[this.props.name]}</span>
    );
  }
});

module.exports = Icon;
