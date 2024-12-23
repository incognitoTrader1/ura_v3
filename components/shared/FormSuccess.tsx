import { BsCheckCircleFill } from "react-icons/bs";

interface FormSucessProps {
  message?: string;
}

function FormSuccess({ message }: FormSucessProps) {
  if (!message) return null;

  return (
    <div className="flex items-center space-x-4 bg-emerald-500/30 p-2 rounded-xl text-emerald-500">
      <BsCheckCircleFill className="text-2xl" />
      <p>{message}</p>
    </div>
  );
}

export default FormSuccess;
