import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import docgen from 'react-docgen-typescript';
import ts from 'typescript';

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const packageDirectory = join(currentDirectory, '..');
const componentsDirectory = join(packageDirectory, 'components');
const guidesDirectory = join(packageDirectory, '.storybook-docs', 'docsPages');
const packageJsonPath = join(packageDirectory, 'package.json');
const defaultOutputDirectory = join(packageDirectory, '.storybook', 'build');
const siteBaseUrl = 'https://tech.skbkontur.ru/kontur-ui';

interface PropDocumentation {
  name: string;
  description: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  source?: string;
}

interface ExampleDocumentation {
  name: string;
  title: string;
  description: string;
  code: string;
}

interface ComponentDocumentation {
  name: string;
  slug: string;
  description: string;
  importStatement: string;
  storybookUrl: string;
  sourcePath: string;
  markdown: string;
  props: PropDocumentation[];
  examples: ExampleDocumentation[];
}

interface GuideDocumentation {
  name: string;
  slug: string;
  markdown: string;
}

interface GeneratorOptions {
  outputDirectory: string;
  strict: boolean;
}

function parseArguments(): GeneratorOptions {
  const outputArgumentIndex = process.argv.indexOf('--output');
  const outputDirectory =
    outputArgumentIndex >= 0 && process.argv[outputArgumentIndex + 1]
      ? resolve(process.cwd(), process.argv[outputArgumentIndex + 1])
      : defaultOutputDirectory;

  return {
    outputDirectory,
    strict: process.argv.includes('--strict'),
  };
}

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, 'utf8')) as T;
}

function toPosixPath(path: string): string {
  return path.replaceAll('\\', '/');
}

function toSlug(value: string): string {
  // Keep the URLs introduced by the first llms.txt deployment stable.
  return value.replace(/[^a-zA-Z\d]+/g, '').toLowerCase();
}

function cleanMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\w-]*\s*\n```/g, '')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Remove Storybook-only MDX imports and blocks while retaining ordinary Markdown and code fences. */
function stripMdxComponents(content: string): string {
  const result: string[] = [];
  let inCodeFence = false;
  let skippedJsxDepth = 0;

  for (const line of content.split('\n')) {
    if (/^\s*```/.test(line)) {
      inCodeFence = !inCodeFence;
      result.push(line);
      continue;
    }

    if (inCodeFence) {
      result.push(line);
      continue;
    }

    if (/^import\s/.test(line)) {
      continue;
    }

    if (/^\s*<PropsTable(?:\s|\/|>)/.test(line)) {
      result.push('<!-- AI_PROPS -->');
      continue;
    }

    if (/^\s*<Stories(?:\s|\/|>)/.test(line)) {
      result.push('<!-- AI_EXAMPLES -->');
      continue;
    }

    if (skippedJsxDepth > 0) {
      if (/^\s*<[A-Z][\w.]*(?:\s|>|$)/.test(line) && !line.includes('/>') && !/<\/[A-Z]/.test(line)) {
        skippedJsxDepth++;
      }
      if (line.includes('/>') || /<\/[A-Z]/.test(line)) {
        skippedJsxDepth--;
      }
      continue;
    }

    if (/^\s*<[A-Z][\w.]*(?:\s[^>]*)?\s*\/>\s*$/.test(line)) {
      continue;
    }

    if (/^\s*<[A-Z][\w.]*(?:\s|>|$)/.test(line)) {
      if (!/<\/[A-Z]/.test(line)) {
        skippedJsxDepth = 1;
      }
      continue;
    }

    if (/^\s*<\/[A-Z][\w.]*>\s*$/.test(line)) {
      continue;
    }

    result.push(line);
  }

  return cleanMarkdown(result.join('\n'));
}

function getStoryTitle(storiesPath: string): string {
  if (!existsSync(storiesPath)) {
    return '';
  }

  return readFileSync(storiesPath, 'utf8').match(/\btitle:\s*['"]([^'"]+)['"]/)?.[1] ?? '';
}

function getPublishedBaseUrl(version: string): string {
  return `${siteBaseUrl}/packages/react-ui/${version}`;
}

function getStorybookUrl(publishedBaseUrl: string, storyTitle: string, componentName: string): string {
  const storyId = storyTitle
    ? `react-ui_${storyTitle
        .toLowerCase()
        .replace(/[^a-z\d]+/g, '-')
        .replace(/^-|-$/g, '')}--docs`
    : `react-ui_${componentName.toLowerCase()}--docs`;

  return `${publishedBaseUrl}/?path=/docs/${storyId}`;
}

