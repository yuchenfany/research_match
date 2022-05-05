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

import EditStudy from '../components/EditStudy';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('Edit Study studies header', () => {
  const mockStudy = {
    title: 'faketitle', description: 'fakedescription', compensation: 4, duration: 3, leadResearcher: 'fakelead',
  };
  const mockSetStudy = jest.fn();

  render(
    <Router>
      <EditStudy study={mockStudy} setStudy={mockSetStudy} />
    </Router>,
  );
  const header = screen.getByText('Edit Study');
  expect(header).toBeInTheDocument();
});

test('Edit Study input labels', () => {
  const mockStudy = {
    title: 'faketitle', description: 'fakedescription', compensation: 4, duration: 3, leadResearcher: 'fakelead',
  };
  const mockSetStudy = jest.fn();

  render(
    <Router>
      <EditStudy study={mockStudy} setStudy={mockSetStudy} />
    </Router>,
  );
  const title = screen.getByText('Title');
  expect(title).toBeInTheDocument();
  const description = screen.getByText('Description');
  expect(description).toBeInTheDocument();
  const compensation = screen.getByText('Compensation');
  expect(compensation).toBeInTheDocument();
  const duration = screen.getByText('Duration');
  expect(duration).toBeInTheDocument();
  const leadResearcher = screen.getByText('Lead Researcher');
  expect(leadResearcher).toBeInTheDocument();
});

test('Edit Study inputs', () => {
  const mockStudy = {
    title: 'faketitle', description: 'fakedescription', compensation: 4, duration: 3, leadResearcher: 'fakelead',
  };
  const mockSetStudy = jest.fn();

  render(
    <Router>
      <EditStudy study={mockStudy} setStudy={mockSetStudy} />
    </Router>,
  );
  const title = screen.getByDisplayValue('faketitle');
  expect(title).toBeInTheDocument();
});

test('Edit Study change input', async () => {
  const mockStudy = {
    title: 'faketitle', description: 'fakedescription', compensation: 4, duration: 3, leadResearcher: 'fakelead',
  };
  const mockSetStudy = jest.fn();

  render(
    <Router>
      <EditStudy study={mockStudy} setStudy={mockSetStudy} />
    </Router>,
  );

  const input = screen.getByTitle('title');
  fireEvent.change(input, { target: { value: 'newtitle' } });
  // expect(input.value).toEqual('newtitle');
  expect(mockSetStudy).toHaveBeenCalled();

  const inputDesc = screen.getByTitle('description');
  fireEvent.change(inputDesc, { target: { value: 'newdesc' } });
  expect(mockSetStudy).toHaveBeenCalled();

  const inputComp = screen.getByTitle('compensation');
  fireEvent.change(inputComp, { target: { value: 'newcomp' } });
  expect(mockSetStudy).toHaveBeenCalled();

  const inputDur = screen.getByTitle('duration');
  fireEvent.change(inputDur, { target: { value: 'newdur' } });
  expect(mockSetStudy).toHaveBeenCalled();

  const inputRes = screen.getByTitle('researchers');
  fireEvent.change(inputRes, { target: { value: 'newres' } });
  expect(mockSetStudy).toHaveBeenCalled();

  // const input = screen.getByDisplayValue('faketitle');
  // await fireEvent.change(input, { target: { value: 'newtitle' } });
  // await waitFor(() => {
  //   expect(input.value).toEqual('newtitle');
  // });
});

// test('Edit Study tags', () => {
//   const mockStudy = {
//     title: 'faketitle', description: 'fakedescription',
// compensation: 4, duration: 3, leadResearcher: 'fakelead',
//   };
//   const mockSetStudy = jest.fn();

//   render(
//     <Router>
//       <EditStudy study={mockStudy} setStudy={mockSetStudy} />
//     </Router>,
//   );
//   const tags = screen.getByTitle('tags');
//   expect(tags).toBeInTheDocument();
// });

test('Edit Study update', () => {
  const mockStudy = {
    title: 'faketitle', description: 'fakedescription', compensation: 4, duration: 3, leadResearcher: 'fakelead',
  };
  const mockSetStudy = jest.fn();
  render(
    <Router>
      <EditStudy study={mockStudy} setStudy={mockSetStudy} />
    </Router>,
  );
  fireEvent.click(screen.getByDisplayValue('Update'));
});

test('Edit Study delete study', () => {
  const mockStudy = {
    title: 'faketitle', description: 'fakedescription', compensation: 4, duration: 3, leadResearcher: 'fakelead',
  };
  const mockSetStudy = jest.fn();
  render(
    <Router>
      <EditStudy study={mockStudy} setStudy={mockSetStudy} />
    </Router>,
  );
  fireEvent.click(screen.getByDisplayValue('Delete Study'));
});

test('Edit Study close study', () => {
  const mockStudy = {
    title: 'faketitle', description: 'fakedescription', compensation: 4, duration: 3, leadResearcher: 'fakelead',
  };
  const mockSetStudy = jest.fn();
  render(
    <Router>
      <EditStudy study={mockStudy} setStudy={mockSetStudy} />
    </Router>,
  );
  fireEvent.click(screen.getByDisplayValue('Close Study'));
});

test('snapshot test', () => {
  const mockStudy = {
    title: 'faketitle', description: 'fakedescription', compensation: 4, duration: 3, leadResearcher: 'fakelead',
  };
  const mockSetStudy = jest.fn();

  const component = renderer.create(
    <Router>
      <EditStudy study={mockStudy} setStudy={mockSetStudy} />
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
