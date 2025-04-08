# PowerShell script to run npm run eas:build until it succeeds
# Usage: .\build-until-success.ps1

# Set maximum number of attempts (default: 10)
$MAX_ATTEMPTS = 100

# Set delay between attempts in seconds (default: 60)
$DELAY = 2

# Counter for attempts
$attempt = 1

Write-Host "Starting build process. Will attempt up to $MAX_ATTEMPTS times with $DELAY seconds between attempts."
Write-Host "Press Ctrl+C to stop at any time."

while ($attempt -le $MAX_ATTEMPTS) {
    Write-Host "Attempt $attempt of $MAX_ATTEMPTS..."
    
    # Run the build command
    npm run eas:build
    
    # Check if the build was successful
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Build successful on attempt $attempt!"
        exit 0
    } else {
        Write-Host "Build failed on attempt $attempt."
        
        # Check if we should continue
        if ($attempt -lt $MAX_ATTEMPTS) {
            Write-Host "Waiting $DELAY seconds before trying again..."
            Start-Sleep -Seconds $DELAY
        } else {
            Write-Host "Maximum attempts reached. Build failed after $MAX_ATTEMPTS attempts."
            exit 1
        }
    }
    
    # Increment attempt counter
    $attempt++
}

# This should never be reached due to the exit in the loop
exit 1 