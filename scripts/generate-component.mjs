
//#!/usr/bin/env node      // ← 윈도우 Node 22에서 BOM 오류 피하려면 위 줄 삭제하고 이 줄 주석 유지

/**
 * generate-component.mjs
 * ----------------------
 * React 컴포넌트(코드·CSS·Story·테스트) 자동 생성 스크립트
 *
 * 사용:
 *   npm run gen Button "variant:primary|secondary size:sm|md|lg"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/* ═════ 유틸 ═════ */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toPascal = (s) => s[0].toUpperCase() + s.slice(1);
const toKebab = (s) => s.replace(/[A-Z]/g, (m, i) => (i ? '-' : '') + m.toLowerCase());

/* ═════ 인수 파싱 ═════ */
const [, , rawName, rawProps = ''] = process.argv;
if (!rawName) {
  console.error('✖  예) npm run gen Button "variant:primary|secondary size:sm|md|lg"');
  process.exit(1);
}
const Component = toPascal(rawName);
const kebab = toKebab(Component);

const propTokens = rawProps
  .split(' ')
  .filter(Boolean)
  .map((t) => {
    const [key, vals = ''] = t.split(':');
    return { key, values: vals.split('|').filter(Boolean) };
  });

/* ═════ 경로 준비 ═════ */
const baseDir = path.join('packages', 'ui', 'src', 'components', Component);
fs.mkdirSync(baseDir, { recursive: true });

/* ═════ 템플릿 생성 ═════ */
const tsx = `import React from 'react';
import clsx from 'clsx';
import './${Component}.css';

export interface ${Component}Props extends React.HTMLAttributes<HTMLButtonElement> {
${propTokens.map(({ key, values }) => `  ${key}?: '${values.join("' | '")}'`).join('\n')}
}

export const ${Component} = React.forwardRef<HTMLButtonElement, ${Component}Props>(
  ({ ${propTokens.map((p) => p.key).join(', ')}, className, children, ...rest }, ref) => {
    const classes = clsx(
      'ui-${kebab}',
${propTokens
  .map(({ key }) => `      ${key} && \`ui-${kebab}--${key}-\${${key}}\``)
  .join(',\n')}
      ,
      className
    );

    return (
      <button ref={ref} className={classes} {...rest}>
        {children}
      </button>
    );
  }
);

${Component}.displayName = '${Component}';
`;

const css = `/* ${Component}.css – Tailwind + CSS 변수 */
.ui-${kebab} {@apply inline-flex items-center justify-center font-medium transition-colors;}
${propTokens
  .filter((p) => p.key === 'variant')
  .flatMap(({ values }) =>
    values.map(
      (v) =>
        `.ui-${kebab}--variant-${v} {@apply ${
          v === 'primary'
            ? 'bg-brand-primary text-white hover:bg-brand-primary-600'
            : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
        };}`
    )
  )
  .join('\n')}
${propTokens
  .filter((p) => p.key === 'size')
  .flatMap(({ values }) =>
    values.map(
      (v) =>
        `.ui-${kebab}--size-${v} {@apply ${
          v === 'sm'
            ? 'h-8 px-3 text-sm'
            : v === 'md'
            ? 'h-10 px-4 text-sm'
            : 'h-12 px-6 text-base'
        };}`
    )
  )
  .join('\n')}
`;

const story = `import type { Meta, StoryObj } from '@storybook/react';
import { ${Component} } from './${Component}';

const meta: Meta<typeof ${Component}> = {
  title: 'Components/${Component}',
  component: ${Component},
  tags: ['autodocs'],
  args: { children: '${Component}', variant: 'primary', size: 'md' },
};
export default meta;
type Story = StoryObj<typeof ${Component}>;

export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
`;

const test = `import { render, screen } from '@testing-library/react';
import { ${Component} } from './${Component}';

test('${Component} renders text', () => {
  render(<${Component}>Click</${Component}>);
  expect(screen.getByText(/click/i)).toBeInTheDocument();
});
`;

/* ═════ 파일 쓰기 ═════ */
fs.writeFileSync(path.join(baseDir, `${Component}.tsx`), tsx);
fs.writeFileSync(path.join(baseDir, `${Component}.css`), css);
fs.writeFileSync(path.join(baseDir, `${Component}.stories.mdx`), story);
fs.writeFileSync(path.join(baseDir, `${Component}.test.tsx`), test);

console.log('✅  Generated:', baseDir);
