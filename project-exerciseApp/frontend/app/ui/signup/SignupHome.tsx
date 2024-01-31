"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import LoginButton from "../login/Loginbutton";
import InputText from "../login/Inputtext";

const SignUpHome: React.FC = () => {
  const router = useRouter();

  const [Signup, setSignup] = useState({
    userId: "",
    userPassword: "",
    userPassword1: "",
    userEmail: "",
    userPhoneNumber: "",
  });
  const handleInputChange = (field: string, value: string) => {
    setSignup({
      ...Signup,
      [field]: value,
    });
  };

  const handleButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    try {
      const response = await fetch(`http://localhost:3560/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: Signup.userId,
          userPassword: Signup.userPassword,
          userPassword1: Signup.userPassword1,
          userEmail: Signup.userEmail,
          userPhoneNumber: Signup.userPhoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error("서버 응답 오류");
      }

      const data = await response.json();

      if (data.success) {
        alert("회원가입 성공");
        router.push("/login");
      } else if (data.success === false) {
        alert(data.message);
      } else {
        alert("?");
      }
    } catch (error) {
      console.error(error);
      alert("회원가입 실패");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col w-2/6 h-2/5">
      <div className="h-5/6 flex flex-col justify-between w-full">
        <InputText
          title="ID"
          inputchange={(value: string) => handleInputChange("userId", value)}
        />
        <InputText
          title="Password"
          inputchange={(value: string) =>
            handleInputChange("userPassword", value)
          }
        />
        <InputText
          title="Password1"
          inputchange={(value: string) =>
            handleInputChange("userPassword1", value)
          }
        />
        <InputText
          title="EMAIL"
          inputchange={(value: string) => handleInputChange("userEmail", value)}
        />
        <InputText
          title="PHONE NUMBER"
          inputchange={(value: string) =>
            handleInputChange("userPhoneNumber", value)
          }
        />
      </div>
      <div className="h-1/6 w-full flex justify-end">
        <LoginButton value="Submit" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default SignUpHome;