function findComponentSource(componentDirectory: string, componentName: string): string | undefined {
  const candidates = [join(componentDirectory, `${componentName}.tsx`), join(componentDirectory, 'index.tsx')];
  return candidates.find(existsSync);
}

function formatDocgenType(prop: { type: { name: string; value?: Array<{ value: string }> } }): string {
  if (prop.type.name !== 'enum' || !prop.type.value?.length) {
    return prop.type.name;
  }

  return prop.type.value.map(({ value }) => value).join(' | ');
}

function relativeToPackage(path: string): string {
  const normalizedPath = toPosixPath(path);
  const packageMarker = 'packages/react-ui/';
  const packageMarkerIndex = normalizedPath.lastIndexOf(packageMarker);
  if (packageMarkerIndex >= 0) {
    return normalizedPath.slice(packageMarkerIndex + packageMarker.length);
  }

  return toPosixPath(relative(packageDirectory, path));
}

const propsParser = docgen.withCompilerOptions(
  {
    allowJs: true,
    esModuleInterop: true,
    jsx: ts.JsxEmit.React,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    skipLibCheck: true,
    target: ts.ScriptTarget.ES2021,
  },
  {
    savePropValueAsString: true,
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
    propFilter: (prop) => {
      return (
        Boolean(prop.description) &&
        !prop.description.includes('@ignore') &&
        !prop.parent?.fileName.includes('node_modules')
      );
    },
  },
);

interface ComponentApi {
  description: string;
  props: PropDocumentation[];
}

function extractComponentApis(sourcePaths: string[]): Map<string, ComponentApi> {
  const result = new Map<string, ComponentApi>();

  for (const component of propsParser.parse(sourcePaths)) {
    const props = Object.values(component.props).map((prop) => ({
      name: prop.name,
      description: prop.description.trim(),
      type: formatDocgenType(prop),
      required: prop.required,
      defaultValue: prop.defaultValue?.value,
      source: prop.parent?.fileName ? relativeToPackage(prop.parent.fileName) : undefined,
    }));

    result.set(component.displayName, { description: component.description.trim(), props });
  }

  return result;
}

function getLeadingJsDoc(source: string, node: ts.Node): string {
  const prefix = source.slice(node.getFullStart(), node.getStart());
  const match = prefix.match(/\/\*\*([\s\S]*?)\*\/\s*$/);
  if (!match) {
    return '';
  }

  return match[1]
    .split('\n')
    .map((line) => line.replace(/^\s*\*\s?/, '').trim())
    .filter(Boolean)
    .join('\n');
}

function extractExamples(storiesPath: string): ExampleDocumentation[] {
  if (!existsSync(storiesPath)) {
    return [];
  }

  const source = readFileSync(storiesPath, 'utf8');
  const sourceFile = ts.createSourceFile(storiesPath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const titles = new Map<string, string>();

  for (const match of source.matchAll(/^(\w+)\.storyName\s*=\s*['"]([^'"]+)['"];?/gm)) {
    titles.set(match[1], match[2]);
  }

  const examples: ExampleDocumentation[] = [];
  for (const statement of sourceFile.statements) {
    if (
      !ts.isVariableStatement(statement) ||
      !statement.modifiers?.some(({ kind }) => kind === ts.SyntaxKind.ExportKeyword)
    ) {
      continue;
    }

    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || !declaration.name.text.startsWith('Example')) {
        continue;
      }

      const initializer = declaration.initializer;
      if (!initializer || (!ts.isArrowFunction(initializer) && !ts.isFunctionExpression(initializer))) {
        continue;
      }

      const code = ts.isBlock(initializer.body)
        ? initializer.body.statements.map((child) => child.getText(sourceFile)).join('\n')
        : `return ${initializer.body.getText(sourceFile)};`;

      examples.push({
        name: declaration.name.text,
        title: titles.get(declaration.name.text) ?? declaration.name.text,
        description: getLeadingJsDoc(source, statement),
        code,
      });
    }
  }

  return examples;
}

