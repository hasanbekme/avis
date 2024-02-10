type Props = {
   children: any;
};

const Content = ({ children }: Props) => {
   return (
      <div className="flex flex-grow justify-center items-center">
         {children}
      </div>
   );
};

export default Content;
