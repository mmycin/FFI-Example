#!/bin/bash

# Define directories
LIBS_DIR="libs"
BIN_DIR="$LIBS_DIR/bin"

# Create bin directory if it doesn't exist
mkdir -p "$BIN_DIR"

# Compile all Rust source files in the libs directory to cdylib
for file in "$LIBS_DIR"/*.rs; do
    [ -e "$file" ] || continue  # Skip if no .rs files exist
    rustc --crate-type cdylib "$file"
done

# Remove all .dll.a files
find "./" -type f -name "*.dll.a" -delete

# Move all .dll files to libs/bin/
find "./" -type f -name "*.dll" -exec mv {} "$BIN_DIR" \;

echo "Compilation and cleanup completed successfully!"
