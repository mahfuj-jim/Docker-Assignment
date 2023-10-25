const localStorageFunctions = () => {
  const saveToLocalStorage = (id, email, role, token) => {
    localStorage.setItem("id", id);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
    localStorage.setItem("token", token);
    console.log("Save");
  };

  const getFromLocalStorage = () => {
    const id = localStorage.getItem("id");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    const data = {
      id: id,
      email: email,
      role: role,
      token: token,
    };
    return data;
  };

  const removeFromLocalStorage = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
  };

  return {
    saveToLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage,
  };
};

export default localStorageFunctions;
