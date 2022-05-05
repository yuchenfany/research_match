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

import ResearcherHome from '../components/ResearcherHome';

// const mockedUsedNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockedUsedNavigate,
// }));

test('Title My studies', () => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  const mockSetNotification = jest.fn();
  const notification = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
    render(
        <Router>
            <ResearcherHome study={study} setStudy={mockSetStudy} user={user1} setUser={mockSetUser} notification={notification} setNotification={mockSetNotification} />
        </Router>);  
  const label = screen.getByText("My Studies");
  expect(label).toBeInTheDocument();
});

test('find researcherHome text', () => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  const mockSetNotification = jest.fn();
  const notification = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
    render(
        <Router>
            <ResearcherHome study={study} setStudy={mockSetStudy} user={user1} setUser={mockSetUser} notification={notification} setNotification={mockSetNotification} />
        </Router>);  
  const label = screen.getByText("Researcher Home");
  expect(label).toBeInTheDocument();
});

test('find testing text', () => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  const mockSetNotification = jest.fn();
  const notification = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
    render(
        <Router>
            <ResearcherHome study={study} setStudy={mockSetStudy} user={user1} setUser={mockSetUser} notification={notification} setNotification={mockSetNotification} />
        </Router>);  
  const label = screen.getByText("For Testing Purposes: Directs to Add Study Page");
  expect(label).toBeInTheDocument();
});

test('find go to study text', () => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  const mockSetNotification = jest.fn();
  const notification = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
    render(
        <Router>
            <ResearcherHome study={study} setStudy={mockSetStudy} user={user1} setUser={mockSetUser} notification={notification} setNotification={mockSetNotification} />
        </Router>);  
  const label = screen.getByText("Go to Study Page");
  expect(label).toBeInTheDocument();
});

// test('participant clicked',() => {
//   render(
//     <Router>
//         <Study />
//     </Router>); 
// // fireEvent.click(screen.getByTestId('participant'));
// expect(screen.getByTestId('participant')).toBeInTheDocument();
// //   expect(screen.getByTestId('participant')).toBeChecked();
// });

test('Add Study Button',() => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  const mockSetNotification = jest.fn();
  const notification = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
    render(
        <Router>
            <ResearcherHome study={study} setStudy={mockSetStudy} user={user1} setUser={mockSetUser} notification={notification} setNotification={mockSetNotification} />
        </Router>);  
  const linkElement = screen.getByRole('button', {
    name: /add study/i,
  });
  fireEvent.click(linkElement);
  expect(linkElement).toBeInTheDocument();
});


// test('Sign Up Button',() => {
//   const mockSetUser = jest.fn();
//   const user1 = { username: 'user1', password: 'user1pass' };
//   render(
//     <Router>
//       <Type setUser={mockSetUser} user={user1} />
//     </Router>,
//   );
//   const linkElement = screen.getByRole('radio', {
//     name: /researcher/i
//   });
//   fireEvent.click(linkElement);
//   // expect(mockSetUser).toBeCalled();
//   expect(linkElement).toBeInTheDocument();
// });

// test('researcher clicked',() => {
//   render(
//     <Router>
//         <Study />
//     </Router>); 
//   // fireEvent.click(screen.getByTestId('researcher'));
//   expect(screen.getByTestId('researcher')).toBeInTheDocument();
//   // expect(screen.getByTestId('researcher')).toBeChecked();
// });

test('snapshot test', () => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  const mockSetNotification = jest.fn();
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
        <ResearcherHome study={study} setStudy={mockSetStudy} user={user1} setUser={mockSetUser} notification={notification} setNotification={mockSetNotification} />
    </Router>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

//NAVBAR TESTING

test('Home Button',() => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  const mockSetNotification = jest.fn();
  const notification = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
    render(
        <Router>
            <ResearcherHome study={study} setStudy={mockSetStudy} user={user1} setUser={mockSetUser} notification={notification} setNotification={mockSetNotification} />
        </Router>);  
  const linkElement = screen.getByRole('button', {
    name: /home/i,
  });
  fireEvent.click(linkElement);
  expect(linkElement).toBeInTheDocument();
});

