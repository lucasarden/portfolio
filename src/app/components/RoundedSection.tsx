const RoundedSection = ({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`flex items-center bg-white dark:bg-lucas-dark dark:text-white rounded-xl shadow ${className}`}
    >
      {children}
    </div>
  );
};

export default RoundedSection;
