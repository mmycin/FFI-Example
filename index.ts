import { Factorial, isEven, isPrime } from "./modules";

// @ts-ignore
Bun.serve({
    port: 8000,
    fetch(req: Request) {
        const url = new URL(req.url);

        console.log(url.pathname);

        if (url.pathname === "/") {
            return new Response(JSON.stringify({
                message: "Hello world",
            }), { headers: { "Content-Type": "application/json" } });
        }

        if (url.pathname.startsWith("/api/isprime/")) {
            const numStr = url.pathname.replace("/api/isprime/", "");
            const num = parseInt(numStr, 10);

            if (isNaN(num)) {
                return new Response(JSON.stringify({
                    error: "Invalid number"
                }), { headers: { "Content-Type": "application/json" }, status: 400 });
            }

            return new Response(JSON.stringify({
                number: num,
                is_prime: isPrime(num)
            }), { headers: { "Content-Type": "application/json" } });
        }
        
        if (url.pathname.startsWith("/api/iseven/")) {
            const numStr = url.pathname.replace("/api/iseven/", "");
            const num = parseInt(numStr, 10);

            if (isNaN(num)) {
                return new Response(JSON.stringify({
                    error: "Invalid number"
                }), { headers: { "Content-Type": "application/json" }, status: 400 });
            }

            return new Response(JSON.stringify({
                number: num,
                is_even: isEven(num)
            }), { headers: { "Content-Type": "application/json" } });
        }
        
        if (url.pathname.startsWith("/api/factorial/")) {
            const numStr = url.pathname.replace("/api/factorial/", "");
            const num = parseInt(numStr, 10);

            if (isNaN(num)) {
                return new Response(JSON.stringify({
                    error: "Invalid number"
                }), { headers: { "Content-Type": "application/json" }, status: 400 });
            }

            return new Response(JSON.stringify({
                number: num,
                factorial: Number(Factorial(num))
            }), { headers: { "Content-Type": "application/json" } });
        }

        return new Response("404 Not Found", { status: 404 });
    }
});
