// Fonction pour gérer l'appel fetch
export const fetchLogin = async ({ email, password }) => {
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to login");
    }
  
    const data = await response.json();
    return data;
  };


  // Fonction pour gérer l'appel fetch du profil utilisateur
export const fetchUserProfileData = async (token) => {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }
  
    const data = await response.json();
    return data;
  };

  export const changeUsername = async (newUsername, token) => {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: newUsername }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to change username');
    }
  
    const data = await response.json();
    return data;
  };