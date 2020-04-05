let auth0 = null;

// ..

const fetchAuthConfig = () => fetch("/auth_config.json");

// ..

const configureClient = async () => {
    const response = await fetchAuthConfig();
    const config = await response.json();

    auth0 = await createAuth0Client({
        domain: config.domain,
        client_id: config.clientId
    });
};

window.onload = async () => {
    // document.getElementById("main").classList.add("hidden");
    await configureClient();
    updateUI();

    const isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
        return;
    }

    // NEW - check for the code and state parameters
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
     
        // Process the login state
        await auth0.handleRedirectCallback();

     

        updateUI();

        console.log("redirigiendo ...");
        // Use replaceState to redirect the user away and remove the querystring parameters
        // window.history.replaceState({}, document.title, "http://localhost/main.html");
        // windows.location.reload();

        window.location.href = "http://localhost/main.html"
        
    }
}

// NEW
const updateUI = async () => {
    const isAuthenticated = await auth0.isAuthenticated();

    document.getElementById("btn-logout").disabled = !isAuthenticated;
    document.getElementById("btn-login").disabled = isAuthenticated;

    if (isAuthenticated) {
        // document.getElementById("login").style.display = "none";
        // document.getElementById("main").style.display = "block";


        
        document.getElementById("gated-content").classList.remove("hidden");

        document.getElementById(
            "ipt-access-token"
        ).innerHTML = await auth0.getTokenSilently();

        document.getElementById("ipt-user-profile").textContent = JSON.stringify(
            await auth0.getUser()
        );
        localStorage.setItem("user", JSON.stringify(
            await auth0.getUser()
        )); 



    } else {
        // document.getElementById("main").style.display = "none";
        // document.getElementById("login").style.display = "block";
        document.getElementById("gated-content").classList.add("hidden");
    }
};

const login = async () => {
    await auth0.loginWithRedirect({
        // redirect_uri: 'http://localhost/main.html',
    });
    
};

const logout = () => {
    auth0.logout({
        returnTo: window.location.origin
    });
};