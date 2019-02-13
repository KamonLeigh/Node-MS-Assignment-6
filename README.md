# Node Masterclass Assignment-6

## Build a Cluster Module for Hello World
Ensure code runs on all cores on the machine.

**Instructions**

On the root folder

For Staging:

```
$ node index.js || $ NODE_ENV=staging node index.js

    The server is listening on port 3000 in staging mode
    The server is listenig on port 3001 in staging mode
```

For production:

```
    $ NODE_ENV=production node index.js

    The server is listening on port 5000 in staging mode
    The server is listenig on port 5001 in staging mode
```

Send **POST** request to: http://localhost:3000/hello in this format:

```
    {
        "name": "add your name"
    }

```

 response

```
    {
        "message": "Hello 'added name'. How are you?"
    }


```

Terminal should app listening multiple cores.

press ctrl + c to stop the servers
