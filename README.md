# **Rust FFI with Bun/TypeScript Tutorial: Unleash the Power of Speed & Type Safety!**

Welcome to the **Rust FFI with Bun/TypeScript Tutorial**, where we blend the rocket-speed performance of **Rust** with the elegance and versatility of **TypeScript**! 🚀✨ If you’ve ever wanted to write high-performance libraries in Rust and seamlessly integrate them with your TypeScript code, then this is the guide you’ve been waiting for.

In this tutorial, we'll walk you through building a project that lets you leverage Rust’s mind-blowing performance capabilities while maintaining the ease and flexibility of TypeScript. We’ll implement mathematical functions like calculating factorials, checking prime numbers, and even determining if a number is odd or even. Spoiler alert: Rust is the muscle, and TypeScript is the finesse.

## **Prerequisites**

Before you jump into the fun, here’s what you’ll need:

- **[Rust](https://www.rust-lang.org/tools/install)**: A programming language that's faster than a caffeinated squirrel. 🐿️
- **[Bun](https://bun.sh)**: The lightweight, ultra-fast runtime. Think of it as a TypeScript compiler on steroids... but legal ones.
- A basic understanding of **TypeScript** and **Rust** (though we’ll keep it simple and approachable!).

## **Project Structure**

Here’s what your project will look like after following along with this tutorial:

```plaintext
ffi-rs-ts/
├── libs/
│   ├── bin/        # Compiled Rust libraries (like a treasure chest of speed)
│   ├── factorial.rs
│   ├── prime.rs
│   └── oddeven.rs
├── build_lib.sh    # The wizard behind the curtain, compiling the Rust magic
├── modules.ts      # TypeScript's backstage pass to Rust functions
├── index.ts        # Where the TypeScript code comes to life
├── package.json    # NPM’s shopping list for our project
└── tsconfig.json   # TypeScript’s config file (just some light housekeeping)
```

## **Step 1: Project Setup**

First things first—let’s set up the project and get Bun running. We’re about to create a beautiful hybrid of Rust and TypeScript.

1. Create a new directory and initialize a Bun project:
   ```bash
   mkdir ffi-rs-ts
   cd ffi-rs-ts
   bun init
   ```

2. Configure your `package.json` with some necessary scripts:
   ```json
   {
     "scripts": {
       "build": "sh build_lib.sh",   // Compiles our Rust code
       "dev": "bun index.ts",         // Starts the TypeScript magic
       "start": "sh -c 'bun run build && clear && bun run dev'"  // Does it all in one go
     }
   }
   ```

## **Step 2: Creating Rust Libraries**

Now for the juicy part—writing the Rust code. We’ll add three simple but powerful Rust functions for mathematical operations. These will be the superheroes of our project, and TypeScript will simply call on them when needed.

1. **Factorial Function** (`libs/factorial.rs`): A function to calculate the factorial of a number. Because who doesn't like a good factorial? 🍰

   ```rust
   #[no_mangle]
   pub extern "C" fn factorial(num: u64) -> u64 {
       if num == 0 || num == 1 {
           return 1;
       }
       num * factorial(num - 1)
   }
   ```

2. **Prime Checker** (`libs/prime.rs`): Checks if a number is prime. It’s basically the Rust equivalent of *“Are you the one?”* ❤️

   ```rust
   #[no_mangle]
   pub extern "C" fn is_prime(n: u32) -> bool {
       if n < 2 {
           return false;
       }

       let mut i: u32 = 2;
       while i * i <= n {
           if n % i == 0 {
               return false;
           }
           i += 1;
       }
       true
   }
   ```

3. **Odd/Even Checker** (`libs/oddeven.rs`): A simple function that checks if a number is odd or even. You know, the essential kind of stuff that makes life *so much easier*.

   ```rust
   #[no_mangle]
   pub extern "C" fn is_even(num: u32) -> bool {
       num % 2 == 0
   }
   ```

### Rust Code Key Points:

- `#[no_mangle]`: Stops Rust from giving your function a secret identity by mangling its name. We need it to be straightforward for FFI.
- `extern "C"`: Tells Rust to use the C ABI (the universal language of function calls). 
- `pub`: Public visibility so that these functions can be accessed from other languages, like TypeScript!

## **Step 3: Build Script**

Next up, let’s create the **build script** (`build_lib.sh`) to compile the Rust libraries into dynamic libraries (.dll, .so, or .dylib), which TypeScript will call. This is the *behind-the-scenes magic* that brings everything to life.

Here’s the `build_lib.sh` script:

```bash
#!/bin/bash

LIBS_DIR="libs"
BIN_DIR="$LIBS_DIR/bin"

mkdir -p "$BIN_DIR"

# Compile Rust files to dynamic libraries
for file in "$LIBS_DIR"/*.rs; do
    rustc --crate-type cdylib "$file"
done

# Cleanup and move binaries
find "./" -type f -name "*.dll.a" -delete
find "./" -type f -name "*.dll" -exec mv {} "$BIN_DIR" \;
```

### What’s Happening Here?
1. We create the `bin` directory to hold the compiled libraries (your treasures).
2. We compile all `.rs` files into dynamic libraries.
3. We clean up and move the compiled libraries into the `bin` folder.

## **Step 4: TypeScript FFI Integration**

Now that our Rust libraries are ready, let’s integrate them into TypeScript using Bun’s **FFI** module. Here’s where the fun begins:

1. **Create `modules.ts`** to handle FFI bindings:

   ```typescript
   import { dlopen, FFIType, suffix } from "bun:ffi";

   const BASE_DIR = "libs/bin";  // This is where our compiled Rust libraries live

   export const isEven = dlopen(`${BASE_DIR}/oddeven.${suffix}`, {
       is_even: {
           args: [FFIType.u32],
           returns: FFIType.bool
       }
   }).symbols.is_even;

   // Similar exports for isPrime and Factorial (just follow the pattern!)
   ```

### Breaking It Down:
- `dlopen`: Loads the dynamic library. It’s like opening a secret door to Rust's world.
- `FFIType`: Type mapping between TypeScript and Rust.
- `suffix`: Handles platform-specific file extensions. (Windows, Linux, macOS… they all get along in this project!)

2. **Create `index.ts`** to call these functions:

   ```typescript
   import { isEven, isPrime, Factorial } from "./modules";

   console.log(isEven(3));     // false (3 is odd, but you knew that)
   console.log(isPrime(17));   // true (prime numbers are so fancy)
   console.log(Factorial(5));  // 120 (a perfect factorial!)
   ```

## **Running the Project**

Alright, now it’s time to see everything come together like a glorious symphony of speed and efficiency.

1. **Build the Rust libraries**:
   ```bash
   bun run build
   ```

2. **Run the TypeScript code**:
   ```bash
   bun run dev
   ```

Or just do both in one command:
```bash
bun start
```

## **How It Works**

1. Rust compiles into fast dynamic libraries (`.dll`, `.so`, `.dylib`).
2. The **build script** compiles and organizes them into the `bin` directory.
3. **TypeScript** uses **Bun’s FFI** to load and call these libraries, all while ensuring **type safety** and smooth interaction.

It’s the best of both worlds—**Rust’s performance** and **TypeScript’s developer experience**. Talk about a dream team! 🏆

## **Performance Benefits**

This project combines:
- **Rust’s speed and memory safety** (no more worrying about segmentation faults)
- **TypeScript’s developer productivity** (because JavaScript is cool but TypeScript is like JavaScript with superpowers)
- **Bun’s ultra-fast runtime** (it’s like a rocket engine for your code)

It’s perfect for computationally heavy operations like math, simulations, or anything where **speed matters** but you still want the safety net of TypeScript.

## **Common Issues and Solutions**

- **Library Not Found**: Make sure `libs/bin` exists and contains the compiled libraries. If not, run `bun run build` again!
- **Permission Denied**: If you’re on Linux or macOS, make sure your build script is executable: `chmod +x build_lib.sh`.
- **Type Mismatches**: Double-check your **FFI type mappings**. TypeScript and Rust types need to match perfectly (like a well-dressed pair at a fancy gala).

## **Next Steps**

You’ve got the basics down, but why stop here? 🚀
- **Error handling**: Add error handling to ensure your program doesn’t just silently fail.
- **Complex functions**: Implement more complex Rust functions like string manipulation or file I/O.
- **Tests**: Add tests to ensure everything is working as expected. This is where TypeScript can really shine.
- **Benchmarking**: Measure performance and see how much faster Rust makes everything. Spoiler: it’ll be fast.

---

So there you have it—Rust and TypeScript, united through the magic of FFI! Go ahead and experiment with this setup, build something awesome, and don’t forget to share your creation with the world. Happy coding! 😎🎉

--- 