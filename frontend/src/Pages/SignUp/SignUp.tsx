import axios from "../../Api/axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
   Card,
   CardHeader,
   CardBody,
   CardFooter,
   Typography,
   Input,
   Button,
   Select,
   Option,
} from "@material-tailwind/react";
import useAuth from "../../Hooks/useAuth";

const schema = z
   .object({
      first_name: z.string().min(1),
      last_name: z.string().min(1),
      username: z.string().min(3),
      password: z.string().min(6),
      confirmPassword: z.string().min(1),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
   });

type schemaType = z.infer<typeof schema>;

const SignUpPage = () => {
   const navigate = useNavigate();
   const { setAuthTokens } = useAuth();

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitted },
   } = useForm<schemaType>({
      resolver: zodResolver(schema),
   });

   const onSubmit = async (data: schemaType) => {
      const { confirmPassword, ...payload } = data;
      const response = await axios.post("/account/signup/", {
         ...payload,
      });
      if (response.status === 200) {
         setAuthTokens(response.data);
         navigate("/");
      }
   };

   return (
      <div className="flex justify-center items-center h-screen">
         <Card className="w-auto drop-shadow-2xl">
            <CardHeader
               variant="gradient"
               color="blue"
               className="grid h-16 place-items-center"
            >
               <Typography variant="h4" color="white" className="mx-auto">
                  Create new account
               </Typography>
            </CardHeader>
            <CardBody>
               <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-2"
               >
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2 max-w-md">
                     <Input label="First name" {...register("first_name")} error={isSubmitted && errors.first_name ? true : false} />
                     <Input label="Last name" {...register("last_name")} error={isSubmitted && errors.last_name ? true : false} />
                  </div>
                  <Input
                     label="Username"
                     error={isSubmitted && errors.username ? true : false}
                     {...register("username")}
                  />
                  <Input
                     type="password"
                     label="Password"
                     error={isSubmitted && errors.password ? true : false}
                     {...register("password")}
                  />
                  <Input
                     type="password"
                     label="Confirm password"
                     error={isSubmitted && errors.confirmPassword ? true : false}
                     {...register("confirmPassword")}
                  />

                  <Button className="mt-6" fullWidth type="submit">
                     Register
                  </Button>
               </form>
            </CardBody>
            <CardFooter className="pt-0">
               <Typography color="gray" className="text-center font-normal">
                  Already have an account?{" "}
                  <button
                     onClick={() => navigate("/login")}
                     className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                  >
                     Sign In
                  </button>
               </Typography>
            </CardFooter>
         </Card>
      </div>
   );
};

export default SignUpPage;
