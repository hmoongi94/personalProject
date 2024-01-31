import React from "react";

const BackButton = () => {
  const handleGoBack = () => {
    // 뒤로가기 기능
    window.history.back();
  };

  return (
    <button onClick={handleGoBack}>
      뒤로가기
    </button>
  );
};

export default BackButton;