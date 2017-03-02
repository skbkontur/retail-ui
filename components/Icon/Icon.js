// @flow
import React, { PropTypes } from 'react';

import styles from './Icon.less';

var MAP = {
  'error': '\ue004',
  'warning': '\ue005',
  'ok': '\ue006',
  'star': '\ue007',
  'star-o': '\ue09d',
  'fired': '\ue008',
  'cert': '\ue00a',
  'smile': '\ue00b',
  'sad': '\ue00c',
  'thumbs-up': '\ue073',
  'thumbs-down': '\ue074',
  'wait': '\ue021',
  'opened': '\ue02d',
  'closed': '\ue02e',
  'bell': '\ue06c',

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

  'arrow-up-right': '\ue088',
  'arrow-down-right': '\ue089',
  'arrow-down-left': '\ue08a',
  'arrow-up-left': '\ue08b',
  'maximize': '\ue085',
  'minimize': '\ue086',
  'drag': '\ue0c8',

  'enter': '\ue098',

  'ellipsis': '\ue048',
  'sort': '\ue049',

  'circle': '\ue001',
  'circle-o': '\ue082',
  'circle-o-dotted': '\ue099',
  'circle-small': '\ue068',
  'circle-small-o': '\ue083',
  'cloud': '\ue002',
  'android': '\ue06a',
  'baseline': '\ue003',
  'grid': '\ue03e',

  'add': '\ue00d',
  'remove': '\ue00e',
  'minus': '\ue01e',
  'edit': '\ue00f',
  'copy': '\ue097',
  'search': '\ue009',
  'comp': '\ue069',
  'print': '\ue010',
  'envelop': '\ue011',
  'envelop-o': '\ue078',
  'mail-in': '\ue079',
  'mail-out': '\ue07a',
  'send-o': '\ue095',
  'send': '\ue096',
  'fx': '\ue036',
  'calendar': '\ue023',
  'undo': '\ue012',
  'redo': '\ue09c',
  'forward': '\ue013',
  'backward': '\ue014',
  'sum': '\ue02a',
  'card': '\ue019',
  'import': '\ue01a',
  'export': '\ue027',
  'cart': '\ue07c',
  'cart-o': '\ue07b',
  'shipment': '\ue02b',
  'clear': '\ue030',
  'refresh': '\ue029',
  'new-window': '\ue061',
  'link': '\ue062',
  'marker': '\ue075',
  'archive': '\ue076',
  'unarchive': '\ue077',
  'child': '\ue094',
  'vacation': '\ue09a',
  'sick': '\ue09b',
  'shop-cashregister': '\ue0C5',
  'shop-receipt': '\ue0C6',

  'play-forward': '\ue050',
  'play-backward': '\ue051',
  'right': '\ue052',
  'left': '\ue053',

  'list': '\ue01b',
  'groups': '\ue01c',
  'gear': '\ue018',
  'tag': '\ue016',
  'video': '\ue017',
  'menu': '\ue01d',
  'user': '\ue020',
  'user-gear': '\ue05b',
  'people': '\ue093',
  'trash': '\ue022',
  'upload': '\ue02c',
  'download': '\ue015',
  'help': '\ue037',
  'help-o': '\ue038',
  'help-circle': '\ue055',
  'info': '\ue06f',
  'login': '\ue067',
  'logout': '\ue039',
  'home': '\ue05c',
  'hourglass': '\ue071',
  'comment-o': '\ue054',
  'comment': '\ue05d',

  'eye-slash': '\ue043',
  'eye': '\ue044',
  'infinity': '\ue03f',
  'map-pin': '\ue04e',
  'pin': '\ue06b',
  'clip': '\ue045',
  'money': '\ue046',
  'coins': '\ue05a',
  'stats': '\ue047',
  'filter': '\ue060',
  'bulb': '\ue06e',
  'heart': '\ue070',
  'font-size': '\ue084',
  'flag': '\ue081',
  'flag-o': '\ue080',
  'services': '\ue07d',
  'suitcase': '\ue07e',

  'doc': '\ue024',
  'doc-o': '\ue087',
  'doc-group': '\ue02f',
  'doc-auto': '\ue05f',
  'doc-revise': '\ue07f',
  'doc-new': '\ue025',
  'doc-duplicate': '\ue026',
  'doc-convert': '\ue0b9',
  'folder': '\ue028',
  'doc-doc': '\ue031',
  'doc-rtf': '\ue064',
  'doc-pdf': '\ue032',
  'doc-txt': '\ue033',
  'doc-xls': '\ue034',
  'doc-xml': '\ue035',

  'phone': '\ue03b',
  'phone-o': '\ue091',
  'vk': '\ue03d',
  'vk-o': '\ue08c',
  'odnoklassniki': '\ue056',
  'odnoklassniki-o': '\ue08f',
  'facebook': '\ue03a',
  'facebook-o': '\ue08d',
  'twitter': '\ue03c',
  'twitter-o': '\ue08e',
  'google-plus': '\ue063',
  'google-plus-o': '\ue090',
  'youtube': '\ue057',
  'instagram': '\ue072',
  'rss': '\ue05e',
  'rss-o': '\ue092',
  'ruble': '\u20bd',

  // 11.08.2016
  'apple': '\ue0c0',
  'windows': '\ue0c1',
  'car': '\ue0c2',
  'boat': '\ue0c3',
  'document-declined': '\ue0c4',
  'cash': '\ue0c5',
  'cash receipt': '\ue0c6',

  // 12.09.2016
  'smartphone': '\ue0c7',

  // 7.10.2016
  'kebab': '\ue0c9',

  // 3.11.2016
  'comment-add': '\ue0ca',
  'shutter': '\ue0cb',
  'smartphone-slash': '\ue0cc',
  'telegram': '\ue0cd',
  'telegram-o': '\ue0ce'
};

class Icon extends React.Component {
  static propTypes = {
    color: PropTypes.string,

    /**
     * Icon id.
     */
    name: PropTypes.oneOf(Object.keys(MAP)),

    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  static getAllNames = function() {
    return Object.keys(MAP);
  };

  render() {
    var style = {
      color: this.props.color,
      fontSize: this.props.size
    };
    return (
      <span className={styles.root} style={style}>{MAP[this.props.name]}</span>
    );
  }
}

module.exports = Icon;
