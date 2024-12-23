// "use client";

// import { FcGoogle } from "react-icons/fc";
// import { Button } from "../ui/button";
// import { useActionState } from "react";
// import { googleLogin } from "@/actions/google-login";
// import FormError from "../shared/FormError";

// function LoginGoogle() {
//   const [error, formAction] = useActionState(googleLogin, undefined);

//   return (
//     <form action={formAction}>
//       <Button
//         type="submit"
//         className="flex items-center gap-2 w-full"
//         variant="outline"
//       >
//         <FcGoogle size={28} />
//         <span>Sign in with Google</span>
//       </Button>
//       <FormError message={error?.error} />
//     </form>
//   );
// }

// export default LoginGoogle;
