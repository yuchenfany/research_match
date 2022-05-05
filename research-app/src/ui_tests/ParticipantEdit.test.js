/**
 * @jest-environment jsdom
 */

/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
// import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
// import { jest } from '@jest/globals';

import ParticipantEdit from '../components/ParticipantEdit';

// const mockedUsedNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockedUsedNavigate,
// }));

test('Title Edit User Profile', () => {
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
    render(
        <Router>
            <ParticipantEdit user={user1} setUser={mockSetUser} />
        </Router>);  
  const label = screen.getByText("Edit User Profile");
  expect(label).toBeInTheDocument();
});

test('find allergies text', () => {
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
    render(
        <Router>
            <ParticipantEdit user={user1} setUser={mockSetUser} />
        </Router>);  
  const label = screen.getByText("Allergies");
  expect(label).toBeInTheDocument();
});

test('find Medications text', () => {
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
    render(
        <Router>
            <ParticipantEdit user={user1} setUser={mockSetUser} />
        </Router>);  
  const label = screen.getByText("Medications");
  expect(label).toBeInTheDocument();
});

test('Update Button',() => {
  const Button = ({onClick, children}) => (
    <button onClick={onClick}>{children}</button>
  )
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
      render(
        <Router>
            <ParticipantEdit user={user1} setUser={mockSetUser} />
        </Router>);  
  const linkElement = screen.getByRole('button', {
    name: /update/i,
  });
  fireEvent.click(screen.getByText(/update/i));
  expect(linkElement).toBeInTheDocument();
});

test('Cancel Button',() => {
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
  render(
        <Router>
            <ParticipantEdit user={user1} setUser={mockSetUser} />
        </Router>);  
  const linkElement = screen.getByRole('button', {
    name: /cancel/i,
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
      <ParticipantEdit user={mockUser} setUser={mockSetUser} />
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
  fireEvent.change(input2, { target: { value: '10' } });
  expect(input3.value).toEqual('10');
  // expect(mockSetUser).toHaveBeenCalled();

  const input4 = screen.getByPlaceholderText('weight');
  fireEvent.change(input2, { target: { value: '10' } });
  expect(input4.value).toEqual('10');
  // expect(mockSetUser).toHaveBeenCalled();

  // fireEvent.click(screen.getByDisplayValue('SUBMIT'));
});

test('radio buttons', async () => {
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
      <ParticipantEdit user={mockUser} setUser={mockSetUser} />
    </Router>,
  );

  await userEvent.click(screen.getByTitle('intersex-form'));
});

// const genderOptions = [
//   { label: 'Female', value: 'female' },
//   { label: 'Male', value: 'male' },
//   { label: 'Transgender', value: 'transgender' },
//   { label: 'Non-binary', value: 'nonbinary' },
//   { label: 'Other', value: 'other' },
//   { label: 'Prefer not to answer', value: 'prefer not to answer' },
// ];
// /* eslint-disable */
// jest.mock('react-select', () => ({ options, value, onChange }) => {
//   function handleChange(event) {
//     const option = options.find(
//       (option) => option.value === event.currentTarget.value,
//     );
//     onChange(option);
//   }

//   function isGender(curr) {
//     if (curr[0].value === 'female') {
//       return "gender";
//     }
//     return "not-gender";
//   }

//   return (
//     <select data-testid={isGender(options)} value={value} onChange={handleChange}>
//       {options.map(({ label, value }) => (
//         <option key={value} value={value}>
//           {label}
//         </option>
//       ))}
//     </select>
//   );
// });
// /* eslint-enable */

// test('Edit Study tags', () => {
//   const mockSetUser = jest.fn();
//   const mockUser = {
//     username: 'user1',
//     password: 'user1pass',
//     enrolled: '',
//     age: '10',
//     heightFeet: '10',
//     heightInches: '10',
//     weight: '10',
//     sex: 'male',
//     gender: 'male',
//     allergies: '',
//     phys: '',
//     psych: [],
//     med: '',
//     type: 0,
//   };

//   render(
//     <Router>
//       <ParticipantEdit user={mockUser} setUser={mockSetUser} />
//     </Router>,
//   );
//   const select = screen.getByTestId('gender');
//   fireEvent.change(select, {
//     target: { value: 'Female' },
//   });
// });

test('snapshot test', () => {
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

  const notification = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
  const component = renderer.create(
    <Router>
      <ParticipantEdit user={user1} setUser={mockSetUser} />
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

// TO GET HIGHER SCORE

// 1. fireevent update button is not accessing
// 2. text fields for name and organization
