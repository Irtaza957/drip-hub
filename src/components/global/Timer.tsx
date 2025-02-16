"use client";

import { useEffect, useState } from "react";
import { Value } from "react-phone-number-input";
import { useResendOTPMutation } from "@/store/services/auth";

const Timer = ({ phone }: { phone: Value | string | undefined }) => {
  const [resendOTP] = useResendOTPMutation();
  const [seconds, setSeconds] = useState(30);

  const handleSubmit = async () => {
    const data = new URLSearchParams();
    data.append("phone", phone?.toString()!);

    await resendOTP(data);
    setSeconds(30);
  };

  useEffect(() => {
    let interval: number | undefined;

    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000) as unknown as number;
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div className="flex flex-col items-center justify-start">
      <span className="text-center">
        00:{seconds < 10 ? "0" : ""}
        {Math.max(seconds, 0)}
      </span>
      {seconds === 0 && (
        <p
          onClick={() => handleSubmit()}
          className="w-full text-left text-xs cursor-pointer"
        >
          Resend OTP via Whatsapp / SMS
        </p>
      )}
    </div>
  );
};

export default Timer;