function createComponentDocumentation(
  componentName: string,
  componentApis: Map<string, ComponentApi>,
  publishedBaseUrl: string,
): ComponentDocumentation | undefined {
  const componentDirectory = join(componentsDirectory, componentName);
  const documentationPath = join(componentDirectory, '__docs__', `${componentName}.mdx`);
  if (!existsSync(documentationPath)) {
    return undefined;
  }

  const sourcePath = findComponentSource(componentDirectory, componentName);
  if (!sourcePath) {
    return undefined;
  }

  const storiesPath = join(componentDirectory, '__docs__', `${componentName}.docs.stories.tsx`);
  const { description, props } = componentApis.get(componentName) ?? { description: '', props: [] };

  return {
    name: componentName,
    slug: toSlug(componentName),
    description,
    importStatement: `import { ${componentName} } from '@skbkontur/react-ui';`,
    storybookUrl: getStorybookUrl(publishedBaseUrl, getStoryTitle(storiesPath), componentName),
    sourcePath: toPosixPath(relative(packageDirectory, sourcePath)),
    markdown: stripMdxComponents(readFileSync(documentationPath, 'utf8')),
    props,
    examples: extractExamples(storiesPath),
  };
}

function readGuides(): GuideDocumentation[] {
  const guides: GuideDocumentation[] = [];

  function walk(directory: string): void {
    for (const entry of readdirSync(directory).sort()) {
      const path = join(directory, entry);
      if (statSync(path).isDirectory()) {
        walk(path);
      } else if (entry.endsWith('.mdx')) {
        const markdown = stripMdxComponents(readFileSync(path, 'utf8'));
        if (markdown.length > 50) {
          const name = basename(entry, '.mdx');
          guides.push({ name, slug: toSlug(name), markdown });
        }
      }
    }
  }

  walk(guidesDirectory);
  return guides;
}

function formatProps(props: PropDocumentation[]): string {
  return props
    .map((prop) => {
      const metadata = [`type: \`${prop.type}\``, prop.required ? 'required' : 'optional'];
      if (prop.defaultValue !== undefined) {
        metadata.push(`default: \`${prop.defaultValue}\``);
      }
      return `### \`${prop.name}\`\n\n${metadata.join(' · ')}\n\n${prop.description}`;
    })
    .join('\n\n');
}

function formatExamples(examples: ExampleDocumentation[]): string {
  return examples
    .map(({ title, description, code }) => {
      const parts = [`### ${title}`];
      if (description) {
        parts.push(description);
      }
      parts.push(`\`\`\`tsx\n${code}\n\`\`\``);
      return parts.join('\n\n');
    })
    .join('\n\n');
}

function replaceLinks(markdown: string, replacements: Map<string, string>): string {
  let result = markdown;
  for (const [source, target] of replacements) {
    result = result.replaceAll(source, target);
  }
  return result;
}

function escapeXml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function formatComponentMarkdown(
  component: ComponentDocumentation,
  version: string,
  linkReplacements: Map<string, string>,
): string {
  const header = [
    `# ${component.name}`,
    '',
    `> Package: \`@skbkontur/react-ui\` · Version: \`${version}\` · [Storybook](${component.storybookUrl})`,
  ];
  if (component.description) {
    header.push('', component.description);
  }

  const propsMarkdown = formatProps(component.props);
  const examplesMarkdown = formatExamples(component.examples);
  let contentMarkdown = replaceLinks(component.markdown, linkReplacements);
  const hasPropsPlaceholder = contentMarkdown.includes('<!-- AI_PROPS -->');
  const hasExamplesPlaceholder = contentMarkdown.includes('<!-- AI_EXAMPLES -->');
  contentMarkdown = contentMarkdown
    .replace('<!-- AI_PROPS -->', propsMarkdown)
    .replace('<!-- AI_EXAMPLES -->', examplesMarkdown);

  const sections = [
    header.join('\n'),
    component.markdown.includes(component.importStatement)
      ? ''
      : `## Import\n\n\`\`\`tsx\n${component.importStatement}\n\`\`\``,
    contentMarkdown,
    component.props.length && !hasPropsPlaceholder ? `## Props\n\n${propsMarkdown}` : '',
    component.examples.length && !hasExamplesPlaceholder ? `## Examples\n\n${examplesMarkdown}` : '',
    `## Source\n\n[\`${component.sourcePath}\`](https://github.com/skbkontur/retail-ui/blob/master/packages/react-ui/${component.sourcePath})`,
  ];

  return cleanMarkdown(sections.filter(Boolean).join('\n\n')) + '\n';
}

function write(path: string, content: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, 'utf8');
}

