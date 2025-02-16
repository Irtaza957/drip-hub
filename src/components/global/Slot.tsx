import { SlotProps } from "input-otp";

function FakeCaret() {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
      <div className="w-px h-8 bg-accent" />
    </div>
  );
}

const Slot = (props: SlotProps) => {
  return (
    <div
      className={`${
        props.isActive && "outline-1 outline-accent"
      } relative size-[43px] sm:size-12 text-[1.5rem] sm:text-[2rem] text-accent flex items-center justify-center transition-all duration-150 bg-light-primary dark:bg-secondary`}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
};

export default Slot;
