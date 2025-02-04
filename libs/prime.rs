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