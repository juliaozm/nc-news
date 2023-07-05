import { ButtonBackLink } from "components/UI/button/ButtonBackLink";
import { AuthFormsSection } from "pages/auth/AuthFormsSection";

export const AuthPage = () => {
  return (
    <main className="container relative mx-auto h-screen w-full px-4">
      <ButtonBackLink />
      <div className="absolute left-1/2 top-1/4 w-full -translate-x-1/2 -translate-y-1/4 transform">
        <AuthFormsSection />
      </div>
    </main>
  );
};
