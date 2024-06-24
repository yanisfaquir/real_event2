import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled, { keyframes } from 'styled-components';

const PaymentSuccess = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(timer);
          router.push('/');
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Pagamento realizado com sucesso!</h1>
      <p className="text-lg">Será redirecionado para a página principal em...</p>
      <CircularCountdown countdown={countdown} />
    </div>
  );
};

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const CircularCountdown = ({ countdown }) => {
  return (
    <Circle>
      <CircleContent>{countdown}</CircleContent>
      <CircleOverlay />
    </Circle>
  );
};

const Circle = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 5px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const CircleContent = styled.div`
  position: absolute;
  font-size: 24px;
  font-weight: bold;
`;

const CircleOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 5px solid #4caf50;
  animation: ${rotate} 3s linear infinite;
  clip: rect(0, 50px, 100px, 0);
`;

export default PaymentSuccess;

