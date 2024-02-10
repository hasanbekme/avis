type Props = {
   children: any;
   disabled?: boolean;
   green?: boolean;
   [x: string]: any;
};
export const LoginButton = ({ children, disabled, green, ...rest }: Props) => {
   return (
      <button
         {...rest}
         className={`w-full ${
            disabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500"
         } bg-primary-100 text-white font-semibold rounded-md py-2 cursor-pointer text-xl duration-300`}
      >
         {children}
      </button>
   );
};

export const SignupButton = ({children, ...rest}: Props) => {
   return (
       <button {...rest} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
           {children}
       </button>
   );
};
