import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Button } from "./ui/button";

export default function ErrorBoundary() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background text-foreground">
            <h1 className="text-4xl font-bold">Oops!</h1>
            <p className="text-xl text-muted-foreground">Sorry, an unexpected error has occurred.</p>
            <p className="font-mono text-sm bg-muted p-2 rounded">
                {isRouteErrorResponse(error)
                    ? `${error.status} ${error.statusText}`
                    : (error as Error)?.message || "Unknown Error"}
            </p>
            <Button onClick={() => window.location.href = "/"}>
                Go Home
            </Button>
        </div>
    );
}
