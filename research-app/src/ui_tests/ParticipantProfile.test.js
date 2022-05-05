/**
 * @jest-environment jsdom
 */

/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
// import { jest } from '@jest/globals';

import ParticipantProfile from '../components/ParticipantProfile';

// const mockedUsedNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockedUsedNavigate,
// }));

test('Title Create User Profile', () => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  const mockSetStatus = jest.fn();
  const status = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
    render(
        <Router>
            <ParticipantProfile user={user1} setUser={mockSetUser} />
        </Router>);  
  const label = screen.getByText("Create User Profile");
  expect(label).toBeInTheDocument();
});

test('Title Age', () => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  const mockSetStatus = jest.fn();
  const status = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
    render(
        <Router>
            <ParticipantProfile user={user1} setUser={mockSetUser} />
        </Router>);  
  const label = screen.getByText("Medications");
  expect(label).toBeInTheDocument();
});


// test('find name text', () => {
//   const mockSetUser = jest.fn();
//   const user1 = { username: 'user1', password: 'user1pass' };
//   const mockSetStatus = jest.fn();
//   const status = false;
//   const mockSetStudy = jest.fn();
//   const study = {
//     studyId: '',
//     participants: [''],
//     researchers: [],
//     tags: [],
//   };
//     render(
//         <Router>
//             <ParticipantProfile user={user1} setUser={mockSetUser} />
//         </Router>);  
//   const label = screen.getByText("Name");
//   expect(label).toBeInTheDocument();
// });

// test('find create text', () => {
//   const mockSetUser = jest.fn();
//   const user1 = { username: 'user1', password: 'user1pass' };
//   const mockSetStatus = jest.fn();
//   const status = false;
//   const mockSetStudy = jest.fn();
//   const study = {
//     studyId: '',
//     participants: [''],
//     researchers: [],
//     tags: [],
//   };
//     render(
//         <Router>
//             <ParticipantProfile user={user1} setUser={mockSetUser} />
//         </Router>);  
//   const label = screen.getByText("Create Researcher Profile");
//   expect(label).toBeInTheDocument();
// });

// // test('participant clicked',() => {
// //   render(
// //     <Router>
// //         <Study />
// //     </Router>); 
// // // fireEvent.click(screen.getByTestId('participant'));
// // expect(screen.getByTestId('participant')).toBeInTheDocument();
// // //   expect(screen.getByTestId('participant')).toBeChecked();
// // });
test('Sign Up Button',() => {
  const mockSetUser = jest.fn();
  const user1 = {
    username: 'user1',
    password: 'user1pass',
    enrolled: '',
    age: '10',
    heightFeet: '10',
    heightInches: '10',
    weight: '10',
    sex: 'male',
    gender: 'male',
    allergies: ['all'],
    phys: ['phys'],
    psych: ['psych'],
    med: [],
    type: 0,
  };    
  const mockSetStatus = jest.fn();
  const status = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
    render(
        <Router>
            <ParticipantProfile user={user1} setUser={mockSetUser} />
        </Router>);  
  const linkElement = screen.getByRole('button', {
    name: /sign up/i,
  });
  fireEvent.click(linkElement);
  expect(linkElement).toBeInTheDocument();
});


test('Sign Up Button',() => {
  const mockSetUser = jest.fn();
  const user1 = {
    username: 'user1',
    password: 'user1pass',
    enrolled: '',
    age: '10',
    heightFeet: '10',
    heightInches: '10',
    weight: '10',
    sex: 'male',
    gender: 'male',
    allergies: '',
    phys: '',
    psych: [],
    med: '',
    type: 0,
  };    
  const mockSetStatus = jest.fn();
  const status = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
    render(
        <Router>
            <ParticipantProfile user={user1} setUser={mockSetUser} />
        </Router>);  
  const linkElement = screen.getByRole('button', {
    name: /sign up/i,
  });
  fireEvent.click(linkElement);
  expect(linkElement).toBeInTheDocument();
});

test('Sign Up Error Test Cases',() => {
  const mockSetUser = jest.fn();
  const user1 = {
    username: '',
    password: '',
    enrolled: '',
    age: '',
    heightFeet: '',
    heightInches: '',
    weight: '',
    sex: '',
    gender: undefined,
    allergies: undefined,
    phys: undefined,
    psych: undefined,
    med: undefined,
    type: 0,
  };    
  const mockSetStatus = jest.fn();
  const status = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
    render(
        <Router>
            <ParticipantProfile user={user1} setUser={mockSetUser} />
        </Router>);  
  const linkElement = screen.getByRole('button', {
    name: /sign up/i,
  });
  fireEvent.click(linkElement);
  expect(linkElement).toBeInTheDocument();
});

test('Sign Up Error Test Cases part2',() => {
  const mockSetUser = jest.fn();
  const user1 = {
    username: '',
    password: '',
    enrolled: '',
    age: '',
    heightFeet: '',
    heightInches: '',
    weight: '',
    sex: undefined,
    gender: undefined,
    allergies: undefined,
    phys: undefined,
    psych: undefined,
    med: undefined,
    type: 0,
  };    
  const mockSetStatus = jest.fn();
  const status = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
    render(
        <Router>
            <ParticipantProfile user={user1} setUser={mockSetUser} />
        </Router>);  
  const linkElement = screen.getByRole('button', {
    name: /sign up/i,
  });
  fireEvent.click(linkElement);
  expect(linkElement).toBeInTheDocument();
});

test('single input value  sequence', () => {
  const mockUser = {
    username: 'user1',
    password: 'user1pass',
    enrolled: '',
    age: '10',
    heightFeet: '10',
    heightInches: '10',
    weight: '10',
    sex: 'male',
    gender: 'male',
    allergies: '',
    phys: '',
    psych: [],
    med: '',
    type: 0,
  };  
  const mockSetUser = jest.fn();

  render(
    <Router>
      <ParticipantProfile user={mockUser} setUser={mockSetUser} />
    </Router>,
  );

  const input = screen.getByPlaceholderText('age');
  fireEvent.change(input, { target: { value: '10' } });
  expect(input.value).toEqual('10');
  // expect(mockSetUser).toHaveBeenCalled();

  const input2 = screen.getByPlaceholderText('height');
  fireEvent.change(input2, { target: { value: '10' } });
  expect(input2.value).toEqual('10');
  // expect(mockSetUser).toHaveBeenCalled();

  const input3 = screen.getByPlaceholderText('ft');
  fireEvent.change(input3, { target: { value: '10' } });
  expect(input3.value).toEqual('10');
  // expect(mockSetUser).toHaveBeenCalled();

  const input4 = screen.getByPlaceholderText('weight');
  fireEvent.change(input4, { target: { value: '10' } });
  expect(input4.value).toEqual('10');
  // expect(mockSetUser).toHaveBeenCalled();

  // fireEvent.click(screen.getByDisplayValue('SUBMIT'));
});

test('snapshot test', () => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  const component = renderer.create( 
    <Router>
        <ParticipantProfile user={user1} setUser={mockSetUser} />
    </Router>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

//TODO: How to do textbox field testing for those functions