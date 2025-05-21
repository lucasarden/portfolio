import RoundedSection from "@/app/components/RoundedSection";
import RoundButton from "@/app/components/RoundButton";
export default function Login() {
  return (
    <main className="flex items-center justify-center">
      <RoundedSection className="flex-col justify-center py-8 px-25 space-y-4">
        <h1 className="text-4xl font-bold">Login</h1>
        <p className="mt-4 text-lg">Please enter your credentials to log in.</p>
        <form className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-2"
          />
          <RoundButton
            className="bg-lucas-main-color text-white rounded-lg p-2 hover:bg-lucas-main-color-hover"
            href="/projects"
          >
            Login
          </RoundButton>
        </form>
      </RoundedSection>
    </main>
  );
}
