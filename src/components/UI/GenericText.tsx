interface GenericTextProps {
  children: React.ReactNode;
  title: string;
}

const GenericText: React.FC<GenericTextProps> = ({ children, title }) => {
  return (
    <article>
      <h1 className="text-2xl text-white my-2">{title}</h1>
      {children}
    </article>
  );
};

export default GenericText;
