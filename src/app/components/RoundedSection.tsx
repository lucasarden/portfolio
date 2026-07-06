const RoundedSection = ({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`flex items-center rounded-xl border border-edge bg-surface ${className}`}
    >
      {children}
    </div>
  );
};

export default RoundedSection;