test('ANALYTICS Button',() => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  const mockSetNotification = jest.fn();
  const notification = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
    render(
        <Router>
            <ResearcherHome study={study} setStudy={mockSetStudy} user={user1} setUser={mockSetUser} notification={notification} setNotification={mockSetNotification} />
        </Router>);  
  const linkElement = screen.getByRole('button', {
    name: /analytics/i,
  });
  fireEvent.click(linkElement);
  expect(linkElement).toBeInTheDocument();
});

test('ACCOUNT and Delete Button',() => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  const mockSetNotification = jest.fn();
  const notification = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
    render(
        <Router>
            <ResearcherHome study={study} setStudy={mockSetStudy} user={user1} setUser={mockSetUser} notification={notification} setNotification={mockSetNotification} />
        </Router>);  
  const linkElement = screen.getByRole('button', {
    name: /account/i,
  });
  fireEvent.click(linkElement);
  const linkElement2 = screen.getByRole('button', {
    name: /delete account/i,
  });
  // const linkElement3 = screen.getByRole('button', {
  //   name: /edit profile/i,
  // });
  // const linkElement4 = screen.getByRole('button', {
  //   name: /logout/i,
  // });
  fireEvent.click(linkElement2);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
});

test('ACCOUNT and edit Button',() => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  const mockSetNotification = jest.fn();
  const notification = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
    render(
        <Router>
            <ResearcherHome study={study} setStudy={mockSetStudy} user={user1} setUser={mockSetUser} notification={notification} setNotification={mockSetNotification} />
        </Router>);  
  const linkElement = screen.getByRole('button', {
    name: /account/i,
  });
  fireEvent.click(linkElement);
  const linkElement2 = screen.getByRole('button', {
    name: /edit profile/i,
  });
  // const linkElement3 = screen.getByRole('button', {
  //   name: /edit profile/i,
  // });
  // const linkElement4 = screen.getByRole('button', {
  //   name: /logout/i,
  // });
  fireEvent.click(linkElement2);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
});

test('ACCOUNT and logout',() => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  const mockSetNotification = jest.fn();
  const notification = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
    render(
        <Router>
            <ResearcherHome study={study} setStudy={mockSetStudy} user={user1} setUser={mockSetUser} notification={notification} setNotification={mockSetNotification} />
        </Router>);  
  const linkElement = screen.getByRole('button', {
    name: /account/i,
  });
  fireEvent.click(linkElement);
  const linkElement2 = screen.getByRole('button', {
    name: /logout/i,
  });
  // const linkElement3 = screen.getByRole('button', {
  //   name: /edit profile/i,
  // });
  // const linkElement4 = screen.getByRole('button', {
  //   name: /logout/i,
  // });
  fireEvent.click(linkElement2);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
});

test('MESSAGE Button',() => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  const mockSetNotification = jest.fn();
  const notification = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
    render(
        <Router>
            <ResearcherHome study={study} setStudy={mockSetStudy} user={user1} setUser={mockSetUser} notification={notification} setNotification={mockSetNotification} />
        </Router>);  
  const linkElement = screen.getByRole('button', {
    name: /message/i,
  });
  fireEvent.click(linkElement);
  expect(linkElement).toBeInTheDocument();
});

test('my studies Button',() => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  const mockSetNotification = jest.fn();
  const notification = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
    render(
        <Router>
            <ResearcherHome study={study} setStudy={mockSetStudy} user={user1} setUser={mockSetUser} notification={notification} setNotification={mockSetNotification} />
        </Router>);  
  const linkElement = screen.getByRole('button', {
    name: /my studies/i,
  });
  fireEvent.click(linkElement);
  expect(linkElement).toBeInTheDocument();
});