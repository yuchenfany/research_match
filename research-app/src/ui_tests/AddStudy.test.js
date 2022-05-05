/**
 * @jest-environment jsdom
 */

/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
// import { jest } from '@jest/globals';

import AddStudy from '../components/AddStudy';

// const mockedUsedNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockedUsedNavigate,
// }));

test('Create Study header', () => {
  render(
    <Router>
      <AddStudy />
    </Router>,
  );
  const header = screen.getByText('Create Study');
  expect(header).toBeInTheDocument();
});

test('Title label', () => {
  render(
    <Router>
      <AddStudy />
    </Router>,
  );
  const label = screen.getByText('Title');
  expect(label).toBeInTheDocument();
});

test('Description label', () => {
  render(
    <Router>
      <AddStudy />
    </Router>,
  );
  const label = screen.getByText('Description');
  expect(label).toBeInTheDocument();
});

test('Compensation label', () => {
  render(
    <Router>
      <AddStudy />
    </Router>,
  );
  const label = screen.getByText('Compensation');
  expect(label).toBeInTheDocument();
});

test('Duration label', () => {
  render(
    <Router>
      <AddStudy />
    </Router>,
  );
  const label = screen.getByText('Duration');
  expect(label).toBeInTheDocument();
});

test('Tags label', () => {
  render(
    <Router>
      <AddStudy />
    </Router>,
  );
  const label = screen.getByText('Tags');
  expect(label).toBeInTheDocument();
});

test('Add Study sequence', async () => {
  const mockStudy = {
    title: 'faketitle', description: 'fakedescription', compensation: 4, duration: 3, leadResearcher: 'fakelead',
  };
  const mockUser = {
    username: '', password: '',
  };
  const mockSetStudy = jest.fn();
  render(
    <Router>
      <AddStudy user={mockUser} study={mockStudy} setStudy={mockSetStudy} />
    </Router>,
  );

  const inputTitle = screen.getByTitle('title');
  fireEvent.change(inputTitle, { target: { value: 'title' } });
  expect(inputTitle.value).toEqual('title');

  const inputDesc = screen.getByTitle('description');
  fireEvent.change(inputDesc, { target: { value: 'description' } });
  expect(inputDesc.value).toEqual('description');

  const inputComp = screen.getByTitle('compensation');
  fireEvent.change(inputComp, { target: { value: 'compensation' } });
  expect(inputComp.value).toEqual('compensation');

  const inputDur = screen.getByTitle('duration');
  fireEvent.change(inputDur, { target: { value: 'duration' } });
  expect(inputDur.value).toEqual('duration');

  await waitFor(() => {
    fireEvent.click(screen.getByTitle('add-study'));
  });
  expect(mockSetStudy).toHaveBeenCalled();
});

// test('should be able to type input', () => {
//   render(
//     <Router>
//       <AddStudy />
//     </Router>,
//   );
//   const input = screen.getByPlaceholderText('title');
//   fireEvent.change(input, { target: { value: 'test input' } });
//   // expect(input.value).toBe('test input');

//   // expect(screen.getByDisplayValue('title')).toHaveAttribute('id', 'title');
// });

/* eslint-disable */
jest.mock('react-select', () => ({ options, value, onChange }) => {
  function handleChange(event) {
    const option = options.find(
      (option) => option.value === event.currentTarget.value,
    );
    onChange(option);
  }

  return (
    <select data-testid="select" value={value} onChange={handleChange}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
});
/* eslint-enable */

test('Add Study tags', () => {
  const mockStudy = {
    title: 'faketitle', description: 'fakedescription', compensation: 4, duration: 3, leadResearcher: 'fakelead',
  };
  const mockUser = {
    username: '', password: '',
  };
  const mockSetStudy = jest.fn();
  render(
    <Router>
      <AddStudy user={mockUser} study={mockStudy} setStudy={mockSetStudy} />
    </Router>,
  );
  fireEvent.change(screen.getByTestId('select'), {
    target: { value: 'diabetes' },
  });
});

test('snapshot test', () => {
  const component = renderer.create(
    <Router>
      <AddStudy />
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
