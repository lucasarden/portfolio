const RoundedSection = ({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`flex items-center bg-white rounded-xl shadow ${className}`}
    >
      {children}
    </div>
  );
};

export default RoundedSection;
