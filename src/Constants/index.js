const isLocalhost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

export const baseUrl = (!isLocalhost)? "https://be-devcircle.onrender.com"  
  :"http://localhost:2100";