let calledLoad = false;

export const ProductWidget = {
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

    loadWidget();    
  },
};
