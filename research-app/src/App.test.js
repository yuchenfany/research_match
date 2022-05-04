/**
 * @jest-environment jsdom
 */

 import  { render, screen } from '@testing-library/react';
 import '@testing-library/jest-dom';
 import renderer from 'react-test-renderer';
 import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('snapshot test', () => {
  const component = renderer.create(<App />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  });
