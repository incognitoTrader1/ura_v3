// "use client";

// import { useActionState } from "react";

// import { Button } from "../ui/button";

// import FormError from "../shared/FormError";
// import { githubLogin } from "@/actions/github-login";
// import { BsGithub } from "react-icons/bs";

// function LoginGoogle() {
//   const [error, formAction] = useActionState(githubLogin, undefined);

//   return (
//     <form action={formAction}>
//       <Button
//         type="submit"
//         className="flex items-center gap-2 border w-full"
//         variant="secondary"
//       >
//         <BsGithub size={28} />
//         <span>Sign in with Google</span>
//       </Button>
//       <FormError message={error?.error} />
//     </form>
//   );
// }

// export default LoginGoogle;
