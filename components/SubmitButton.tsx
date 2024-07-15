import Spinner from "./Spinner";
import { Button } from "./ui/button";

interface Props {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({ isLoading, className, children }: Props) => {
  return (
    <Button type="submit" disabled={isLoading} className={className}>
      {isLoading ? <Spinner label="Submitting..." /> : children}
    </Button>
  );
};

export default SubmitButton;
