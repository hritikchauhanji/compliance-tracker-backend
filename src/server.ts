import { app } from "./app.js";

const start = async () => {
    try {
        await app.listen({port: 3000});
        app.log.info("Server run successfully.")
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};

start();