// @ts-ignore
import { dlopen, FFIType, suffix, type Library, FFIFunction } from "bun:ffi";

const BASE_DIR = "libs/bin";

export const isEven = dlopen(`${BASE_DIR}/oddeven.${suffix}`, {
    is_even: {
        args: [FFIType.u32],
        returns: FFIType.bool
    },
}).symbols.is_even;

export const isPrime = dlopen(`${BASE_DIR}/prime.${suffix}`, {
    is_prime: {
        args: [FFIType.u32],
        returns: FFIType.bool
    },
}).symbols.is_prime;

export const Factorial = dlopen(`${BASE_DIR}/factorial.${suffix}`, {
    factorial: {
        args: [FFIType.u64],
        returns: FFIType.u64
    }
}).symbols.factorial;