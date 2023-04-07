import React from 'react';
import { IRollerProps } from '../models/types';

export default function Roller({ classRoller }: IRollerProps) {
  return (
    <div className={classRoller}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
