"use client";

import { useInput } from "@/registry/new-york/blocks/input-siblings/hooks/useInputSiblings/useInput";
import { useInputSiblings } from "@/registry/new-york/blocks/input-siblings/hooks/useInputSiblings/useInputSiblings";
import { useSeparatorInput } from "@/registry/new-york/blocks/input-siblings/hooks/useInputSiblings/useSeparatorInput";

function SingleInput() {
  const { getInputProps } = useInput({
    autoFocus: true,
    maxLength: 4,
  });
  return <input className="input border" {...getInputProps()} />;
}

function BirthdayInput() {
  const { getInputProps } = useSeparatorInput({
    maxLength: [2, 2, 4],
    separator: "/",
  });
  return <input className="input border" {...getInputProps()} />;
}

function DayMonthYear() {
  const day = useInput({ maxLength: 2 });
  const month = useInput({ maxLength: 2 });
  const year = useInput({ maxLength: 4 });
  const [getDayInputProps, getMonthInputProps, getYearInputProps] =
    useInputSiblings({ siblings: [day, month, year] });
  return (
    <div className="flex gap-2">
      <div className="flex flex-col items-start">
        <label htmlFor="day" className="text-xs mb-1">
          Day
        </label>
        <input
          id="day"
          size={2}
          maxLength={2}
          className="input w-12 border"
          {...getDayInputProps()}
        />
      </div>
      <div className="flex flex-col items-start">
        <label htmlFor="month" className="text-xs mb-1">
          Month
        </label>
        <input
          id="month"
          size={2}
          maxLength={2}
          className="input w-12 border"
          {...getMonthInputProps()}
        />
      </div>
      <div className="flex flex-col items-start">
        <label htmlFor="year" className="text-xs mb-1">
          Year
        </label>
        <input
          id="year"
          size={4}
          maxLength={4}
          className="input w-20 border"
          {...getYearInputProps()}
        />
      </div>
    </div>
  );
}

function CreditCard() {
  const cardNumber = useSeparatorInput({
    maxLength: [4, 4, 4, 4],
    separator: " ",
  });
  const expiration = useSeparatorInput({ maxLength: [2, 2] });
  const ccv = useInput({ maxLength: 4 });
  const inputs = useInputSiblings({ siblings: [cardNumber, expiration, ccv] });
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col items-start">
        <label htmlFor="card-number" className="text-xs mb-1">
          Card Number
        </label>
        <input
          id="card-number"
          size={19}
          maxLength={19}
          className="input w-56 border"
          {...inputs[0]()}
        />
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col items-start">
          <label htmlFor="exp" className="text-xs mb-1">
            Expiration
          </label>
          <input
            id="exp"
            size={5}
            maxLength={5}
            placeholder="MM/YY"
            className="input w-16 border"
            {...inputs[1]()}
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="ccv" className="text-xs mb-1">
            CCV
          </label>
          <input
            id="ccv"
            size={3}
            maxLength={4}
            className="input w-12 border"
            {...inputs[2]()}
          />
        </div>
      </div>
    </div>
  );
}

function Pin() {
  const first = useInput({ maxLength: 1 });
  const second = useInput({ maxLength: 1 });
  const third = useInput({ maxLength: 1 });
  const last = useInput({ maxLength: 1 });
  const inputs = useInputSiblings({ siblings: [first, second, third, last] });
  return (
    <div className="flex gap-1">
      <input
        size={1}
        className="input w-8 text-center border"
        {...inputs[0]()}
      />
      <input
        size={1}
        className="input w-8 text-center border"
        {...inputs[1]()}
      />
      <input
        size={1}
        className="input w-8 text-center border"
        {...inputs[2]()}
      />
      <input
        size={1}
        className="input w-8 text-center border"
        {...inputs[3]()}
      />
    </div>
  );
}

export function InputSiblings() {
  return (
    <div className="flex flex-col gap-6 p-6 max-w-md mx-auto">
      <div>
        <h2 className="text-lg font-semibold mb-2">Single Input</h2>
        <SingleInput />
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Birthday Input</h2>
        <BirthdayInput />
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Day / Month / Year</h2>
        <DayMonthYear />
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Credit Card</h2>
        <CreditCard />
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Pin</h2>
        <Pin />
      </div>
    </div>
  );
}
