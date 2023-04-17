import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import DefaultSectionHeadingRenderer from 'react-styleguidist/lib/client/rsg-components/SectionHeading/SectionHeadingRenderer';

const styles = () => ({
	// Just default jss-isolate rules
	root: {},
});

/**
 * Измененный компонент SectionHeadingRenderer, в который добавлена Контур Метрика
 */

export function SectionHeadingRenderer({
	classes,
	children,
	toolbar,
	id,
	href,
	depth,
	deprecated,
}) {

    window.infra_frontTracker.trackPageVisit(children);

    return (
		  <div>
        <DefaultSectionHeadingRenderer
	        id={id}
	        href={href}
	        depth={depth}
	        deprecated={deprecated}
				>
            {children}
        </DefaultSectionHeadingRenderer>
      </div>
	  );
}

SectionHeadingRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	children: PropTypes.any,
	toolbar: PropTypes.any,
	id: PropTypes.string.isRequired,
	href: PropTypes.string,
	depth: PropTypes.number.isRequired,
	deprecated: PropTypes.bool,
};

export default Styled(styles)(SectionHeadingRenderer);
