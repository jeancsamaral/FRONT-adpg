# PowerShell script to build an Android App Bundle (AAB) file
# Usage: .\build-aab.ps1

# Set maximum number of attempts (default: 10)
$MAX_ATTEMPTS = 100

# Set delay between attempts in seconds (default: 60)
$DELAY = 2

# Counter for attempts
$attempt = 1

Write-Host "Starting AAB build process. Will attempt up to $MAX_ATTEMPTS times with $DELAY seconds between attempts."
Write-Host "Press Ctrl+C to stop at any time."

# First, update the eas.json file to use AAB instead of APK for production builds
Write-Host "Updating eas.json to use AAB for production builds..."
$easJson = Get-Content -Path "eas.json" -Raw | ConvertFrom-Json
$easJson.build.production.android.buildType = "app-bundle"
$easJson | ConvertTo-Json -Depth 10 | Set-Content -Path "eas.json"
Write-Host "eas.json updated. Production Android builds will now create AAB files."

while ($attempt -le $MAX_ATTEMPTS) {
    Write-Host "Attempt $attempt of $MAX_ATTEMPTS..."
    
    # Run the build command
    npm run eas:build
    
    # Check if the build was successful
    if ($LASTEXITCODE -eq 0) {
        Write-Host "AAB build successful on attempt $attempt!"
        Write-Host "You can now download your AAB file from the Expo website:"
        Write-Host "1. Go to https://expo.dev"
        Write-Host "2. Log in to your account"
        Write-Host "3. Navigate to your project"
        Write-Host "4. Find the latest build under the 'Builds' tab"
        Write-Host "5. Download the AAB file"
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