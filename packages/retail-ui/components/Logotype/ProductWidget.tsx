let calledLoad = false;

export default {
  init() {
    const loadWidget = () => {
      if (calledLoad) {
        return;
      }
      calledLoad = true;

      const script = document.createElement('script');
      script.src = 'https://widget-product.kontur.ru/widget/loader?' + 'product=&type=service';
      setTimeout(() => document.getElementsByTagName('head')[0].appendChild(script));
    };

    if (window.jQuery) {
      loadWidget();
    } else {
      const jquery = document.createElement('script');
      jquery.onload = loadWidget;
      // @ts-ignore
      jquery.onreadystatechange = function() {
        // @ts-ignore
        if (this.readyState === 'loaded' || this.readyState === 'complete') {
          loadWidget();
        }
      };
      jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
      document.getElementsByTagName('head')[0].appendChild(jquery);
    }
  },
};
