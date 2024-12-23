interface AuthHeaderProps {
  title: string;
  label: string;
}

function AuthHeader({ title, label }: AuthHeaderProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-y-4 w-full">
      <h1 className="font-semibold text-3xl">{title}</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}

export default AuthHeader;
