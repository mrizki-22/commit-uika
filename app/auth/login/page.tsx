"use client";
import React, { FormEventHandler } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Toastify from "@/app/components/Toasitfy";

function Login() {
  //set title
  window.document.title = "Login | COMMIT";

  const router = useRouter();
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = React.useState({ username: "", password: "" });

  // redirect to admin dashboard if logged in
  if (status === "loading") return null;
  if (status === "authenticated") {
    router.push("/dashboard");
  }

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      username: userInfo.username,
      password: userInfo.password,
      redirect: false,
    });

    // if success redirect to admin dashboard
    if (res?.error) {
      toast.error(res.error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <html lang="en" data-theme="light">
      <body>
        <div className="flex justify-center items-center w-screen h-screen">
          <div className="card border drop-shadow px-10 py-8 lg:w-96 md:w-4/6 w-11/12">
            <div>
              <h1 className="text-lg font-bold text-center">Login COMMIT</h1>
            </div>
            <div className="mt-5">
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-5">
                  <input className="input " type="text" placeholder="Username" value={userInfo.username} onChange={({ target }) => setUserInfo({ ...userInfo, username: target.value })} />
                  <input className="input " type="password" placeholder="Password" value={userInfo.password} onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })} />
                </div>
                <div className="mt-10">
                  <button className="btn btn-primary w-full hover:scale-x-105" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Toastify />
      </body>
    </html>
  );
}

export default Login;
