type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl bg-[#0052FF] px-8 py-4 text-white"
    >
      {children}
    </button>
  );
}