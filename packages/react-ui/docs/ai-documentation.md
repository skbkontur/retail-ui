# Machine-readable documentation

The published Storybook includes a machine-readable representation of the
`@skbkontur/react-ui` documentation. It is generated from the same TypeScript,
MDX, and stories that power the interactive documentation.

## Published files

- `llms.txt` — a compact index of guides and components;
- `llms-full.txt` — the complete text corpus;
- `llms-components.txt` — a component-only corpus;
- `llms-guides.txt` — a guide-only corpus;
- `docs/components/*.md` — one Markdown document per component;
- `docs/guides/*.md` — one Markdown document per guide;
- `api/components.json` — a versioned JSON component index;
- `api/components/*.json` — structured API data for individual components;
- `sitemap.xml` and `robots.txt` — crawler discovery files.

Links between documented components are rewritten to direct Markdown URLs when
the target is known. Storybook remains linked from each page as the interactive
playground, but an agent can traverse the documentation without rendering the
Storybook application.

The package version is read from `package.json`. Public prop names, types,
defaults, and descriptions are extracted by the TypeScript compiler through
`react-docgen-typescript`. Component guidance comes from MDX and examples come
from the component's documentation stories.

## Local generation

Build the regular documentation and all machine-readable files:

```bash
yarn workspace @skbkontur/react-ui storybook:docs-build
```

To regenerate only the machine-readable files after Storybook has created its
output directory:

```bash
yarn workspace @skbkontur/react-ui docs:generate-ai
```

For inspection without changing the Storybook build, pass a temporary output
directory directly to the generator:

```bash
node packages/react-ui/scripts/generate-ai-docs.mts --strict --output /tmp/react-ui-ai-docs
```

Generation is strict in CI. A documented component without a description or a
TypeScript-derived prop API fails the build instead of silently publishing an
incomplete page.
