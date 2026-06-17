import Avatar from "./Avatar";

interface AuthorProps {
  name: string;
}

function Author({  name }: AuthorProps) {
  return (
    <div className="flex items-center gap-x-2">
     <Avatar/>
      <span className="text-sm text-secondary-300/80">{name}</span>
    </div>
  );
}

export default Author;