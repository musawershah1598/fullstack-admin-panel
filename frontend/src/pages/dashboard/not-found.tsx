import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center mt-12">
      <img src="/not-found.svg" alt="not found page" className="max-w-lg" />

      <div className="flex flex-col items-center mt-12 space-y-4">
        <h2 className="font-extrabold uppercase text-4xl">Page Not Found</h2>
        <p className="text-gray-600">
          Sorry the page you are looking for doesn't exists.
        </p>
        <div className="flex space-x-4">
          <Button variant={"secondary"} onClick={() => navigate(-1)}>
            Go back?
          </Button>
          <Button onClick={() => navigate("/pages/dashboard/overview")}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
