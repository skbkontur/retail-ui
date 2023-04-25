import React from 'react';
import DefaultSectionHeadingRenderer from 'react-styleguidist/lib/client/rsg-components/SectionHeading/SectionHeadingRenderer';

declare global {
  var infra_frontTracker: any;
}

/**
 * Измененный компонент SectionHeadingRenderer, в который добавлена Контур Метрика
 */

export const SectionHeadingRenderer: typeof DefaultSectionHeadingRenderer = (props) => {
  const { children } = props;

  React.useEffect(() => {
    window.infra_frontTracker.trackPageVisit(children);
  }, [children]);

  return <DefaultSectionHeadingRenderer {...props} />;
};

export default SectionHeadingRenderer;
