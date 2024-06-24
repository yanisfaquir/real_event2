import { createAction } from '@reduxjs/toolkit';

export const setLocation = createAction('event/setLocation');
export const setStartActionDate = createAction('event/setStartDate');
export const setStartActionTime = createAction('event/setStartTime');
export const setEndActionDate = createAction('event/setEndDate');
export const setEndActionTime = createAction('event/setEndTime');
export const setActionSameDay = createAction('event/setSameDay');
export const setStartEnd = createAction('event/setStartEnd');

export const setActionServiceType = createAction('event/setServiceType');
export const setActionEventType = createAction('event/setEventType');