function writeOutputs(
  options: GeneratorOptions,
  components: ComponentDocumentation[],
  guides: GuideDocumentation[],
  version: string,
): void {
  const publishedBaseUrl = getPublishedBaseUrl(version);
  const linkReplacements = new Map<string, string>();
  for (const component of components) {
    const documentationUrl = `${publishedBaseUrl}/docs/components/${component.slug}.md`;
    linkReplacements.set(component.storybookUrl, documentationUrl);
    linkReplacements.set(component.storybookUrl.replace(publishedBaseUrl, siteBaseUrl), documentationUrl);
  }
  linkReplacements.set(`${siteBaseUrl}/?path=`, `${publishedBaseUrl}/?path=`);
  const linkedComponents = components.map((component) => ({
    ...component,
    description: replaceLinks(component.description, linkReplacements),
    markdown: replaceLinks(component.markdown, linkReplacements),
    props: component.props.map((prop) => ({
      ...prop,
      description: replaceLinks(prop.description, linkReplacements),
    })),
    examples: component.examples.map((example) => ({
      ...example,
      description: replaceLinks(example.description, linkReplacements),
    })),
  }));
  const componentIndex = linkedComponents.map((component) => ({
    name: component.name,
    slug: component.slug,
    description: component.description,
    package: '@skbkontur/react-ui',
    version,
    import: component.importStatement,
    storybookUrl: component.storybookUrl,
    documentationUrl: `${publishedBaseUrl}/docs/components/${component.slug}.md`,
    sourcePath: component.sourcePath,
    props: component.props,
    examples: component.examples.map(({ name, title, description }) => ({ name, title, description })),
  }));

  for (const component of linkedComponents) {
    write(
      join(options.outputDirectory, 'docs', 'components', `${component.slug}.md`),
      formatComponentMarkdown(component, version, linkReplacements),
    );
    write(
      join(options.outputDirectory, 'api', 'components', `${component.slug}.json`),
      JSON.stringify(
        componentIndex.find(({ name }) => name === component.name),
        null,
        2,
      ) + '\n',
    );
  }

  for (const guide of guides) {
    const linkedMarkdown = replaceLinks(guide.markdown, linkReplacements);
    const markdown = linkedMarkdown.startsWith('# ') ? linkedMarkdown : `# ${guide.name}\n\n${linkedMarkdown}`;
    write(join(options.outputDirectory, 'docs', 'guides', `${guide.slug}.md`), cleanMarkdown(markdown) + '\n');
  }

  write(
    join(options.outputDirectory, 'api', 'components.json'),
    JSON.stringify({ schemaVersion: 1, package: '@skbkontur/react-ui', version, components: componentIndex }, null, 2) +
      '\n',
  );

  const llmsIndex = [
    '# @skbkontur/react-ui',
    '',
    '> React component library by SKB Kontur with components, validation tools, and design-system utilities.',
    '',
    `> Version: ${version} | Homepage: ${publishedBaseUrl} | npm: @skbkontur/react-ui`,
    '',
    '## Documentation bundles',
    '',
    `- [Full documentation](${publishedBaseUrl}/llms-full.txt): All guides, component APIs, and examples in one file.`,
    `- [Components bundle](${publishedBaseUrl}/llms-components.txt): Component APIs and examples without the guides.`,
    `- [Guides bundle](${publishedBaseUrl}/llms-guides.txt): Cross-component setup, migration, and usage guides.`,
    `- [Component API manifest](${publishedBaseUrl}/api/components.json): Structured JSON index of public components and props.`,
    `- [Sitemap](${publishedBaseUrl}/sitemap.xml): Crawlable index of the published documentation.`,
    '',
    '## Guides',
    '',
    ...guides.map(
      ({ name, slug }) => `- [${name}](${publishedBaseUrl}/docs/guides/${slug}.md): ${name} documentation.`,
    ),
    '',
    '## Components',
    '',
    ...linkedComponents.map(({ name, slug, description }) => {
      const summary = description ? `: ${description.replace(/\s+/g, ' ').slice(0, 180)}` : '';
      return `- [${name}](${publishedBaseUrl}/docs/components/${slug}.md)${summary}`;
    }),
    '',
    '## Optional',
    '',
    `- [Storybook](${publishedBaseUrl}): Interactive playground with rendered examples.`,
    '',
  ].join('\n');

  const guidesDocumentation = [
    '# @skbkontur/react-ui',
    '',
    `> Guides | Version: ${version} | Homepage: ${publishedBaseUrl}`,
    '',
    ...guides.flatMap((guide) => ['---', '', replaceLinks(guide.markdown, linkReplacements), '']),
  ].join('\n');

  const componentsDocumentation = [
    '# @skbkontur/react-ui',
    '',
    `> Components | Version: ${version} | Homepage: ${publishedBaseUrl}`,
    '',
    ...linkedComponents.flatMap((component) => [
      '---',
      '',
      formatComponentMarkdown(component, version, linkReplacements),
    ]),
  ].join('\n');

  const fullDocumentation = [
    '# @skbkontur/react-ui',
    '',
    `> Version: ${version} | Homepage: ${publishedBaseUrl} | npm: @skbkontur/react-ui`,
    '',
    '## Installation',
    '',
    '```bash',
    'npm install @skbkontur/react-ui',
    '```',
    '',
    guidesDocumentation,
    componentsDocumentation,
  ].join('\n');

  const sitemapUrls = [
    `${publishedBaseUrl}/`,
    `${publishedBaseUrl}/llms.txt`,
    `${publishedBaseUrl}/llms-full.txt`,
    `${publishedBaseUrl}/llms-components.txt`,
    `${publishedBaseUrl}/llms-guides.txt`,
    `${publishedBaseUrl}/api/components.json`,
    ...guides.map(({ slug }) => `${publishedBaseUrl}/docs/guides/${slug}.md`),
    ...linkedComponents.flatMap(({ slug, storybookUrl }) => [
      `${publishedBaseUrl}/docs/components/${slug}.md`,
      `${publishedBaseUrl}/api/components/${slug}.json`,
      storybookUrl,
    ]),
  ];
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...[...new Set(sitemapUrls)].map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n');

  const robots = ['User-agent: *', 'Allow: /', '', `Sitemap: ${publishedBaseUrl}/sitemap.xml`, ''].join('\n');

  write(join(options.outputDirectory, 'llms.txt'), llmsIndex);
  write(join(options.outputDirectory, 'llms-full.txt'), cleanMarkdown(fullDocumentation) + '\n');
  write(join(options.outputDirectory, 'llms-components.txt'), cleanMarkdown(componentsDocumentation) + '\n');
  write(join(options.outputDirectory, 'llms-guides.txt'), cleanMarkdown(guidesDocumentation) + '\n');
  write(join(options.outputDirectory, 'sitemap.xml'), sitemap);
  write(join(options.outputDirectory, 'robots.txt'), robots);
}

