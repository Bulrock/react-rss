import { IModalProps } from '../models/types';
import React from 'react';
import cross from '../assets/cross.svg';
import Roller from './Roller';

const Modal = (props: IModalProps) => {
  if (props.characterModal !== undefined && !('error' in props.characterModal)) {
    return (
      <div
        data-testid="modal"
        className={props.active ? 'modal active' : 'modal'}
        onClick={() => props.setActive(false)}
      >
        <div
          className={props.active ? 'modal-content active' : 'modal-content'}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="card-modal" data-testid="card-modal">
            <div className="modal-close-cross">
              <img
                data-testid={'modal-close-btn'}
                className="cross-img"
                src={cross}
                alt="modal-close-icon"
                onClick={() => props.setActive(false)}
              />
            </div>
            <div className="card-header-wrapper">
              <div>
                <img
                  className="person-img"
                  src={props.characterModal?.image}
                  alt="person image"
                  loading="lazy"
                />
                <h2 className="person-name">{props.characterModal?.name}</h2>
                <span className="person-status">
                  <span
                    data-testid={'person-status-ico'}
                    className={
                      props.characterModal?.status === 'Alive'
                        ? 'status-icon-green'
                        : 'status-icon-red'
                    }
                  ></span>
                  <strong>
                    {props.characterModal?.status} - {props.characterModal?.species}
                  </strong>
                </span>
                <p className="person-loc" data-testid="person-loc">
                  <span className="person-location-title">Last known location:</span>
                  <br></br>
                  <strong className="person-location-name">
                    {props.characterModal?.location.name}
                  </strong>
                  <br></br>
                  <span className="person-gender-title">Gender:</span>
                  <br></br>
                  <strong className="person-gender">{props.characterModal?.gender}</strong>
                </p>
                <p className="person-loc" data-testid="person-info-block">
                  <span className="person-info-title">Origin place of birth:</span>
                  <br></br>
                  <strong className="person-info-name">{props.characterModal?.origin.name}</strong>
                  <br></br>
                  <span className="person-birth-title">Date of birth:</span>
                  <br></br>
                  <strong className="person-date">
                    {props.characterModal?.created.slice(0, 10)}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        data-testid="modal"
        className={props.active ? 'modal active' : 'modal'}
        onClick={() => props.setActive(false)}
      >
        <div
          className={props.active ? 'modal-content active' : 'modal-content'}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="card-modal" data-testid="card-modal">
            <div className="modal-close-cross">
              <img
                data-testid={'modal-close-btn'}
                className="cross-img"
                src={cross}
                alt="modal-close-icon"
                onClick={() => props.setActive(false)}
              />
            </div>
            {props.isModalError && (
              <div className="card-header-wrapper">
                <div className="modal-error">
                  <div>Failed to fetch Character Information!</div>
                </div>
              </div>
            )}
            {!props.isModalError && props.isFetching && (
              <Roller classRoller={'lds-roller-modal lds-roller'} />
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Modal;
