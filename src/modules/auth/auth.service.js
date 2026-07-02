export const registerUser = async (userData) => {
  return {
    id: "demo-id",
    name: userData.name,
    email: userData.email,
    role: "user",
  };
};

export const loginUser = async (email) => {
  return {
    id: "demo-id",
    name: "Raj",
    email,
    role: "user",
  };
};