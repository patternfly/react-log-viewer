import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import { LogViewer } from '../LogViewer';
import { data } from './realTestData'

test('Renders without children', () => {
  render(
    <div data-testid="container">
        <LogViewer hasLineNumbers={false} height={300} data={data.data} theme={'light'} />
    </div>
    )

    expect(screen.getByTestId('container').firstChild).toBeVisible();
});
