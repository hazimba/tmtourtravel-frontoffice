import CurrentlyLoadingIcon from "./CurrentlyLoadingIcon";
import { Button } from "./ui/button";

interface LoadingButtonProps {
  loading: boolean;
  slide?: boolean;
  loadingText?: string;
  buttonText?: string;
  onClick?: () => void;
  buttonStyle?: string;
  icon?: React.ReactNode;
}

const LoadingButton = ({
  loading,
  loadingText = "Loading...",
  buttonText = "Click",
  onClick,
  buttonStyle,
  icon,
}: LoadingButtonProps) => {
  return (
    <Button
      variant="default"
      className={`w-full justify-center hover:bg-primary/80 shadow-md ${buttonStyle}`}
      onClick={onClick ? onClick : undefined}
      disabled={loading}
    >
      {loading ? (
        <>
          <CurrentlyLoadingIcon secondaryColor />
          {/* {loadingText} */}
        </>
      ) : (
        <>
          {buttonText}
          {icon}
        </>
      )}
    </Button>
  );
};
export default LoadingButton;
