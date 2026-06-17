import { UserIcon } from "lucide-react";

function Avatar() {
  return (
    <div className="bg-background/50 p-2 rounded-full transition-all duration-300 hover:scale-105 hover:bg-primary-50/50 hover:ease-in-out cursor-pointer">
      <UserIcon className="w-5 h-5" />
    </div>
  );
}

export default Avatar;