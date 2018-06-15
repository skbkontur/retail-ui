
let calledLoad = false;

export default {
  init() {
    const loadWidget = () => {
      if (calledLoad) {
        return;
      }
      calledLoad = true;

      const script = document.createElement('script');
      script.src =
        'https://widget-product.kontur.ru/widget/loader?' +
        'product=&type=service';
      document.getElementsByTagName('head')[0].appendChild(script);
    };

    if (global.jQuery) {
      loadWidget();
    } else {
      const jquery = document.createElement('script');
      jquery.onload = loadWidget;
      jquery.onreadystatechange = function() {
        if (this.readyState === 'loaded' || this.readyState === 'complete') {
          loadWidget();
        }
      };
      jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
      document.getElementsByTagName('head')[0].appendChild(jquery);
    }
  }
};
