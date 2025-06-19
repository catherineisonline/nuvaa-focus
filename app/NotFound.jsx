import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      <div>
        <h1>404</h1>
        <p>Oops! Page not found</p>
        <Link href="/">Return to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
