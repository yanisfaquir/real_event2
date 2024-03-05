import React from 'react';
import { useRouter } from 'next/router';
import BeginEvent from '@/components/startEvent/beginEvent';
import StepService from '@/components/startEvent/stepService';

const StartEventRoutes = () => {
  const router = useRouter();

  if (router.pathname.startsWith('/start-event/begin')) {
    return <BeginEvent />;
  } else if (router.pathname.startsWith('/start-event/step-service')) {
    return <StepService />;
  }

  return null;
};

export default StartEventRoutes;