# Email-based Authentication API – Demo Project

This demo project demonstrates how to integrate the **Email-based Authentication API** into your application.

The API is available in two modes:

- **Docker container** – Install and run it on your company’s infrastructure.
- **Hosted service** – Access it directly via [RapidShare](#).

---

## Docker API Setup

### 1. Install the Container

#### Linux
This will download the image from docker hub

> docker run -v ~/authentication_api:/app --name authentication --rm philippeperezmailauth.philippe-perez.com:V1_0_1"
 -config /app/config.ini


More infos on https://hub.docker.com/repository/docker/philippeperez/api-authentication-email/general

### 2. Configure the Front-end

For a quickstart , we will install the container on the default docker's network 

> docker network inspect bridge

From there , grab the IP Adress

        "Containers": {
            "fbe971cd5d66862e61dd7141dac71aaad3f485f18422008240d9b2076614841e": {
                "Name": "authentication",
                "EndpointID": "fe8b47eac1d905ea60264af158174c257de98214c29712ce1d546941bd28bacb",
                "MacAddress": "02:42:ac:11:00:02",
                "IPv4Address": "172.17.0.2/16",
                "IPv6Address": ""
            }


In your `vite.config.js`, update the following section with the **IP address of your container**:

```js
'/api': {
    target: 'http://172.17.0.2:5001',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
},
