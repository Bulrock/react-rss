import * as React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import Modal from '../../src/components/Modal';
import { Provider } from 'react-redux';
import store from '../../src/app/store';
import { server } from '../mocks/server';
import { charactersAPI } from '../../src/features/ApiSlice';
import { updateId } from '../../src/features/CardSlice';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  store.dispatch(charactersAPI.util.resetApiState());
});

afterAll(() => server.close());

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

describe('Modal', () => {
  const setActive = jest.fn();

  it("shouldn't render a modal window without active class", async () => {
    store.dispatch(updateId('197'));

    const { findByTestId } = render(
      <Provider store={store}>
        <Modal active={false} setActive={setActive} />
      </Provider>
    );

    const modalContainer = await findByTestId('modal-error');
    const modalContetnt = await findByTestId('modal-content-error');
    await waitFor(() => {
      expect(modalContainer).toHaveClass('modal');
      expect(modalContetnt).toHaveClass('modal-content');
    });
  });

  it('should render a modal window with active class and modal Card of alive character', async () => {
    store.dispatch(updateId('197'));

    const { findByTestId, getByTestId, getByText } = render(
      <Provider store={store}>
        <Modal active={true} setActive={setActive} />
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

  it('should render a modal window with active class and modal Card of dead character', async () => {
    store.dispatch(updateId('300'));

    const { findByTestId, getByTestId, getByText } = render(
      <Provider store={store}>
        <Modal active={true} setActive={setActive} />
      </Provider>
    );

    const modalContent = await findByTestId('person-loc');

    await waitFor(() => {
      expect(modalContent).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(getByTestId('modal')).toHaveClass('modal active');
      expect(getByText('Kyle')).toBeInTheDocument();
      expect(getByText('Dead - Humanoid')).toBeInTheDocument();
      expect(getByText('Male')).toBeInTheDocument();
      expect(getByText("Kyle's Teenyverse")).toBeInTheDocument();
      expect(getByText('2017-12-30')).toBeInTheDocument();
      expect(getByTestId('person-status-ico')).toHaveClass('status-icon-red');
    });
  });

  it('should render a modal window', async () => {
    store.dispatch(updateId('197'));

    const { findByTestId, getByTestId } = render(
      <Provider store={store}>
        <Modal active={true} setActive={setActive} />
      </Provider>
    );

    const modalContent = await findByTestId('person-loc');

    await waitFor(() => {
      expect(modalContent).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(getByTestId('modal')).toHaveClass('modal active');
      fireEvent.click(screen.getByTestId('modal-close-btn'));
      expect(getByTestId('modal')).toHaveClass('modal');
      expect(setActive).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(getByTestId('modal')).toHaveClass('modal active');
      fireEvent.click(screen.getByTestId('modal'));
      expect(getByTestId('modal')).toHaveClass('modal');
      expect(setActive).toHaveBeenCalled();
    });
  });

  it('should render a modal window with error', async () => {
    store.dispatch(updateId('000'));

    const { findByTestId } = render(
      <Provider store={store}>
        <Modal active={true} setActive={setActive} />
      </Provider>
    );

    const errorMessage = await findByTestId('on-error');
    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should be closed on close button click', () => {
    store.dispatch(updateId('197'));
    const { getByTestId } = render(
      <Provider store={store}>
        <Modal active={true} setActive={setActive} />
      </Provider>
    );

    expect(getByTestId('modal-error')).toHaveClass('modal active');
    fireEvent.click(screen.getByTestId('modal-close-btn'));
    expect(getByTestId('modal-error')).toHaveClass('modal');
    expect(setActive).toHaveBeenCalledWith(false);
  });

  it('should be closed on background click', async () => {
    store.dispatch(updateId('197'));
    const { findByTestId } = render(
      <Provider store={store}>
        <Modal active={true} setActive={setActive} />
      </Provider>
    );

    const modalBackground = await findByTestId('modal');
    const modalContent = await findByTestId('modal-content');
    await waitFor(() => {
      expect(modalBackground).toHaveClass('modal active');
      expect(modalContent).toHaveClass('modal-content active');
    });

    fireEvent.click(modalBackground);
    await waitFor(() => {
      expect(modalBackground).toHaveClass('modal');
      expect(modalContent).toHaveClass('modal-content');
      expect(setActive).toHaveBeenCalledWith(false);
    });
  });

  it('should be closed on background click when error', async () => {
    const { findByTestId } = render(
      <Provider store={store}>
        <Modal active={true} setActive={setActive} />
      </Provider>
    );

    const modalBackground = await findByTestId('modal-error');
    await waitFor(() => {
      expect(modalBackground).toHaveClass('modal active');
    });

    fireEvent.click(modalBackground);
    await waitFor(() => {
      expect(modalBackground).toHaveClass('modal');
      expect(setActive).toHaveBeenCalledWith(false);
    });
  });
});
