# PowerShell script to build an iOS app for the Apple App Store
# Usage: .\build-ios.ps1

# Set maximum number of attempts (default: 10)
$MAX_ATTEMPTS = 100

# Set delay between attempts in seconds (default: 60)
$DELAY = 2

# Counter for attempts
$attempt = 1

Write-Host "Starting iOS App Store build process. Will attempt up to $MAX_ATTEMPTS times with $DELAY seconds between attempts."
Write-Host "Press Ctrl+C to stop at any time."

# First, update the eas.json file to ensure iOS is properly configured for store distribution
Write-Host "Updating eas.json to ensure iOS is configured for App Store distribution..."
$easJson = Get-Content -Path "eas.json" -Raw | ConvertFrom-Json
$easJson.build.production.ios.distribution = "store"
$easJson | ConvertTo-Json -Depth 10 | Set-Content -Path "eas.json"
Write-Host "eas.json updated. iOS builds will now be configured for App Store distribution."

while ($attempt -le $MAX_ATTEMPTS) {
    Write-Host "Attempt $attempt of $MAX_ATTEMPTS..."
    
    # Run the build command specifically for iOS platform with production profile
    Write-Host "Running eas:build:ios npm script..."
    npm run eas:build:ios
    # Check if the build was successful
    # 2309Kona@
    if ($LASTEXITCODE -eq 0) {
        Write-Host "iOS build successful on attempt $attempt!"
        Write-Host "You can now access your iOS build from the Expo website:"
        Write-Host "1. Go to https://expo.dev"
        Write-Host "2. Log in to your account"
        Write-Host "3. Navigate to your project"
        Write-Host "4. Find the latest build under the 'Builds' tab"
        Write-Host "5. Download or submit your build to the App Store"
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