interface GenericTextProps {
  children: React.ReactNode;
  title: string;
}


const GenericText: React.FC<GenericTextProps> = ({ children, title }) => {
  return (
    <article>
      <h1 className="text-2xl text-white">{title}</h1>
      {children}
    </article>
  );
};

export default GenericText;