function validate(components: ComponentDocumentation[], strict: boolean): void {
  const problems: string[] = [];
  const storybookUrls = new Set<string>();

  for (const component of components) {
    if (!component.description) {
      problems.push(`${component.name}: missing component description`);
    }
    if (!component.props.length) {
      problems.push(`${component.name}: no documented props extracted`);
    }
    if (storybookUrls.has(component.storybookUrl)) {
      problems.push(`${component.name}: duplicate Storybook URL ${component.storybookUrl}`);
    }
    storybookUrls.add(component.storybookUrl);
  }

  if (problems.length) {
    const message = `AI documentation validation found ${problems.length} problem(s):\n${problems
      .map((problem) => `- ${problem}`)
      .join('\n')}`;
    if (strict) {
      throw new Error(message);
    }
    console.warn(message);
  }
}

function main(): void {
  const options = parseArguments();
  const { version } = readJson<{ version: string }>(packageJsonPath);
  const publishedBaseUrl = getPublishedBaseUrl(version);
  const componentNames = readdirSync(componentsDirectory)
    .filter((entry) => statSync(join(componentsDirectory, entry)).isDirectory())
    .filter((entry) => existsSync(join(componentsDirectory, entry, '__docs__', `${entry}.mdx`)));
  const componentApis = extractComponentApis(
    componentNames
      .map((name) => findComponentSource(join(componentsDirectory, name), name))
      .filter((path): path is string => path !== undefined),
  );
  const components = componentNames
    .map((name) => createComponentDocumentation(name, componentApis, publishedBaseUrl))
    .filter((component): component is ComponentDocumentation => component !== undefined)
    .sort((left, right) => left.name.localeCompare(right.name));
  const guides = readGuides();

  validate(components, options.strict);
  writeOutputs(options, components, guides, version);

  console.log(`Generated AI documentation for @skbkontur/react-ui ${version}:`);
  console.log(`- ${components.length} components`);
  console.log(`- ${components.reduce((total, component) => total + component.props.length, 0)} documented props`);
  console.log(`- ${components.reduce((total, component) => total + component.examples.length, 0)} examples`);
  console.log(`- ${guides.length} guides`);
  console.log(`- output: ${options.outputDirectory}`);
}

main();
