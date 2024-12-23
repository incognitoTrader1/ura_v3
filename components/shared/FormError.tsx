import { BsExclamationCircleFill } from "react-icons/bs";

interface FormErrorProps {
  message?: string | undefined;
}

function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="flex items-center space-x-4 bg-red-500/30 p-2 rounded-xl text-red-500">
      <BsExclamationCircleFill className="text-2xl" />
      <p>{message}</p>
    </div>
  );
}

export default FormError;
