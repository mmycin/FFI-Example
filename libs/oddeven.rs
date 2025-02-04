#[no_mangle]
pub extern "C" fn is_even(num: u32) -> bool {
    if num % 2 == 0 {
        return true;
    }
    false
}