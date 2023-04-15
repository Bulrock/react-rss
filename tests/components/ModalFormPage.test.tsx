import * as React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import Modal from '../../src/components/ModalFormPage';
import { Provider } from 'react-redux';
import store from '../../src/app/store';

let container: HTMLDivElement | null = null;
beforeEach(() => {
  container = document.createElement('div') as HTMLDivElement;
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container as Element);
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
});

const mockPersonDead = {
  id: 197,
  name: 'Kyle',
  status: 'Dead',
  species: 'Humanoid',
  type: 'Miniverse inhabitant',
  gender: 'Male',
  origin: {
    name: "Zeep Xanflorp's Miniverse",
    url: 'https://rickandmortyapi.com/api/location/49',
  },
  location: {
    name: "Kyle's Teenyverse",
    url: 'https://rickandmortyapi.com/api/location/50',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/197.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/17'],
  url: 'https://rickandmortyapi.com/api/character/197',
  created: '2017-12-30T12:39:09.025Z',
};

const mockPersonAlive = {
  id: 197,
  name: 'Kyle',
  status: 'Alive',
  species: 'Humanoid',
  type: 'Miniverse inhabitant',
  gender: 'Male',
  origin: {
    name: "Zeep Xanflorp's Miniverse",
    url: 'https://rickandmortyapi.com/api/location/49',
  },
  location: {
    name: "Kyle's Teenyverse",
    url: 'https://rickandmortyapi.com/api/location/50',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/197.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/17'],
  url: 'https://rickandmortyapi.com/api/character/197',
  created: '2017-12-30T12:39:09.025Z',
};

describe('ModalFormPage', () => {
  const setActive = jest.fn();

  it("shouldn't render a modal window without active class", async () => {
    const { findByTestId } = render(
      <Provider store={store}>
        <Modal active={false} setActive={setActive} characterModal={mockPersonAlive} />
      </Provider>
    );

    const modalCard = await findByTestId('modal');
    await waitFor(() => {
      expect(modalCard).toHaveClass('modal');
    });
  });

  it('should render a modalFormPage window with active class and modal Card of alive character', async () => {
    const { findByTestId, getByTestId, getByText } = render(
      <Provider store={store}>
        <Modal active={true} setActive={setActive} characterModal={mockPersonAlive} />
      </Provider>
    );

    const modalCard = await findByTestId('modal');
    await waitFor(() => {
      expect(modalCard).toHaveClass('modal active');
    });

    const modalContent = await findByTestId('person-loc');

    await waitFor(() => {
      expect(modalContent).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(getByText('Kyle')).toBeInTheDocument();
      expect(getByText('Alive - Humanoid')).toBeInTheDocument();
      expect(getByText('Male')).toBeInTheDocument();
      expect(getByText("Kyle's Teenyverse")).toBeInTheDocument();
      expect(getByText('2017-12-30')).toBeInTheDocument();
      expect(getByTestId('person-status-ico')).toHaveClass('status-icon-green');
    });
  });

  it('should render a modalFormPage window with active class and modal Card of dead character', async () => {
    const { findByTestId, getByTestId, getByText } = render(
      <Provider store={store}>
        <Modal active={true} setActive={setActive} characterModal={mockPersonDead} />
      </Provider>
    );

    const modalCard = await findByTestId('modal');
    await waitFor(() => {
      expect(modalCard).toHaveClass('modal active');
    });

    const modalContent = await findByTestId('person-loc');

    await waitFor(() => {
      expect(modalContent).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(getByText('Kyle')).toBeInTheDocument();
      expect(getByText('Dead - Humanoid')).toBeInTheDocument();
      expect(getByText('Male')).toBeInTheDocument();
      expect(getByText("Kyle's Teenyverse")).toBeInTheDocument();
      expect(getByText('2017-12-30')).toBeInTheDocument();
      expect(getByTestId('person-status-ico')).toHaveClass('status-icon-red');
    });
  });

  it('should be closed on close button click', async () => {
    const { findByTestId } = render(
      <Provider store={store}>
        <Modal active={true} setActive={setActive} characterModal={mockPersonAlive} />
      </Provider>
    );
    const closeButton = await findByTestId('modal-close-btn');
    fireEvent.click(closeButton);
    const closedModal = await findByTestId('modal');
    waitFor(() => {
      expect(closedModal).toHaveClass('modal');
      expect(setActive).toHaveBeenCalledWith(false);
    });
  });

  it('should be closed on close button click', async () => {
    const { findByTestId } = render(
      <Provider store={store}>
        <Modal active={true} setActive={setActive} characterModal={mockPersonAlive} />
      </Provider>
    );
    const modalBackground = await findByTestId('modal');
    fireEvent.click(modalBackground);
    waitFor(() => {
      expect(modalBackground).toHaveClass('modal');
      expect(setActive).toHaveBeenCalledWith(false);
    });
  });
});
