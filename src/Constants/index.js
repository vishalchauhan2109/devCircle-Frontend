const isLocalhost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

export const baseUrl = (!isLocalhost)? "https://dev-circle-5cxe-bz7h1czx1-vishalchauhan2109s-projects.vercel.app"  
  :"http://localhost:2100";