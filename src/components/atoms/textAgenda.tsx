const Text = ({ children, className }) => {
  return <p className={`text-gray-700 ${className}`}>{children}</p>;
};

export default Text;
